import mongoose from "mongoose"

var chatroomSchema = new mongoose.Schema({
    name: String,
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: Users
    }]
}, {collection: "chatrooms"});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    rooms: [{
        type: mongoose.Types.ObjectId,
        ref: Chatrooms
    }]
}, {collection: "users"});

var messageSchema = new mongoose.Schema({
    content: String,
    timestamp: {
        type: Date,
        default: () => Date.now(),
    }, 
    userId: userSchema,
    roomId: chatroomSchema
}, {collection: "messages"});

var Messages = mongoose.model("Message", messageSchema);
var Users = mongoose.model("User", userSchema);
var Chatrooms = mongoose.model("Chatroom", chatroomSchema);

export {Messages, Users, Chatrooms};      //named export as there could be more exports