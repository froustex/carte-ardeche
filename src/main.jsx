import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import MapPage from "./pages/MapPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MapPage />,
        loader: async () => {
          const [departement, zones, communes] = await Promise.all([
            fetch("/geo/departement.geojson").then((r) => r.json()),
            fetch("/geo/zones.geojson").then((r) => r.json()),
            fetch("/geo/communes.geojson").then((r) => r.json()),
          ]);
          return { departement, zones, communes };
        },
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
