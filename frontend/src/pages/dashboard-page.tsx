import BarChart from "../components/barChart/barChart";
import Layout from "../components/layout/layout";
import MapComponent from "../components/map/map";
import { rotasData as rotasData } from "../data/rotasData";
import { mockPieData as pieData } from "../data/mockData";
import PieChart from "../components/pieChart/pieChart";

export default function DashboardPage() {
  return (
    <>
      <Layout>
        <div className="w-full h-full flex flex-col items-center font-sans tracking-wide">
          <div className="w-full flex pt-16 justify-center">
            <h1 className="text-4xl font-semibold">
              Pontos de coletas próximo a você
            </h1>
          </div>
          <div className="w-[80%] flex justify-center py-10">
            <MapComponent />
          </div>
          <div className="w-[80%] h-[500px] flex justify-center py-10">
            <BarChart data={rotasData} />
          </div>
          <div className="w-[80%] h-[500px] flex justify-center py-10">
            <PieChart data={pieData} />
          </div>
        </div>
      </Layout>
    </>
  );
}
