import React from "react";
import "./Message.css";

function Message({message, email}) {
    let timestamp = new Date(message.timestamp);
    let month;
    month = (timestamp.getMonth() + 1);
    if (timestamp.getMonth() < 9) {
        month = "0" + month;
    }
    let day = timestamp.getDate();
    if (day < 10) {
        day = "0"+day;
    }
    let sign, hour = timestamp.getHours();
    if (hour >= 12) {
        sign = "P.M";
        hour = (hour > 12) ? hour-12 : hour;
    } else {
        sign = "A.M";
    }
    timestamp = day + "-" + month + "-" + timestamp.getFullYear() + " " + hour + ":" + timestamp.getMinutes() + " " + sign;
    
    return (
        <div className={`chat_message ${message.sender_email===email && "user_message"}`}>
            <div className="chat_msg_username"><h3>{message.name}</h3></div>
            <span className="chat_msg_content">
                {message.content}
            </span>
            <div className="chat_msg_time">{timestamp}</div>
        </div>
    );
}

export default Message;