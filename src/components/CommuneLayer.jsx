import { Geographies, Geography, Marker } from "react-simple-maps";
import { getValueByFilter } from "../utils/dataUtils";

function getRadius(population) {
  return Math.sqrt(population) * 0.04;
}

export default function CommuneLayer({ selectedZone, zones, communes, total }) {
  return (
    <>
      <Geographies geography={zones}>
        {({ geographies }) =>
          geographies
            .filter((geo) => geo.properties.zone_nom === selectedZone)
            .map((geo) => {
              return (
                <g key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill="#CBD5E1"
                    stroke="#1f2937"
                    strokeWidth={0.4}
                  />
                </g>
              );
            })
        }
      </Geographies>
      <Geographies geography={communes}>
        {({ geographies }) =>
          geographies
            .filter((geo) => geo.properties.zone_nom === selectedZone)
            .filter((geo) => geo.properties.population > 4000)
            .filter(
              (geo) =>
                geo.properties.center_lon !== undefined &&
                geo.properties.center_lat !== undefined
            )
            .map((geo) => {
              const { center_lon, center_lat, nom_officiel } = geo.properties;
              const radius = getRadius(geo.properties.population);
              return (
                <Marker key={geo.rsmKey} coordinates={[center_lon, center_lat]}>
                  <circle r={radius} fill="#2563eb" opacity={0.85} />
                  <text
                    y={nom_officiel === "Saint-Péray" ? -4 : 10}
                    textAnchor="middle"
                    fontSize={9}
                    fill="#111827"
                  >
                    {nom_officiel}
                  </text>
                  <circle r={radius} fill="#2563eb" opacity={0.85} />
                  <text
                    y={nom_officiel === "Saint-Péray" ? -4 : 10}
                    textAnchor="middle"
                    fontSize={9}
                    fill="#111827"
                  >
                    {nom_officiel}
                  </text>
                </Marker>
              );
            })
        }
      </Geographies>
    </>
  );
}
