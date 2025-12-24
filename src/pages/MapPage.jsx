import { useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import ArdecheMap from "../components/ArdecheMap";
import { getValueByFilter } from "../utils/dataUtils";
import test from "../data/test.json";

function MapPage() {
  const { departement, zones, communes } = useLoaderData();
  const [level, setLevel] = useState("zone");
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeFilter, setActiveFilter] = useState("tous");
  const [showZones, setShowZones] = useState(false);

  const total = Object.values(test.codes_postaux).reduce(
    (sum, CP) => sum + getValueByFilter(CP, activeFilter),
    0
  );

  function enrichStatsWithZone(stats, communesgeoJson) {
    const cpToZone = {};
    for (const item of communesgeoJson.features) {
      const cp = item.properties.code_postal;
      const zoneNom = item.properties.zone_nom;
      if (cp && zoneNom) {
        cpToZone[cp] = zoneNom;
      }
    }
    const enriched = {};
    for (const [cp, data] of Object.entries(stats)) {
      enriched[cp] = {
        zone: cpToZone[cp] || null,
        ...data,
      };
    }
    return enriched;
  }

  const stats = useMemo(
    () => enrichStatsWithZone(test.codes_postaux, communes),
    []
  );

  const zonesTotals = {};
  Object.values(stats).forEach((cp) => {
    if (!cp.zone) return;
    if (!zonesTotals[cp.zone]) {
      zonesTotals[cp.zone] = 0;
    }
    zonesTotals[cp.zone] += getValueByFilter(cp, activeFilter);
  });

  return (
    <>
      {level === "commune" && (
        <button
          type="button"
          className="absolute mt-6 right-50 border rounded-lg border-black p-2 cursor-pointer z-2 hover:bg-[#60A5FA]"
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

        {showZones && (
          <button
            className="border p-2 rounded-lg cursor-pointer hover:bg-[#60A5FA] w-24 justify-self-end"
            onClick={() => setShowZones(false)}
          >
            RETOUR
          </button>
        )}
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
          total={total}
          zonesTotals={zonesTotals}
          showZones={showZones}
          stats={stats}
          onTotalClick={() => setShowZones(true)}
          activeFilter={activeFilter}
        />
      </div>
    </>
  );
}

export default MapPage;
