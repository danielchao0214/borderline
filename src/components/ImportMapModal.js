import { IconButton, Button, Modal, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '@/styles/Modal.module.css'
import Typography from '@mui/material/Typography';
import { shp, dbf } from 'shapefile';


function ImportMapModal(props) {
    function handleShpDbfClick() {
        document.getElementById("importShp").click();
    }
    function handleShpDbf() {

        let files = document.getElementById("importShp").files
        let shp = undefined;
        let dbf = undefined;
        for (let i = 0; i < files.length; i++) {
            if (files[i].name.endsWith(".shp")) {
                shp = files[i];
            }else if (files[i].name.endsWith(".dbf")) {
                dbf = files[i];
            }
        }

        if (shp && dbf) {
            // Load the shapefile data
            shp(shp).then(source => {
            // Read the .dbf file data
            dbf(dbf).then(attributeData => {
                // Combine the shapefile features and .dbf attribute data
                const geojson = {
                type: 'FeatureCollection',
                features: source.features.map((feature, index) => {
                    return {
                    type: 'Feature',
                    geometry: feature.geometry,
                    properties: { ...feature.properties, ...attributeData[index] }
                    };
                })
                };
                // geojson object now contains the converted GeoJSON data with .dbf data
                console.log(geojson);
            }).catch(error => {
                // Handle .dbf loading error if any
                console.error('Error while loading .dbf file:', error);
            });
            }).catch(error => {
            // Handle .shp loading error if any
            console.error('Error while converting shapefile to GeoJSON:', error);
            });
        }
    

        // let db;
        // var request = indexedDB.open("map", 1);
        // var request_name;

        // request.onupgradeneeded = (event) => {
        //     // store the result of opening the database.
        //     db = request.result;
        //     db.createObjectStore("map");
        // };

        // request.onsuccess = (event) => {
        // // store the result of opening the database.
        //     db = request.result;
        //     const file = document.getElementById("importGeo").files[0];
        //     const transaction = db.transaction('map', 'readwrite');
        //     const fileStore = transaction.objectStore('map');
        //     const addRequest = fileStore.put(new Blob([file], { type: file.type }), 1);
        //     addRequest.onsuccess = event => {
        //         console.log('File added to object store success');
        //         request_name = indexedDB.open("map", 1);
        //         request_name.onupgradeneeded = (event) => {
        //         // store the result of opening the database.
        //             db = request.result;
        //             const fileStore = db.createObjectStore("map");
        //         };
        
        //         request_name.onsuccess = (event) => {
        //         // store the result of opening the database.
        //             db = request.result;
        //             const transaction = db.transaction('map', 'readwrite');
        //             const fileStore = transaction.objectStore('map');
        //             const addRequest = fileStore.put(file.name, 2);
        //             addRequest.onsuccess = event => {
        //                 console.log('File name added to object store success');
        //                 window.location.href = "/mapedit";
        //             }
        //         };
        //     }
        // };

        props.handleClose();
    }
    function handleGeoJSONClick() {
        document.getElementById("importGeo").click();
    }
    function handleGeoJSON() {
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
            const file = document.getElementById("importGeo").files[0];
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
                            <Input id="importGeo" type="file" onChange={handleGeoJSON} style={{display:"none"}}></Input>
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