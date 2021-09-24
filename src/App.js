import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import * as schoolData from "./data/delaware-schools.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedSchool(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 39.7447 , lng: -75.539787 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {schoolData.features.map(school => (
        <Marker
          key={school.properties.OBJECTID}
          position={{
            lat: school.geometry.coordinates[1],
            lng: school.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedSchool(school);
          }}
          icon={{
            url: `/images.png`,
            scaledSize: new window.google.maps.Size(20, 20)
          }}
        />
      ))}

      {selectedSchool && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedSchool(null);
          }}
          position={{
            lat: selectedSchool.geometry.coordinates[1],
            lng: selectedSchool.geometry.coordinates[0]
          }}
        >
          <div>
          <a href= "www.zoho.com">
            <h2>{selectedSchool.properties.SCHOOLNAME}</h2>
          </a>
            <p>{selectedSchool.properties.STREETADDR}</p>
            <p>{selectedSchool.properties.CITY}</p>          
            <p>{selectedSchool.properties.ZIPCODE}</p>
            
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=` //Remove curly braces and $
          // process.env.REACT_APP_GOOGLE_KEY
}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
