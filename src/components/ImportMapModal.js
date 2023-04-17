import { IconButton, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploader from './FileUploader';
import styles from '@/styles/Modal.module.css'
import Typography from '@mui/material/Typography';


function ImportMapModal(props) {
    function handleShpDbf() {
        props.handleClose();
    }
    function handleGeoJSON() {
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
                <div className={styles.modal}>
                    <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                    <h2 id={styles.modalTitle}>Import File</h2>
                    <div className={styles.modalChoices}>
                        <div>
                            <Button variant="contained" className={styles.importButton} onClick={handleShpDbf}>SHP/DBF</Button>
                            <Typography className={styles.importTypography}>
                                .zip file containing .shp
                            </Typography>
                            <Typography className={styles.importTypography}>
                                and .dbf files
                            </Typography>
                        </div>
                        <div>
                            <Button variant="contained" className={styles.importButton} onClick={handleGeoJSON}>GeoJSON</Button>
                            <Typography className={styles.importTypography}>
                                .geojson file
                            </Typography>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ImportMapModal;