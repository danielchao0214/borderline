import { IconButton, Button, Modal, Input, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'
import Box from '@mui/system/Box';


function EmptyFieldErrorModal(props) {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={styles.errorModalContainer}
            >
                <Box className={styles.errorModal}>
                    <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                    <Typography
                        variant="h5"
                        className={styles.modalTitle}
                    >
                        Error!
                    </Typography>
                    <Typography className={styles.modalText}>
                        Please fill out all fields
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EmptyFieldErrorModal;