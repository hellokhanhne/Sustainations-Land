import { CRS } from "leaflet";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { GeoJSON, MapContainer } from "react-leaflet";
import Back from "./Back";
import mapData from "./pangea.json";
import datagrid512 from "./512grid.json";
import datagrid from "./grid.json";

import Footer from "./footer";
import "./styles.css";

const binStyle = {
  fillColor: "green",
  fillOpacity: 1,
  color: "black",
  weight: 2,
};

function App() {
  const onEachbin = (bin: any, layer: any) => {
    const binId = bin.properties.id;

    // add event
    if (isSquare(bin)) {
      layer.on("mouseover", function (e) {
        layer.options.fillColor = "#ffffff";
        layer.options.color = "#000000";
        layer
          .bindPopup(
            `<p> Land id : <b>${binId}</b><p/> <p><b>HINH VUONG</b></p>`
          )
          .openPopup();
      });
    } else {
      layer.options.fillColor = "#002E5E";
      layer.options.color = "#000000";
      layer.on("mouseover", function (e) {
        layer.bindPopup(`<p> Land id : <b>${binId}</b><p/>`).openPopup();
      });
    }
  };

  const isSquare = (bin: any) => {
    const data = bin.geometry.coordinates[0][0];
    if (data.length !== 5) return false;
    const condition_1 = data[0][0] === data[4][0] && data[0][1] === data[4][1];
    const condition_2 = data[1][1] === data[2][1];
    const condition_3 = data[3][1] === data[4][1];
    return condition_1 && condition_2 && condition_3;
  };

  return (
    <div>
      <Footer />
      <Back />

      <GeoJSON style={binStyle} data={mapData.features} />
      <GeoJSON
        style={binStyle}
        data={datagrid.features}
        onEachFeature={(bin, layer: any) => {
          layer.options.fillColor = "rgba(0,0,0,0)";
        }}
      />
      {/* <GeoJSON
        style={binStyle}
        data={datagrid512.features.map((f: any, i: any) => ({
          ...f,
          properties: {
            ...f.properties,
            ADMIN: `<h3><b color:green>test bam o so ${f.properties.id}</b></h3>`,
          },
        }))}
        onEachFeature={onEachbin}
      /> */}
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <MapContainer
    style={{ height: "100vh", width: "100%" }}
    zoom={2}
    center={[1, 1]}
    crs={CRS.EPSG3857}
  >
    <App />
  </MapContainer>
);
