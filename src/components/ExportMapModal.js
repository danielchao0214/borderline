import { IconButton, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'

function ExportMapModal(props) {
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
                <h2 id={styles.modalTitle}>Export File</h2>
                <div className={styles.modalChoices}>
                    <div>
                        <Button variant="contained" className={styles.exportButton}>SHP/DBF</Button>
                        <p className={styles.label}>.zip file containing .shp and .dbf files</p>
                    </div>
                    <div>
                        <Button variant="contained" className={styles.exportButton}>GeoJSON</Button>
                        <p className={styles.label}>.geojson file</p>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ExportMapModal;