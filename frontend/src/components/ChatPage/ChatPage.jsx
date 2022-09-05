import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Chat from "../Chat/Chat.jsx";
import Pusher from "pusher-js";
import axios from "axios";

function ChatPage({token, email}) {
    const [data, setData] = useState({user_name: undefined, rooms: []});
    const [currChat, setCurrChat] = useState(0);
    //creating a pusher object
    const [pusher, setPusher] = useState(undefined);

    //Loads up the application initally with all messages
    useEffect(() => {
        const fetchData = async (token) => {
            await axios({
                    method: "get",
                    url: "http://localhost:8000/message/all",
                    headers: {
                        Authorization : "Bearer " + token,
                    },
                    params: {
                        email: email
                    }
                }).then((res) => {
                    setData(res.data);
                    setPusher(new Pusher(process.env.REACT_APP_key, {    
                        cluster : process.env.REACT_APP_cluster,
                        }));
                }).catch((err) => {
                    console.log(err);
                }
            );
        };

        if (token) {
            fetchData(token);
        } else {
            console.log("Un-authorized user");
        }
    }, [token, email]);
    
    useEffect(() => {
        if (pusher) {
            //creating a channel "messages" by subscribing to it through pusher object
            var channel = pusher.subscribe("messages");  
            
            //binding the channel to event "insert"
            channel.bind("message-inserted", (newMessage) => {
                const modData = {...data};
                const idx = modData.rooms.findIndex(room => room._id===newMessage.roomId);
                modData.rooms[idx].messages.push(newMessage);
                setData(modData);
            });

            //returning the cleanup function to avoid setting up channels again when messages update
            return () => {
                channel.unbind("message-inserted");
                channel.unsubscribe();
            }
        }
    }, [data, pusher]);

    let chatPgEle = null;
    if (data.rooms.length !== 0) {
        chatPgEle = (
            <div className="chatpage_body">
                <Sidebar data={data} setData={setData} currChat={currChat} setCurrChat={setCurrChat} token={token} email={email} />
                <Chat room={data.rooms[currChat]} token={token} email={email} name={data.user_name} />
            </div>
        );
    }

    return (
        <div className="ChatPage">
            {chatPgEle}
        </div>
    );
}

export default ChatPage;