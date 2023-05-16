import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Leaflet from './leaflet'


const MapGraphic = () => {

  // const [mapLoad, setMapLoad] = React.useState(null);

  // function getFile() {
  //   console.log("getting file");
  //   let db;
  //   var request = indexedDB.open("graphic", 1);

  //   request.onsuccess = (event) => {
  //     // store the result of opening the database.
  //     db = request.result;
  //     const transaction = db.transaction('graphic', 'readwrite');
  //     const fileStore = transaction.objectStore('graphic');

  //     var getRequest = fileStore.get(1);

  //     getRequest.onsuccess = async function(event) {
  //       var file = event.target.result;
  //       if (file) {
  //         var json = JSON.parse(await file.text());
  //         console.log(json);
  //         setMapLoad(<GeoJSON data={json}/>);
  //       }
  //     };
  //   };
  // }

  // React.useEffect(() => {
  //   getFile();
  // }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} zoomControl={false} scrollWheelZoom={false} dragging={false} style={{height: "100%", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Leaflet />
    </MapContainer>
  )
}

export default MapGraphic;