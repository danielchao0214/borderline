import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from 'leaflet'
import "@geoman-io/leaflet-geoman-free";
// import Draw from '@geoman-io/leaflet-geoman-freesrc/src/js/Draw/L.PM.Draw.Text.js';
// import { getTranslation } from '@geoman-io/leaflet-geoman-free/src/js/helpers';
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import styles from '@/styles/CustomButtons.module.css'


const Leaflet = () => {

    function saveToIndexedDB(json) {
        const jsonString = JSON.stringify(json);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a File from the Blob
        const file = new File([blob], "data.json");

        let db;
        var request = indexedDB.open("graphic", 1);
        var request_name;

        request.onupgradeneeded = (event) => {
            // store the result of opening the database.
            db = request.result;
            db.createObjectStore("graphic");
        };

        request.onsuccess = (event) => {
            // store the result of opening the database.
            db = request.result;
            const transaction = db.transaction('graphic', 'readwrite');
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
        var request = indexedDB.open("graphic", 1);

        request.onsuccess = (event) => {
            // store the result of opening the database.
            db = request.result;
            const transaction = db.transaction('graphic', 'readwrite');
            const fileStore = transaction.objectStore('graphic');

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

    function createLegend() {
        const textArea = document.createElement('div');
        // textArea.innerHTML = document.createElement('button');
        return textArea;
    }

// class legendControl {
//     onAdd(leafletContainer) {
//         this._map = leafletContainer;
//         this._container = document.createElement('div');
//         this._container.className = 'mapboxgl-ctrl';
//         this._container.innerHTML = 'Legend';
//         return this._container;
//     }

//     onRemove() {
//         this._container.parentNode.removeChild(this._container);
//         this._map = undefined;
//     }
// }

const context = useLeafletContext();

useEffect(() => {

    const leafletContainer = context.layerContainer || context.map;

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    getFile(leafletContainer)

    leafletContainer.pm.addControls({
        drawMarker: false,
        drawRectangle: false,
        drawPolyline: false,
        drawPolygon: false,
        drawCircle: false,
        drawCircleMarker: false,
        editMode: false,
        cutPolygon: false,
        removalMode: false,
        rotateMode: false,
        snappingOption: false,
    });

    leafletContainer.pm.Toolbar.createCustomControl({
        name: 'FillColor',
        block: 'custom',
        title: 'FillColor',
        onClick: () => {

        }
    })

    leafletContainer.pm.Toolbar.createCustomControl({
        name: 'Legend',
        block: 'custom',
        title: 'Legend',
        toggle: false,
        onClick: () => {
            // leafletContainer.addControl(new legendControl());
            L.Control.legend = L.Control.extend({
                onAdd: function (leafletContainer) {

                    var text = L.DomUtil.create('div');
                    text.id = "legend";
                    text.innerHTML = "<strong>Legend</strong>";
                    return text;
                },

                // onAdd: function(leaflet) {
                //     var button = L.DomUtil.create('button');
                //     button.id = "button";
                //     button.innerHTML = "<strong>Add</strong>"
                //     return button;
                // },

                onRemove: function (leafletContainer) {
                    // Nothing to do here
                }
            });
            L.control.legend = function (opts) { return new L.Control.legend(opts); }
            L.control.legend({ position: 'bottomright' }).addTo(leafletContainer);
        }
    })

    return () => {
        leafletContainer.pm.removeControls();
        leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
}, [context]);

return null;
};

export default Leaflet;