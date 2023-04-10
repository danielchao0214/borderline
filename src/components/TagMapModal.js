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
                        <Button variant="contained" className={styles.publishButton}>Publish</Button>
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