import fs from "fs";

const data = JSON.parse(fs.readFileSync("communes-france.geojson", "utf8"));

const ardeche = {
  ...data,
  features: data.features.filter(
    (f) =>
      f.properties.code?.startsWith("07") ||
      f.properties.codeInsee?.startsWith("07") ||
      f.properties.codeDepartement === "07"
  ),
};

fs.writeFileSync("ardeche-communes.json", JSON.stringify(ardeche, null, 2));

console.log("✔ Fichier ardeche-communes.geojson créé");
