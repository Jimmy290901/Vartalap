import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Chat from "./components/Chat/Chat.jsx";

function App() {
  return (
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
