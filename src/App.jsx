import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 className="justify-self-center text-4xl font-bold">Carte statistique</h1>

      <Outlet />
    </div>
  );
}

export default App;
