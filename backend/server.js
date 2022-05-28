import {Messages} from "./models.js";
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

//Setting up app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Setting app to listen to any assigned port or 8000 by default
let port = process.env.PORT || 8000;
app.listen(port);

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
mongoose.connection.once("open", () => {        //create changestream only once
    Messages.watch().on("change", (change) => {     //changestream
        console.log(change);
        if (change.operationType === "insert") {            
            pusher.trigger("messages", "insert", change.fullDocument);
        } else {
            console.log("Error pushing the updates");
        }
    });
});

// Implementing API Routes
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.post("/message/new", (req, res) => {
    const newMsg = req.body;
    Messages.create(newMsg, (err, newMsg) => {
        if (err) {
            res.send("Error inserted message");
        }
    });
    res.send("Message inserted!")
});

app.get("/message/all", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send("Unable to fetch messages");
        } else {
            res.send(data);
        }
    });
});