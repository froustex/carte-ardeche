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
  showZones,
  onTotalClick,
  zonesTotals,
}) {
  const zonesCenter = {
    centre: [4.6, 44.84],
    nord: [4.62, 45.12],
    sud: [4.3, 44.55],
  };

  return (
    <>
      <Geographies geography={zones}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const zoneNom = geo.properties.zone_nom;

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
      {!showZones && (
        <Marker
          coordinates={[4.5, 44.8]}
          onClick={onTotalClick}
          className="cursor-pointer"
        >
          <circle r={18} fill="#2563eb" stroke="black" />

          <text textAnchor="middle" y={5} fill="#ffffff" fontWeight="bold">
            {total}
          </text>
        </Marker>
      )}
      {showZones &&
        Object.entries(zonesTotals).map(([zone, totalZone]) => {
          const [lon, lat] = zonesCenter[zone];
          return (
            <Marker key={zone} coordinates={[lon, lat]}>
              <circle r={18} fill="#2563eb" stroke="black" />
              <text y={7} textAnchor="middle" fill="#ffffff">
                {totalZone}
              </text>
            </Marker>
          );
        })}

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
                  <circle r={radius} fill="black" opacity={0.85} />
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
