import Layout from "@/Components/Common/Layout";
import ConsumptionSlider from "@/Components/Dashboard/ConsumptionSlider";
import Records from "@/Components/data/Records";
import Inventory from "@/Components/data/inventory/InventoryComponent";
export default function RecordsPage() {
  return (
    <Layout
      title="StockBot - Homepage"
      description="THis si Home page description"
    >
      <ConsumptionSlider />
      {/* Total below Wrapper */}

      <div className=" gap-6">
        <Inventory />
      </div>
    </Layout>
  );
}
