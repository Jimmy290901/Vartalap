import React, { useRef, useEffect } from "react";
import "./Chat.css";
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBar from "../InputBar/InputBar";

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
                {data.messages.map((message) => {
                    let timestamp = new Date(message.timestamp);
                    let month;
                    month = (timestamp.getMonth() + 1);
                    if (timestamp.getMonth() < 9) {
                        month = "0"+month;
                    }
                    let sign, hour = timestamp.getHours();
                    if (hour >= 12) {
                        sign = "P.M";
                        hour = (hour > 12) ? hour-12 : hour;
                    } else {
                        sign = "A.M";
                    }
                    timestamp = timestamp.getDate() + "-" + month + "-" + timestamp.getFullYear() + " " + hour + ":" + timestamp.getMinutes() + " " + sign;
                    
                    return (
                        <p className={`chat_message ${message.sender_email===email && "user_message"}`}>
                            <div className="chat_msg_username"><h3>{message.name}</h3></div>
                            <span className="chat_msg_content">
                                {message.content}
                            </span>
                            <div className="chat_msg_time">{timestamp}</div>
                        </p>
                    );
                })}
                {/* <p className="chat_message">
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
                </p> */}
                <div ref={chatDisplay} />
            </div>
            <InputBar token={token} email={email} />
        </div>
    );
}

export default Chat;