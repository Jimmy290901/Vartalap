import {Messages} from "./models.js";
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher"
import dotenv from "dotenv";

// const dotenv = require("dotenv");
dotenv.config();

//Setting up app
const app = express();

// Middlewares
app.use(express.json());

// Setting app to listen to any assigned port or 8000 by default
let port = process.env.PORT || 8000;
app.listen(port);

//Get mongodb cluster username and password from .env file
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Connecting with DB
mongoose.connect("mongodb+srv://"+username+":"+password+"@cluster0.cu4l4.mongodb.net/whatsappdb?retryWrites=true&w=majority");

// Implementing change streams over Messages collection
mongoose.connection.once("open", () => {
    Messages.watch().on("change", (change) => {
        console.log(change);
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