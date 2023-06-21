import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { dummyData } from "../Data/dummyData";

import Layout from "@/Components/Common/Layout";
import ConsumptionSlider from "@/Components/Dashboard/ConsumptionSlider";
import DriversDemand from "@/Components/Dashboard/DriversDemand";
import RecentIssue from "@/Components/Dashboard/RecentIssue";
import ProductIssue from "@/Components/Dashboard/ProductIssue";

export default function Home() {
  const drivers = [
    {
      Name: "Ahmed Ali",
      Pno: "528601234",
      password: "Ahm@456Pass1",
    },
    {
      Name: "Muhammad Khan",
      Pno: "528609876",
      password: "Kh@n123Pass",
    },
    {
      Name: "Ali Hassan",
      Pno: "528604567",
      password: "Al!Hassan@1",
    },
    {
      Name: "Adnan Malik",
      Pno: "528603216",
      password: "M@likPass123",
    },
    {
      Name: "Hassan Ahmed",
      Pno: "528606543",
      password: "H!Ahmed987",
    },
    {
      Name: "Kamran Mahmood",
      Pno: "528607894",
      password: "K@mranM@hmood",
    },
    {
      Name: "Imran Khan",
      Pno: "528602345",
      password: "Imran#Khan1",
    },
    {
      Name: "Faisal Iqbal",
      Pno: "528608769",
      password: "Fais@lIqbal12",
    },
    {
      Name: "Usman Ali",
      Pno: "528603458",
      password: "U$manPass!1",
    },
    {
      Name: "Zain Ahmed",
      Pno: "528609871",
      password: "Z@inahmed567",
    },
    {
      Name: "Ameer Hamza",
      Pno: "528606549",
      password: "H@mz@P@ssw0rd",
    },
    {
      Name: "Ali Raza",
      Pno: "528602192",
      password: "Al!R@z@123",
    },
  ];

  // to add the date in firestore
  const AddData = () => {
    drivers.forEach(async (data) => {
      await setDoc(doc(db, "drivers", data.Pno), data);
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
      <button onClick={AddData}>CLick me</button>
      <div className="flex gap-6">
        {/* Tables */}
        <div className="flex flex-col gap-6">
          <DriversDemand />
          <RecentIssue />
        </div>

        {/* Form */}
        <div className="w-full pr-2">
          <ProductIssue />
        </div>
      </div>
    </Layout>
  );
}
