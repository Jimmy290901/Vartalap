import React from "react";
import Avatar from '@mui/material/Avatar';
import "./SidebarChat.css";

function SidebarChat() {
    return (
        <div className="sidebar_chat">
            <Avatar />
            <div className="chat_info">
                <h3>Room Name</h3>
                <p>Last Message</p>
            </div>
        </div>        
    );
}

export default SidebarChat;