import { IconButton, Button, Modal, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'
import Box from '@mui/system/Box';


function CreatePostModal(props) {
    function handlePost() {
        props.handleClose();
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
                <Box className={styles.modal}>
                    <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                    <h2 id={styles.modalTitle}>Create Forum Post</h2>
                    <textarea placeholder="Enter Title..." name="create comment textbox" >
                    </textarea>
                    <textarea placeholder="Body..." name="create comment textbox" >
                    </textarea>
                    <Button
                        variant="contained"
                        className={styles.postButton}
                        onClick={handlePost}
                    >
                        Post
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default CreatePostModal;