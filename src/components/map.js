import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as React from 'react';
import dynamic from 'next/dynamic';
import Geoman from "./geoman";


const Map = () => {

  dynamic(() => import('@geoman-io/leaflet-geoman-free'), {
    ssr: false
  });

  const [mapLoad, setMapLoad] = React.useState(null);

  function getFile() {
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
          console.log(json);
          setMapLoad(<GeoJSON data={json} />);
        }
      };
    };
  }

  React.useEffect(() => {
    getFile();
    
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapLoad}
      <Geoman />
    </MapContainer>
  )
}

export default Map