import Layout from "@/Components/Common/Layout";
import ConsumptionSlider from "@/Components/Dashboard/ConsumptionSlider";
import AddProduct from "@/Components/data/add/AddProduct";
export default function RecordsPage() {
  return (
    <Layout
      title="StockBot - Homepage"
      description="THis si Home page description"
    >
      <ConsumptionSlider />
      {/* Total below Wrapper */}

      <div className=" gap-6">
        <AddProduct />
      </div>
    </Layout>
  );
}
