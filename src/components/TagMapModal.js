import { useState } from 'react';
import { IconButton, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'
import TagCard from './TagCard';

function TagMapModal(props) {
    const [text, setText] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Text entered:', text);
        }
    };

    const handlePublish = async () => {
        let db;
        var request = indexedDB.open("map", 1);

        request.onsuccess = async(event) => {
            db = request.result;

            const transaction = db.transaction('map', 'readwrite');
            const fileStore = transaction.objectStore('map');

            // First get operation
            const getRequest1 = fileStore.get(1);
            const firstResultPromise = new Promise(resolve => getRequest1.onsuccess = resolve);

            // Second get operation
            const getRequest2 = fileStore.get(2);
            const secondResultPromise = new Promise(resolve => getRequest2.onsuccess = resolve);

            // Wait for both promises to resolve
            const [response1, response2] = await Promise.all([firstResultPromise, secondResultPromise]);

            var file = response1.target.result;
            var filename = response2.target.result;
            if (file) {
                var json = JSON.parse(await file.text());
                var name = filename.substring(0, filename.lastIndexOf("."));

                console.log("saving")
                let url = "/api/savemap";
                let title = name;
                let author = "None";
                let tags = "None";
                let file_size = file.size;
                let likes = 0;
                let dislikes = 0;
                let published = true;
                let publish_date = Date();
                let description = "None";
                let map = json;
                let comments = "None";
                let graphics = "None";
                let thumbnail = null;
                const res = await fetch(url, {
                    method: "Post",
                    body: JSON.stringify({
                    title,
                    author,
                    tags,
                    file_size,
                    likes,
                    dislikes,
                    published,
                    publish_date,
                    description,
                    map,
                    comments,
                    graphics,
                    thumbnail
                    }),
                    headers: {
                    "content-type": "application/json"
                    },
                }).catch((e) =>console.log(e)); // Error for fetch request only

                //If status code returns error print the code in the body
                if(res.status == 400){ 
                    console.log(data.errorMessage);
                }
            } 
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={styles.modalContainer}
        >
            <div className={styles.bigModal}>
                <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                <h2 id={styles.modalTitle}>Add Tags</h2>
                <div className={styles.tagSection}>
                    <TextField
                        label="Add Custom Tag"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ marginTop: "1em", marginBottom: "1em", width: "30vw" }}
                    />
                    <div className={styles.tags}>
                        <TagCard tag="testing1" />
                        <TagCard tag="testing2" />
                        <TagCard tag="testing3" />
                        <TagCard tag="testing4" />
                        <TagCard tag="testing5" />
                        <TagCard tag="testing6" />
                        <TagCard tag="testing7" />
                        <TagCard tag="testing8" />
                    </div>
                </div>
                <div className={styles.modalChoices}>
                    <div>
                        <Button onClick={handlePublish} variant="contained" className={styles.publishButton}>Publish</Button>
                    </div>
                    <div>
                        <Button variant="contained" className={styles.publishButton} onClick={props.handleClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default TagMapModal;