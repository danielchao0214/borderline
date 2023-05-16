import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const geoJsonLayer = L.geoJSON(data);

  if (geoJsonLayer.getLayers().length === 0) {
    // Handle case when GeoJSON data is empty
    return <div>No data available</div>;
  }

  const bounds = geoJsonLayer.getBounds();
  const center = bounds.getCenter();
  const zoom = calculateZoomLevel(bounds);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={data} />
    </MapContainer>
  );
};

export default MapComponent;

// Helper function to calculate the appropriate zoom level based on bounds
function calculateZoomLevel(bounds) {
  const WORLD_WIDTH = 256; // Width of the world in pixels at zoom level 0
  const ZOOM_MAX = 18; // Maximum zoom level
  const PADDING = 0.1; // Padding around the bounds

  const latDiff = bounds._northEast.lat - bounds._southWest.lat;
  const lngDiff = bounds._northEast.lng - bounds._southWest.lng;

  const latZoom = Math.floor(Math.log2(WORLD_WIDTH / latDiff));
  const lngZoom = Math.floor(Math.log2(WORLD_WIDTH / lngDiff));

  return Math.min(latZoom, lngZoom, ZOOM_MAX) - PADDING;
}