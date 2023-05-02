import React, { useState } from "react";
import { IconButton, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'


function CreatePostModal(props) {
    const [title, setTitle] = useState("");
    const [postby, setPostby] = useState("");
    const [postmessage, setPostmessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.handleClose();
        setPostby("MongoDB USER")
        let url = "/api/createpost"
        const res = await fetch(url, {
            method: "Post",
            body: JSON.stringify({
                title,
                postby,
                postmessage
            }),
            headers: {
                "content-type": "application/json"
            },
        }).catch((e) => console.log(e)); // Error for fetch request only

        // wait for the responce from request and get the body
        const data = await res.json();

        // If status code returns error print the code in the body
        if (res.status == 400) {
            console.log(data.errorMessage);
        }

        //If route is good then log the results and rout the use to login Screen
        if (res.status == 200) {
            console.log(data.message);
        }
    }

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={styles.modalContainer}
            >
                <form onSubmit={handleSubmit} className={styles.modal}>
                    <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                    <h2 id={styles.modalTitle}>Create Forum Post</h2>
                    <TextField
                        id="title"
                        label="Title..."
                        // className={styles.formTextField}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="body"
                        label="Body..."
                        // className={styles.formTextField}
                        value={postmessage}
                        onChange={(event) => setPostmessage(event.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        className={styles.postButton}
                        type="submit"
                    >
                        Post
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default CreatePostModal;