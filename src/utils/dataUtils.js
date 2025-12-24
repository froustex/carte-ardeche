export function getTotalCP(CP) {
  return (CP.agents || 0) + (CP.employés || 0) + (CP.ouvriers || 0);
}

export function getValueByFilter(CP, filter) {
  if (!CP) return 0;
  if (!filter || filter === "tous") {
    return getTotalCP(CP);
  }
  return CP[filter] || 0;
}

/*const testZone = Object.values(zones.features);
  for (const item of testZone) {
    console.log(item.properties);
  }
  console.log(selectedZone);

  const testCom = Object.values(communes.features);
  for (const item of testCom) {
    if (item.properties.zone_nom === selectedZone) {
      console.log(item.properties.code_postal);
    }
  }*/
