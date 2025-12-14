/**
 * OPTIMISATION COMPLETE D'UN GEOJSON
 * - Supprime les propriétés inutiles
 * - Réduit la précision des coordonnées
 * - Simplifie les polygones
 */
import fs from "fs";
import mapshaper from "mapshaper";

// ========= PARAMETRES =========
const INPUT_FILE = "ardeche-communes.geojson";
const OUTPUT_FILE = "ardeche-communes-optimized.geojson";
const COORD_PRECISION = 2; // 2 ou 3 max pour un département
const SIMPLIFY_PERCENT = "5%"; // 3% à 8% recommandé
// ==============================

// --- Réduction de précision ---
function roundCoords(coords, precision) {
  if (typeof coords[0] === "number") {
    return coords.map((c) => Number(c.toFixed(precision)));
  }
  return coords.map((c) => roundCoords(c, precision));
}

// --- Étape 1 : lecture ---
const geojson = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

// --- Étape 2 : nettoyage des propriétés ---
const cleaned = {
  type: "FeatureCollection",
  features: geojson.features.map((f) => ({
    type: "Feature",
    properties: {
      name: f.properties.nom || f.properties.NOM || f.properties.name,
      insee:
        f.properties.code || f.properties.codeInsee || f.properties.INSEE_COM,
    },
    geometry: {
      type: f.geometry.type,
      coordinates: roundCoords(f.geometry.coordinates, COORD_PRECISION),
    },
  })),
};

// --- Étape 3 : simplification des polygones ---
const input = JSON.stringify(cleaned);

mapshaper.applyCommands(
  `-i input.geojson -simplify ${SIMPLIFY_PERCENT} keep-shapes -o output.geojson`,
  { "input.geojson": input },
  (err, output) => {
    if (err) {
      console.error("❌ Erreur Mapshaper :", err);
      return;
    }

    fs.writeFileSync(OUTPUT_FILE, output["output.geojson"]);

    console.log("✅ GeoJSON optimisé avec succès");
    console.log(`➡ Fichier créé : ${OUTPUT_FILE}`);
  }
);
