import React, { useRef, useEffect } from "react";
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import InputBar from "../InputBar/InputBar";
import Message from "../Message/Message";

function Chat({room, token, email, name, leaveChannel}) {
    const chatDisplay = useRef(null);

    useEffect(()=> {
        chatDisplay.current?.scrollIntoView({behavior: "smooth"});
    });

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>{room.name}</h3>
                </div>
                <div className="chat_header_options">
                    {/* <SearchIcon/>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>                 */}
                    <Button variant="outlined" onClick={()=>leaveChannel(room.roomName)}>Leave</Button>

                </div>
            </div>

            <div className="chat_body" >
                {room.messages.map((message) => <Message message={message} key={message._id} email={email} /> )}
                <div ref={chatDisplay} />
            </div>
            <InputBar token={token} email={email} roomId={room._id} name={name} />
        </div>
    );
}

export default Chat;