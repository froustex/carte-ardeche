import { Geographies, Geography, Marker } from "react-simple-maps";

function getRadius(population) {
  return Math.sqrt(population) * 0.04;
}

export default function ZoneLayer({
  zones,
  setLevel,
  setSelectedZone,
  communes,
  total,
}) {
  return (
    <>
      <Geographies geography={zones}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const zoneNom = geo.properties.zone_nom;
            const zoneID = geo.properties.zone_id;

            return (
              <>
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#CBD5E1"
                  stroke="#ffffff"
                  style={{
                    hover: { fill: "#60A5FA" },
                  }}
                  onClick={() => {
                    setSelectedZone(zoneNom);
                    setLevel("commune");
                  }}
                />
              </>
            );
          })
        }
      </Geographies>
      <Marker coordinates={[4.5, 44.8]}>
        <circle r={18} fill="#2563eb" stroke="black" />
        <text textAnchor="middle" y={5} fill="#ffffff" fontWeight="bold">
          {total}
        </text>
      </Marker>
      <Geographies geography={communes}>
        {({ geographies }) =>
          geographies
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
                </Marker>
              );
            })
        }
      </Geographies>
    </>
  );
}
