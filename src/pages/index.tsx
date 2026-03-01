import dynamic from "next/dynamic";
import { useGlobalContext } from "@/context/GlobalContext";

const DashboardApp1 = dynamic(() => import("remote1/DashboardApp"), {
  ssr: false,
});

const DashboardApp2 = dynamic(() => import("remote2/DashboardApp"), {
  ssr: false,
});

export default function Home() {
  const sharedState = useGlobalContext();

  return (
    <div>
      <h1>Host</h1>
      <DashboardApp1 sharedState={sharedState} />
      <DashboardApp2 sharedState={sharedState} />
    </div>
  );
}
