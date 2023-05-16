import { IconButton, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css';
import shpwrite from 'shp-write';

async function handleShpDbf(props) {
    console.log("getting file");
    let db;
    var request = indexedDB.open("map", 1);

    request.onsuccess = (event) => {
        // store the result of opening the database.
        db = request.result;
        const transaction = db.transaction('map', 'readwrite');
        const fileStore = transaction.objectStore('map');

        var getRequest = fileStore.get(1);

        getRequest.onsuccess = async function(event) {
            var file = event.target.result;
            if (file) {
                var str = await file.text();
                console.log(str)

                var json = JSON.parse(str);

                console.log(json);
                const shpBuffer = shpwrite.download(json);

                console.log(shpBuffer);

                // var a = window.document.createElement('a');
                // a.href = window.URL.createObjectURL(new File([shpBuffer], "export.zip", {type: "application/zip"}));
                // a.download = "export.zip";

                // // Append anchor to body.
                // document.body.appendChild(a);
                // a.click();

                // // Remove anchor from body
                // document.body.removeChild(a);
            }
        }
    }
}  

function handleGeoJSON(props) {
    console.log("getting file");
    let db;
    var request = indexedDB.open("map", 1);

    request.onsuccess = (event) => {
        // store the result of opening the database.
        db = request.result;
        const transaction = db.transaction('map', 'readwrite');
        const fileStore = transaction.objectStore('map');

        var getRequest = fileStore.get(1);

        getRequest.onsuccess = async function(event) {
            var file = event.target.result;
            if (file) {
                var json = JSON.parse(await file.text());
                var a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new File([file], "export.json", {type: file.type}));
                a.download = "export.json";

                // Append anchor to body.
                document.body.appendChild(a);
                a.click();

                // Remove anchor from body
                document.body.removeChild(a);
            }
        }
    }
}

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
                        <Button onClick={handleShpDbf} variant="contained" className={styles.exportButton}>SHP/DBF</Button>
                        <p className={styles.label}>.zip file containing .shp and .dbf files</p>
                    </div>
                    <div>
                        <Button onClick={handleGeoJSON} variant="contained" className={styles.exportButton}>GeoJSON</Button>
                        <p className={styles.label}>.geojson file</p>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ExportMapModal;