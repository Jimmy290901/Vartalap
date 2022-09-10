import {Users, Chatrooms, Messages} from "./models.js";
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {verifyUser} from "./middlewares.js";

dotenv.config();

//Setting up app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(cors());
app.use(verifyUser);

// Setting app to listen to any assigned port or 8000 by default
let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server listening at port " + port));

//Get mongodb cluster username and password from .env file
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Connecting with DB
mongoose.connect("mongodb+srv://"+username+":"+password+"@cluster0.cu4l4.mongodb.net/whatsappdb?retryWrites=true&w=majority");

// Setting up Pusher
const pusher = new Pusher({
    appId : process.env.appId,
    key : process.env.key,
    secret : process.env.secret,
    cluster : process.env.cluster,
    useTLS : true 
});

// Implementing change streams over Messages collection
mongoose.connection.once("open", () => {        //as we want to create changestream only once, so we add listener only once
    Messages.watch().on("change", (change) => {     //watch() create a changestream on Messages model
        //for change = "insert", trigger the "message-inserted" event in respective channel and send the data
        if (change.operationType === "insert") {     
            pusher.trigger(change.fullDocument.roomId.toString(), "message-inserted", change.fullDocument);
        }
    });
    // Chatrooms.watch().on("change", (change) => {
    //     if (change.operationType === "update") {
    //         console.log(change);
    //     }
    // })
});

// Implementing API Routes
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.post("/room/join", async (req, res) => {
    const roomName = req.body.roomName;
    await Chatrooms.findOne({roomName: roomName}).then(async (room) => {
        if (room) {
            const email = req.body.email;
            const roomid = room._id;
            await Users.findOne({email: email}).then(async (user) => {
                if (user.rooms.includes(roomid)) {
                    res.send({
                        status: "error",
                        message: "Already joined the room"
                    });
                } else {
                    user.rooms.push(roomid);
                    await user.save();      //adding new roomid to rooms within the user's document
                    const userEntry = {
                        name: user.name,
                        email: user.email
                    };
                    room.participants.push(userEntry);
                    await room.save();      //adding new userid to participants within the room's document
                    await Messages.find({roomId: roomid}).lean().then((messages) => {
                        res.send({
                            status: "success",
                            message: "Successfully added to the room",
                            roomData: {
                                _id: room._id.toString(),
                                name: room.name,
                                participants: room.participants,
                                roomName: room.roomName,
                                messages: [...messages]
                            }
                        });
                    }).catch((err) => {
                        console.log("Error: " + err);
                        res.status(500).send("Error fetching messages"); 
                    });
                }
            }).catch((err) => {
                console.log("Error: " + err);
                res.status(500).send("Error fetching user");
            });
        } else {
            res.send({
                status: "error",
                message: "Room doesn't exist"
            });
        }
    }).catch((err) => {
        console.log("Error: " + err);
        res.status(500).send("Error finding the chatroom");
    })
});

app.post("/message/new", async (req, res) => {
    const newMsg = req.body;
    await Messages.create(newMsg, (err, newMsg) => {
        if (err) {
            res.send("Error inserted message");
        } else {
            console.log("Message inserted successfully");
        }
    });
    res.send("Message inserted!")
});

app.get("/message/all", async (req, res) => {
    const email = req.query.email;
    let data = {};
    await Users.findOne({email: email}).lean().then(async (user) => {
        data.user_name = user.name;
    }).catch((err) => {
        console.log("Error: " + err);
        res.status(500).send("Unable to fetch the user data");
    });
    await Chatrooms.find({participants: {$elemMatch:{email: email}}}).lean().then(async (rooms) => {
            data.rooms = rooms;
            for (let idx = 0; idx < data.rooms.length; idx++) {
                await Messages.find({roomId: data.rooms[idx]._id}).lean().then((messages) => {
                    data.rooms[idx].messages = messages;
                }).catch((err) => {
                    console.log("Error: " + err);
                    res.status(500).send("Unable to fetch messages");
                });
            }
            res.send(data);
    }).catch((err) => {
        console.log("Error: " + err);
        res.status(500).send("Unable to fetch chatroom");
    });
});