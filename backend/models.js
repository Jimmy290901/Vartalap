import mongoose from "mongoose"

var chatroomSchema = new mongoose.Schema({
    name: String,
    participants: [{
        name: String,
        email: String
    }]
}, {collection: "chatrooms"});

var Chatrooms = mongoose.model("Chatroom", chatroomSchema);

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Chatrooms
    }]
}, {collection: "users"});

var Users = mongoose.model("User", userSchema);

var messageSchema = new mongoose.Schema({
    content: String,
    timestamp: {
        type: Date,
        default: () => Date.now(),
    },
    sender_name: String,
    sender_email: String,
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chatrooms
    }
}, {collection: "messages"});

var Messages = mongoose.model("Message", messageSchema);

export {Messages, Users, Chatrooms};      //named export as there could be more exports