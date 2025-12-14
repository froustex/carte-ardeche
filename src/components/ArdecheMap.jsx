import React from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "/geo/ardeche-communes.json";

export default function ArdecheMap({ stats }) {
  return (
    <ComposableMap
      projection="geoMercator"
      width={800}
      height={600}
      style={{ width: "100%", height: "auto" }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const zoneId = geo.properties.id;
            const value = stats?.[zoneId] ?? 0;
            const center = geo.properties.center;

            return (
              <g key={geo.rsmKey}>
                <Geography
                  geography={geo}
                  stroke="#ffffff"
                  fill="#CBD5E1"
                  style={{
                    default: { fill: "#CBD5E1" },
                    hover: { fill: "#60A5FA" },
                    pressed: { fill: "#2563EB" },
                  }}
                />

                {center && (
                  <Marker coordinates={center}>
                    <circle r={20} fill="#2563EB" opacity={0.85} />
                    <text
                      textAnchor="middle"
                      y={5}
                      fill="#ffffff"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {value}
                    </text>
                  </Marker>
                )}
              </g>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
