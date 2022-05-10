import React from "react";
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';

function Chat() {
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>Room Name</h3>
                    <p>Last seen: 12:43 P.M</p>
                </div>
                <div className="chat_header_options">
                    <SearchIcon/>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>                
                </div>
            </div>
            <div className="chat_body">
                <p className="chat_message">
                    <div className="chat_msg_username"><h3>Name</h3></div>
                    <span className="chat_msg_content">
                        This is a Message
                    </span>
                    <div className="chat_msg_time">Sat, 9th March, 12:43 P.M</div>
                </p>

                <p className="chat_message user_message">
                    <div className="chat_msg_username"><h3>Name</h3></div>
                    <span className="chat_msg_content">
                        This is a Message
                    </span>
                    <div className="chat_msg_time">Sat, 9th March, 12:43 P.M</div>
                </p>

                <p className="chat_message">
                    <div className="chat_msg_username"><h3>Name</h3></div>
                    <span className="chat_msg_content">
                        This is a Message
                    </span>
                    <div className="chat_msg_time">Sat, 9th March, 12:43 P.M</div>
                </p>
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <AttachFileIcon />
                <form>
                    <input placeholder="Type a message"/>
                    <button type="submit">Send message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;