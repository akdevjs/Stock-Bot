import Layout from "@/Components/Common/Layout";
import ConsumptionSlider from "@/Components/Dashboard/ConsumptionSlider";
import AddDriver from "@/Components/drivers/add/AddDriver";

export default function Home() {
  return (
    <Layout
      title="StockBot - Homepage"
      description="THis si Home page description"
    >
      <ConsumptionSlider />
      {/* Total below Wrapper */}

      <div className="flex gap-6">
        <AddDriver />
      </div>
    </Layout>
  );
}
