import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"
import "./JoinRoomPopup.css";
import { Button } from "@mui/material";
import axios from "axios";

function JoinRoomPopup({showModal, setShowModal, token, email, data, setData}) {
    const [roomName, setRoomName] = useState("");
    const [inputErr, setInputErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    function closeModal() {
        setShowModal(false);
    }

    function handleChange(e) {
        setRoomName(e.target.value);
    }

    async function handleSubmit(e) {
        if (roomName.length < 1) {
            setInputErr(true);
            setErrMsg("Field cannot be empty");
            return;
        }
        await axios({
            method: "post",
            url: "http://localhost:8000/room/join",
            data: {
                roomName: roomName,
                email: email
            },
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (res.data.status === "error") {
                setInputErr(true);
                setErrMsg(res.data.message);
            } else {
                setRoomName("");
                setShowModal(false);
                setData((prevData) => {
                    return {
                        user_name: prevData.user_name,
                        rooms: [
                            ...prevData.rooms,
                            res.data.roomData
                        ]
                    };
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Modal open={showModal} onClose={closeModal}>
            <Box className="popup-box">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Join a Room
                </Typography>
                <TextField fullWidth label="Room Name" variant="outlined" value={roomName} onChange={handleChange}  error={inputErr} helperText={errMsg} id={(inputErr && "outlined-error-helper-text") || "outlined-basic"}/>
                <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>Join</Button>
            </Box>
        </Modal>
    );
}

export default JoinRoomPopup;