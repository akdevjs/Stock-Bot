import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dynamic from "next/dynamic";
import { db } from "@/firebase";
import "react-multi-carousel/lib/styles.css";
import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";

// Dynamic import for SSR
const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: false,
});

interface AutomobileProduct {
  Product_ID: number;
  Product_Name: string;
  Minimum_Threshold: number;
  Quantity_Present: number;
}

const ConsumptionSlider = () => {
  const [products, setProducts] = useState<AutomobileProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(
      productsCollection,
      (snapshot: QuerySnapshot) => {
        const productsList: AutomobileProduct[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as AutomobileProduct;
          productsList.push(data);
        });

        // Sort products by their consumption percentage
        productsList.sort((a, b) => {
          const percentageA =
            ((a.Quantity_Present - a.Minimum_Threshold) / a.Quantity_Present) *
            100;
          const percentageB =
            ((b.Quantity_Present - b.Minimum_Threshold) / b.Quantity_Present) *
            100;
          return percentageA - percentageB;
        });

        setProducts(productsList);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const renderPlaceholder = () => (
    <div className="p-4">
      <div className="animate-pulse flex flex-col items-center bg-white p-4 shadow rounded-md">
        <div className="w-24 h-24 relative"></div>
        <Skeleton className="mt-4 w-full h-4" />
        <Skeleton className="mt-2 w-2/3 h-4" />
      </div>
    </div>
  );

  return (
    <div className="w-full px-4">
      <h1 className="text-3xl px-4 font-bold text-blue-600 mt-5 mb-4">
        Consumption Overview
      </h1>
      <Carousel responsive={responsive}>
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => renderPlaceholder())
          : products.map((product) => {
              const percentage =
                ((product.Quantity_Present - product.Minimum_Threshold) /
                  product.Quantity_Present) *
                100;
              const color = percentage <= 20 ? "red" : "rgba(62, 152, 199, 1)";
              return (
                <div key={product.Product_ID} className="p-4">
                  <div className="flex flex-col items-center bg-white p-4 shadow rounded-md">
                    <div className="w-24 h-24">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage.toFixed(0)}%`}
                        styles={buildStyles({
                          textSize: "16px",
                          pathColor: color,
                          textColor: color,
                        })}
                      />
                    </div>
                    <h2 className="mt-4 text-lg">{product.Product_Name}</h2>
                    <span className="mt-2 text-gray-500">
                      ID: {product.Product_ID}
                    </span>
                  </div>
                </div>
              );
            })}
      </Carousel>
    </div>
  );
};

export default ConsumptionSlider;
