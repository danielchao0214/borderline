import { IconButton, Button, Modal, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'
import Typography from '@mui/material/Typography';
import shp from 'shpjs'



function ImportMapModal(props) {
    function handleShpDbfClick() {
        document.getElementById("importShp").click();
    }
    async function handleShpDbf() {

        let shpfile = document.getElementById("importShp").files[0];

        console.log(shpfile);


        const reader = new FileReader();

        // Define a callback function to handle the onload event when the file is loaded
        reader.onload = async(event) => {
        // Access the ArrayBuffer from the result property of the event
            const arrayBuffer = event.target.result;

            let json = await shp(arrayBuffer);

            console.log(json);
        
            const jsonString = JSON.stringify(json);

            // Create a Blob from the JSON string
            const blob = new Blob([jsonString], { type: 'application/json' });

            // Create a File from the Blob
            const file = new File([blob], shpfile.name.substring(0, shpfile.name.indexOf(".")) + ".json");

            handleGeoJSON(file);
        };

        // Use the FileReader instance to read the file as an ArrayBuffer
        reader.readAsArrayBuffer(shpfile);

        props.handleClose();
    }
    function handleGeoJSONClick() {
        document.getElementById("importGeo").click();
    }
    function handleGeoJSONChange() {
        handleGeoJSON(document.getElementById("importGeo").files[0])
    }
    function handleGeoJSON(file) {
        let db;
        var request = indexedDB.open("map", 1);
        var request_name;

        request.onupgradeneeded = (event) => {
        // store the result of opening the database.
            db = request.result;
            db.createObjectStore("map");
        };

        request.onsuccess = (event) => {
        // store the result of opening the database.
            db = request.result;
            const transaction = db.transaction('map', 'readwrite');
            const fileStore = transaction.objectStore('map');
            const addRequest = fileStore.put(new Blob([file], { type: file.type }), 1);
            addRequest.onsuccess = event => {
                console.log('File added to object store success');
                request_name = indexedDB.open("map", 1);
                request_name.onupgradeneeded = (event) => {
                // store the result of opening the database.
                    db = request.result;
                    const fileStore = db.createObjectStore("map");
                };
        
                request_name.onsuccess = (event) => {
                // store the result of opening the database.
                    db = request.result;
                    const transaction = db.transaction('map', 'readwrite');
                    const fileStore = transaction.objectStore('map');
                    const addRequest = fileStore.put(file.name, 2);
                    addRequest.onsuccess = event => {
                        console.log('File name added to object store success');
                        window.location.href = "/mapedit";
                        
                    };
                }
            };

            props.handleClose();
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
                <div className={styles.modal}>
                    <IconButton onClick={props.handleClose} className={styles.closeButton}> <CloseIcon /></IconButton>
                    <h2 id={styles.modalTitle}>Import File</h2>
                    <div className={styles.modalChoices}>
                        <div>
                            <Button variant="contained" className={styles.importButton} onClick={handleShpDbfClick}>SHP/DBF</Button>
                            <Input id="importShp" type="file" inputProps={{ multiple: true }} multiple onChange={handleShpDbf} style={{display:"none"}}></Input>
                            <Typography className={styles.importTypography}>
                                .zip file containing .shp
                            </Typography>
                            <Typography className={styles.importTypography}>
                                and .dbf files
                            </Typography>
                        </div>
                        <div>
                            <Button variant="contained" className={styles.importButton} onClick={handleGeoJSONClick}>GeoJSON</Button>
                            <Input id="importGeo" type="file" onChange={handleGeoJSONChange} style={{display:"none"}}></Input>
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