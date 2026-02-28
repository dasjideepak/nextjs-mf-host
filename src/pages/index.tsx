import dynamic from "next/dynamic";

const DashboardApp1 = dynamic(() => import("remote1/DashboardApp"), {
  ssr: false,
});

const DashboardApp2 = dynamic(() => import("remote2/DashboardApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>Host</h1>
      <DashboardApp1 />
      <DashboardApp2 />
    </div>
  );
}
