import React from "react";
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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
            <div className="messages">
                <p>Chat Messages</p>
            </div>
        </div>
    );
}

export default Chat;