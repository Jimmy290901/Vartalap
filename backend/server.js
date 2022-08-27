import {Messages} from "./models.js";
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
// mongoose.connect("mongodb://"+username+":"+password+"@cluster0-shard-00-00.cu4l4.mongodb.net:27017,cluster0-shard-00-01.cu4l4.mongodb.net:27017,cluster0-shard-00-02.cu4l4.mongodb.net:27017/whatsappdb?ssl=true&replicaSet=atlas-cewtg3-shard-0&authSource=admin&retryWrites=true&w=majority");
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
        // console.log(change);
        //for change = "insert", trigger the "insert" event in "messages" channel and send the data
        if (change.operationType === "insert") {            
            pusher.trigger("messages", "message-inserted", change.fullDocument);
        } else {
            console.log("Error pushing the updates");
        }
    });
});

// Implementing API Routes
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.post("/message/new", async (req, res) => {
    const newMsg = req.body;
    await Messages.create(newMsg, (err, newMsg) => {
        if (err) {
            res.send("Error inserted message");
        }
    });
    res.send("Message inserted!")
});

app.get("/message/all", async (req, res) => {
    await Messages.find((err, data) => {
        if (err) {
            res.status(500).send("Unable to fetch messages");
        } else {
            res.send(data);
        }
    });
});