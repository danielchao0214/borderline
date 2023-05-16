import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const Geoman = () => {

    let transactions = [];
    let max_transactions = 15;
    for (let i = 0; i < max_transactions; i++) {
        transactions[i] = null;
    }
    let index = 0;

    function addTransaction(json, container) {
        //console.log(transactions);
        if (index < max_transactions) {
            transactions[index] = json;
            index++;
            for (let i = index; i < max_transactions; i++) {
                transactions[i] = null;
            }
        }else{
            transactions.shift();
            transactions.push(json);
        }
        let removemode = false;
        if (container.pm.globalRemovalModeEnabled()) {
            removemode = true;
        }
        container.pm.getGeomanLayers().map((layer, index) => {
            layer.remove();
        });
        L.geoJSON(transactions[index - 1], { pmIgnore: false }).addTo(container);
        //leafletContainer.pm.getGeomanLayers().map((layer, index) => layer.bindPopup(layer));
                    
            container.pm
                    .getGeomanLayers()
                    .map((layer, index) => layer.on("pm:edit", (e) => {
                        console.log(container.pm.getGeomanLayers(true).toGeoJSON());
                        addTransaction(container.pm.getGeomanLayers(true).toGeoJSON(), container);
                    }));
        saveToIndexedDB(transactions[index - 1]);
        if (removemode) {
            container.pm.enableGlobalRemovalMode();
        }
        //console.log(transactions);
    }

    function undo(container) {
        //console.log(transactions);
        if (index > 1) {
            index--;
            container.pm.getGeomanLayers().map((layer, index) => {
                layer.remove();
            });
            L.geoJSON(transactions[index - 1], { pmIgnore: false }).addTo(container);
                    container.pm
                    .getGeomanLayers()
                    .map((layer, index) => layer.on("pm:edit", (e) => {
                        console.log(container.pm.getGeomanLayers(true).toGeoJSON());
                        addTransaction(container.pm.getGeomanLayers(true).toGeoJSON(), container);
                    }));
            saveToIndexedDB(transactions[index - 1]);
        }
        //console.log(transactions);
    }

    function redo(container) {
        //console.log(transactions);
        if (index < max_transactions && transactions[index]) {
            index++;
            container.pm.getGeomanLayers().map((layer, index) => {
                layer.remove();
            });
            L.geoJSON(transactions[index - 1], { pmIgnore: false }).addTo(container);
                    container.pm
                    .getGeomanLayers()
                    .map((layer, index) => layer.on("pm:edit", (e) => {
                        console.log(container.pm.getGeomanLayers(true).toGeoJSON());
                        addTransaction(container.pm.getGeomanLayers(true).toGeoJSON(), container);
                    }));
            saveToIndexedDB(transactions[index - 1]);
        }
        //console.log(transactions);
    }

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
                    addTransaction(container.pm.getGeomanLayers(true).toGeoJSON(), container);
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
                addTransaction(leafletContainer.pm.getGeomanLayers(true).toGeoJSON(), leafletContainer);
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
                    addTransaction(leafletContainer.pm.getGeomanLayers(true).toGeoJSON(), leafletContainer);
                });
            }
        });

        leafletContainer.on("pm:remove", (e) => {
            console.log("object removed");
            addTransaction(leafletContainer.pm.getGeomanLayers(true).toGeoJSON(), leafletContainer);
        });

          

        leafletContainer.pm.Toolbar.createCustomControl({
            name: 'Compress',
            block: 'custom',
            title: 'Compress',
            onClick: () => {
                console.log("compress");
                // let arr = leafletContainer.pm.getGeomanLayers()
                // for(let i = 0; i < arr.length; i++) {
                //     console.log(arr[i]['feature']['geometry']['coordinates'])
                // }
                leafletContainer.pm.getGeomanLayers().map((layer, index) => {
                    let coords = layer.getLatLngs();
                    console.log(coords)

                    let newarr = [];
                    for (let i = 0; i < coords.length; i++) {
                        let arr = coords[i];
                        if (coords[i].length == 1 && coords[i][0].length) {
                            arr = coords[i][0];
                        }
                        let temp = [];
                        for (let j = 0; j < arr.length; j++) {
                            if (j % 2 == 1) {
                                temp.push(arr[j]);
                            }
                        }
                        newarr.push(temp);
                    }
                    console.log(newarr);
                    for (let i = 0; i < newarr.length; i++) {
                        if (newarr[i].length < 2) {
                            newarr.splice(i, 1);
                            i--;
                        }
                    }
                    if (newarr.length == 0) {
                        layer.remove();
                    }else{
                        console.log("adding")
                        console.log(newarr)
                        layer.setLatLngs(newarr);
                    }
                })
                addTransaction(leafletContainer.pm.getGeomanLayers(true).toGeoJSON(), leafletContainer);
                ;
                //console.log(leafletContainer.pm.getGeomanLayers(false))
            },
            toggle: false
        });

        leafletContainer.pm.Toolbar.createCustomControl({
            name: 'Undo',
            block: 'custom',
            title: 'Undo',
            onClick: () => {
                undo(leafletContainer)
            },
            toggle: false
        });

        leafletContainer.pm.Toolbar.createCustomControl({
            name: 'Redo',
            block: 'custom',
            title: 'Redo',
            onClick: () => {
                redo(leafletContainer)
            },
            toggle: false
        });

        // leafletContainer.pm.Toolbar.createCustomControl({
        //     name: 'Split',
        //     block: 'custom',
        //     title: 'Split',
        //     onClick: () => {
                
        //     },
        //     toggle: true
        // });

        // copy a rectangle and customize its name, block, title and actions
        // leafletContainer.pm.Toolbar.copyDrawControl('Split', {
        //     name: 'Split',
        //     block: 'custom',
        //     title: 'Display text on hover button'
        // });

        return () => {
            leafletContainer.pm.removeControls();
            leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
        };
    }, [context]);

    return null;
};

export default Geoman;
