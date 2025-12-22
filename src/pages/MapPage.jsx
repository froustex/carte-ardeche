import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ArdecheMap from "../components/ArdecheMap";
import { getValueByFilter } from "../utils/dataUtils";
import test from "../../public/geo/test.json";

function MapPage() {
  const { departement, zones, communes } = useLoaderData();
  const [level, setLevel] = useState("zone");
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeFilter, setActiveFilter] = useState("tous");

  const total = Object.values(test.codes_postaux).reduce(
    (sum, CP) => sum + getValueByFilter(CP, activeFilter),
    0
  );
  /*const testZone = Object.values(zones.features);
  let arr = [];
  for (const item of testZone) {
    arr.push(item.properties.zone_nom);
  }
  console.log(arr);

  /*const testCom = Object.values(communes.features);
  let ob = {}
  let arr = []
  for (const item of testCom) {
    if (!item.properties.zone_nom) {
      ar.push
    }
  }*/
  console.log(test.codes_postaux);

  return (
    <>
      {level === "commune" && (
        <button
          type="button"
          className="absolute -mt-8 right-50 border-3 rounded-lg border-black p-6 cursor-pointer z-2 hover:bg-[#60A5FA]"
          onClick={() => {
            setLevel("zone");
            setSelectedZone(null);
          }}
        >
          Retour à la Carte
        </button>
      )}
      <div className="flex gap-10 ml-20 p-6 ">
        <button
          className="border p-2 rounded-lg cursor-pointer hover:bg-[#60A5FA] w-24"
          type="button"
          onClick={() => setActiveFilter("tous")}
        >
          TOTAL
        </button>
        <button
          className="border p-2 rounded-lg cursor-pointer hover:bg-[#60A5FA] w-24"
          type="button"
          onClick={() => setActiveFilter("agents")}
        >
          AGENTS
        </button>
        <button
          className="border p-2 rounded-lg cursor-pointer hover:bg-[#60A5FA] w-24"
          type="button"
          onClick={() => setActiveFilter("employés")}
        >
          EMPLOYES
        </button>
        <button
          className="border p-2 rounded-lg cursor-pointer hover:bg-[#60A5FA] w-24"
          type="button"
          onClick={() => setActiveFilter("ouvriers")}
        >
          OUVRIERS
        </button>
      </div>
      <div>
        <ArdecheMap
          departement={departement}
          zones={zones}
          communes={communes}
          level={level}
          setLevel={setLevel}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          total={total}
        />
      </div>
    </>
  );
}

export default MapPage;
