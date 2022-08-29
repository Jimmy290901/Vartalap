import React from "react";
import Avatar from '@mui/material/Avatar';
import "./SidebarChat.css";

function SidebarChat({name, index, currChat, setCurrChat}) {
    let extraClass = "";
    if (index === currChat) {
        extraClass += " selected-chat";
    }
    return (
        <div className={"sidebar_chat"+extraClass} onClick={() => setCurrChat(index)}>
            <Avatar />
            <div className="chat_info">
                <h3>{name}</h3>
                {/* <p>Last Message</p> */}
            </div>
        </div>        
    );
}

export default SidebarChat;