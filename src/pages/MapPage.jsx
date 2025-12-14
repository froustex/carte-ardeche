import { useLoaderData } from "react-router-dom";
import ArdecheMap from "../components/ArdecheMap";

function MapPage() {
  const data = useLoaderData();
  console.log(data);

  return (
    <div>
      <ArdecheMap stats={data} />
    </div>
  );
}

export default MapPage;
