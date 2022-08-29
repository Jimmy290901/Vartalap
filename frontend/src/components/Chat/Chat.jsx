import React, { useRef, useEffect } from "react";
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBar from "../InputBar/InputBar";
import Message from "../Message/Message";

function Chat({data, token, email}) {
    const chatDisplay = useRef(null);

    useEffect(()=> {
        chatDisplay.current?.scrollIntoView({behavior: "smooth"});
    }, [data]);

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>{data.name}</h3>
                    {/* <p>Last seen: 12:43 P.M</p> */}
                </div>
                <div className="chat_header_options">
                    <SearchIcon/>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>                
                </div>
            </div>

            <div className="chat_body" >
                {data.messages.map((message) => <Message message={message} key={message._id} email={email} /> )}
                <div ref={chatDisplay} />
            </div>
            <InputBar token={token} email={email} />
        </div>
    );
}

export default Chat;