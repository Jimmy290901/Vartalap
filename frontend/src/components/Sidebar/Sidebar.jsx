import React, {useState, useEffect} from "react";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat.jsx";
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import JoinRoomPopup from "../JoinRoomPopup/JoinRoomPopup.jsx";

function Sidebar({data, setData, currChat, setCurrChat, token, email}) {
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    useEffect(()=>{
        setRooms(data.rooms.map((room) => {
            return {
                name: room.name,
                id: room._id
            }
        }));
    }, [data]);
    function handleModal() {
        setShowModal(true);
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://avatars.githubusercontent.com/u/67311906?s=40&v=4"/>
                <div className="sidebar_options">                    
                    {/* <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> */}
                    <IconButton onClick={handleModal}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_search_container">
                    <SearchIcon />
                    <input placeholder="Search or start new chat"/>
                </div>                
            </div>
            <div className="sidebar_chats">
                {rooms.map((room, index) => <SidebarChat name={room.name} key={room.id} index={index} currChat={currChat} setCurrChat={setCurrChat} />)}
            </div>
            {showModal && <JoinRoomPopup showModal={showModal} setShowModal={setShowModal} setCurrChat={setCurrChat} len={rooms.length} token={token} email={email} setData={setData} />}
        </div>
    );
}

export default Sidebar;