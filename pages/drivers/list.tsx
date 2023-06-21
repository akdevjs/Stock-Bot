import Layout from "@/Components/Common/Layout";
import ConsumptionSlider from "@/Components/Dashboard/ConsumptionSlider";
import AllDriver from "@/Components/drivers/list/AllDriver";

export default function Home() {
  return (
    <Layout
      title="StockBot - Homepage"
      description="THis si Home page description"
    >
      <ConsumptionSlider />
      {/* Total below Wrapper */}

      <div className="flex gap-6">
        <AllDriver />
      </div>
    </Layout>
  );
}
