import { ComposableMap } from "react-simple-maps";
import ZoneLayer from "./ZoneLayer";
import CommuneLayer from "./CommuneLayer";

export default function ArdecheMap({
  zones,
  communes,
  level,
  setLevel,
  selectedZone,
  setSelectedZone,
  activeFilter,
  setActiveFilter,
  total,
  getValueByFilter,
}) {
  return (
    <div>
      <div className="-mt-12">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [4.6, 44.4],
            scale: 12000,
          }}
          width={800}
          height={600}
          style={{ width: "100%", height: "auto" }}
        >
          {level === "zone" && (
            <ZoneLayer
              zones={zones}
              communes={communes}
              setLevel={setLevel}
              setSelectedZone={setSelectedZone}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              total={total}
              getValueByFilter={getValueByFilter}
            />
          )}

          {level === "commune" && (
            <CommuneLayer
              zones={zones}
              selectedZone={selectedZone}
              communes={communes}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              total={total}
              getValueByFilter={getValueByFilter}
            />
          )}
        </ComposableMap>
      </div>
    </div>
  );
}
