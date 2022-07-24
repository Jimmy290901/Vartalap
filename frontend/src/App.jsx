import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Pusher from "pusher-js";
import axios from "axios";

function App() {

  const [messages, setMessages] = useState([]);

  //Loads up the application initally with all messages
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/message/all",
    })
    .then((res) => {
      setMessages(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

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
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;