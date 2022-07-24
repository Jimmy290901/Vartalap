import React, {useState} from "react";
import "./InputBar.css";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import axios from "axios";

function InputBar() {

    const [input, setInput] = useState("");

    function updateInput(e) {
        setInput(e.target.value);
    }

    async function sendMessage(e) {
        e.preventDefault();
        const userMessage = {
            name: "Shubham Jain",
            content: input
        };
        console.log(userMessage);
        await axios.post("http://localhost:8000/message/new", userMessage).catch((error) => {
            console.log(error);
        });
        setInput("");
    }

    return (
        <div className="chat_footer">
            <InsertEmoticonIcon />
            <AttachFileIcon />
            <form>
                <input value={input} onChange={updateInput} placeholder="Type a message"/>
                <button type="submit" onClick={sendMessage}>Send message</button>
            </form>
            <MicIcon />
        </div>
    );
}

export default InputBar;