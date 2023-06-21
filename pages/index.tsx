import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { dummyData } from "../Data/dummyData";

import Layout from "@/components/Common/Layout";
import ConsumptionSlider from "@/components/Dashboard/ConsumptionSlider";
import DriversDemand from "@/components/Dashboard/DriversDemand";
import RecentIssue from "@/components/Dashboard/RecentIssue";
import ProductIssue from "@/components/Dashboard/ProductIssue";

export default function Home() {
  // to add the date in firestore
  const AddData = () => {
    dummyData.forEach(async (data) => {
      await setDoc(doc(db, "products", data.Product_ID.toString()), data);
      console.log(data);
    });
  };

  return (
    <Layout
      title="StockBot - Homepage"
      description="THis si Home page description"
    >
      <ConsumptionSlider />
      {/* Total below Wrapper */}
      <div className="flex gap-6">
        {/* Tables */}
        <div className="flex flex-col gap-6">
          <DriversDemand />
          <RecentIssue />
        </div>

        {/* Form */}
        <div>
          <ProductIssue />
        </div>
      </div>
    </Layout>
  );
}
