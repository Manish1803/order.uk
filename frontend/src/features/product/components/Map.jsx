import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const mcDonaldsOutlets = [
  { location: [51.5074, -0.128], city: "London", name: "Oxford Street" },
  { location: [51.4994, -0.1424], city: "London", name: "Leicester Square" },
  {
    location: [51.5062, -0.1316],
    city: "London",
    name: "Tottenham Court Road",
  },
  { location: [28.5635, 77.208], city: "Delhi", name: "Connaught Place" },
  { location: [28.6299, 77.2231], city: "Delhi", name: "Saket" },
  { location: [18.5204, 73.8567], city: "Pune", name: "MG Road" },
  { location: [18.5102, 73.8243], city: "Pune", name: "Kalyani Nagar" },
];

const mainIcon = new L.Icon({
  iconUrl: "./icons/marker-mcd.png",
  iconSize: [180, 74],
  iconAnchor: [16, 32],
  popupAnchor: [-80, 50],
});

const customIcon = new L.Icon({
  iconUrl: "./icons/marker.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function Map() {
  const position = [51.4983, -0.112];
  const rightPosition = [51.4983, -0.100112];

  return (
    <section className={styles.section}>
      <article className={styles.mapContainer}>
        <MapContainer
          center={position}
          zoom={12}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wl2p5OTJa6AJaFu0YXtU"
          />
          <Marker position={rightPosition} icon={mainIcon}></Marker>
          {mcDonaldsOutlets.map((outlet, i) => (
            <Marker key={i} position={outlet.location} icon={customIcon}>
              <Popup>
                <h3>{outlet.name}</h3>
                <p>{outlet.city}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className={styles.details}>
          <h2 className={styles.mapHeading}>McDonald&apos;s</h2>
          <p className={styles.mapSubHeading}>South London</p>
          <p>
            Tooley St, London Bridge, London SE1 2TF, <br />
            United Kingdom
          </p>
          <h3>Phone Number:</h3>
          <p className={styles.mapSubHeading}>+91 20 1234-18</p>
          <h3>Website:</h3>
          <p className={styles.mapSubHeading}>http://mcdonalds.uk/</p>
        </div>
      </article>
    </section>
  );
}

export default Map;
