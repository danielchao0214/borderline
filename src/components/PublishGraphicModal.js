import { IconButton, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'

function PublishGraphicModal(props) {

    const handlePublish = async () => {
        let url = "/api/savemap";
        let title = "test"; //file.name.substring(0, file.name.lastIndexOf("."));
        let author = "None";
        let tags = "None";
        let file_size = 10;//file.size;
        let likes = 0;
        let dislikes = 0;
        let published = true;
        let publish_date = Date();
        let description = "None";
        let map = "test" //await file.arrayBuffer();
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

        // If status code returns error print the code in the body
        if(res.status == 400){ 
        console.log(data.errorMessage);
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
            <div className={styles.modal}>
                <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                <h2 id={styles.modalTitle}>Publish</h2>
                <h3 id={styles.modalSubtitle}>Are you sure?</h3>
                <div className={styles.modalChoices}>
                    <div>
                        <Button onClick={handlePublish} variant="contained" className={styles.publishButton} onClick={props.handleClose}>Yes</Button>
                    </div>
                    <div>
                        <Button variant="contained" className={styles.publishButton} onClick={props.handleClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PublishGraphicModal;