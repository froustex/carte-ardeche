import { Geographies, Geography, Marker } from "react-simple-maps";
import { useMemo } from "react";

function getRadius(population) {
  return Math.sqrt(population) * 0.04;
}

export default function CommuneLayer({
  selectedZone,
  zones,
  communes,
  stats,
  activeFilter,
}) {
  const communesInZone = useMemo(
    () =>
      communes.features.filter((c) => c.properties.zone_nom === selectedZone),

    [selectedZone]
  );

  const totalZone = useMemo(() => {
    return communesInZone.reduce((sum, c) => {
      const cp = c.properties.code_postal;

      const data = stats[cp];

      if (!data) return sum;

      if (activeFilter) {
        return sum + (data[activeFilter] || 0);
      }
      return sum + Object.values(data).reduce((a, b) => a + b, 0);
    }, 0);
  }, [communesInZone, stats, activeFilter]);
  console.log(totalZone);

  const zoneCenter = useMemo(() => {
    if (!communesInZone.length) return null;
    const sum = communesInZone.reduce(
      (acc, c) => ({
        lon: acc.lon + c.properties.center_lon,
        lat: acc.lat + c.properties.center_lat,
      }),
      { lon: 0, lat: 0 }
    );
    return [sum.lon / communesInZone.length, sum.lat / communesInZone.length];
  }, [communesInZone]);

  return (
    <>
      <Geographies geography={zones}>
        {({ geographies }) =>
          geographies
            .filter((geo) => geo.properties.zone_nom === selectedZone)
            .map((geo) => {
              return (
                <g>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#CBD5E1"
                    stroke="#1f2937"
                    strokeWidth={0.4}
                  />
                  <Marker coordinates={zoneCenter}>
                    <circle r={11} fill="#2563eb" />
                    <text>{totalZone}</text>
                  </Marker>
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
