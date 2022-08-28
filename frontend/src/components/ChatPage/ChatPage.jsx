import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Chat from "../Chat/Chat.jsx";
import Pusher from "pusher-js";
import axios from "axios";
  

function ChatPage(props) {
    const [messages, setMessages] = useState([]);

    const fetchData = async (token) => {
        await axios({
                method: "get",
                url: "http://localhost:8000/message/all",
                headers: {
                    Authorization : "Bearer " + token,
                }
            }).then((res) => {
                setMessages(res.data);
            }).catch((err) => {
                console.log(err);
            }
        );
    };

    //Loads up the application initally with all messages
    useEffect(() => {
        // console.log(props.token);
        if (props.token) {
            // console.log("GET request shooted");
            fetchData(props.token);
        } else {
            // console.log("GET request not shooted");
        }
    }, [props.token]);

    useEffect(() => {
        //creating a pusher object
        const pusher = new Pusher(process.env.REACT_APP_key, {    
        cluster : process.env.REACT_APP_cluster,
        });

        //creating a channel "messages" by subscribing to it through pusher object
        var channel = pusher.subscribe("messages");  
        
        //binding the channel to event "insert"
        channel.bind("message-inserted", (newMessage) => {
        setMessages([...messages, newMessage]);
        // alert(JSON.stringify(data));
        });

        //returning the cleanup function to avoid setting up channels again when messages update
        return () => {
        channel.unbind("message-inserted");
        channel.unsubscribe();
        }
    }, [messages]);



    return (
        <div className="ChatPage">
        <div className="chatpage_body">
            <Sidebar />
            <Chat messages={messages} token={props.token} />
        </div>
        </div>
    );
}

export default ChatPage;