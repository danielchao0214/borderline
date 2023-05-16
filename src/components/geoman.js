import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const Geoman = () => {

    function saveToIndexedDB(json) {
        const jsonString = JSON.stringify(json);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a File from the Blob
        const file = new File([blob], "data.json");

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
            };
        }
    }

    async function getFile(container) {
        console.log("getting file");
        let db;
        var request = indexedDB.open("map", 1);

        request.onsuccess = (event) => {
            // store the result of opening the database.
            db = request.result;
            const transaction = db.transaction('map', 'readwrite');
            const fileStore = transaction.objectStore('map');

            var getRequest = fileStore.get(1);

            getRequest.onsuccess = async function (event) {
                var file = event.target.result;
                if (file) {
                    var json = JSON.parse(await file.text());
                    console.log(json);
                    L.geoJSON(json, { pmIgnore: false }).addTo(container);
                    container.pm
                    .getGeomanLayers()
                    .map((layer, index) => layer.on("pm:edit", (e) => {
                        console.log(container.pm.getGeomanLayers(true).toGeoJSON());
                        saveToIndexedDB(container.pm.getGeomanLayers(true).toGeoJSON());
                    }));
                }
            };
        };
    }

    const context = useLeafletContext();

    useEffect(() => {

        const leafletContainer = context.layerContainer || context.map;

        getFile(leafletContainer)

        leafletContainer.pm.addControls({
            drawMarker: false
        });

        leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

        //leafletContainer.pm.enableGlobalEditMode();

        leafletContainer.on("pm:create", (e) => {
            if (e.layer && e.layer.pm) {
                saveToIndexedDB(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
                const shape = e;
                console.log(e);

                // enable editing of circle
                //shape.layer.pm.enable();

                console.log(`object created: ${shape.layer.pm.getShape()}`);
                // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
                leafletContainer.pm
                    .getGeomanLayers(true)
                    .bindPopup("i am whole")
                    .openPopup();
                // leafletContainer.pm
                //   .getGeomanLayers()
                //   .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`));

                console.log(shape.layer)
                shape.layer.on("pm:edit", (e) => {
                    const event = e;
                    saveToIndexedDB(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
                });
            }
        });

        leafletContainer.on("pm:remove", (e) => {
            console.log("object removed");
            saveToIndexedDB(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });

        return () => {
            leafletContainer.pm.removeControls();
            leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
        };
    }, [context]);

    return null;
};

export default Geoman;
