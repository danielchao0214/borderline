import { IconButton, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'

function PublishMapModal(props) {
    function handleYes() {
        props.openTag(true);
        props.handleClose();
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
                        <Button variant="contained" className={styles.publishButton} onClick={handleYes}>Yes</Button>
                    </div>
                    <div>
                        <Button variant="contained" className={styles.publishButton} onClick={props.handleClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PublishMapModal;