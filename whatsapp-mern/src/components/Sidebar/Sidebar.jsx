import React from "react";
import "./Sidebar.css";
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://avatars.githubusercontent.com/u/67311906?s=40&v=4"/>
                <div className="sidebar_options">                    
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;