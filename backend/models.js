import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    content: String,
    timestamp: {
        type: Date,
        default: () => Date.now(),
    }, 
    name: String
});

const Messages = mongoose.model("Message", messageSchema);

export {Messages};      //named export as there could be more exports