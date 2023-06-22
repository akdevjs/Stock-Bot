import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ExclamationIcon } from "@heroicons/react/outline";

interface PredictionComponentFormValues {
  productId: string;
  day: string;
  month: string;
  year: string;
}

const PredictionComponent: React.FC = () => {
  const initialValues: PredictionComponentFormValues = {
    productId: "",
    day: "",
    month: "",
    year: "",
  };

  const validationSchema = Yup.object({
    productId: Yup.string().required("Product ID is required"),
    day: Yup.string()
      .required("Day is required")
      .matches(/^[1-9]|[12][0-9]|3[01]$/, "Invalid day"),
    month: Yup.string()
      .required("Month is required")
      .matches(/^(0?[1-9]|1[0-2])$/, "Invalid month"),
    year: Yup.string()
      .required("Year is required")
      .matches(/^(19|20)\d{2}$/, "Invalid year"),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>();
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(0);
  const [date, setDate] = useState("");

  const handleFormSubmit = async (values: PredictionComponentFormValues) => {
    setIsModalOpen(true);
    setIsLoading(true);
    setError("");
    const docRef = doc(db, "products", values.productId.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProduct(docSnap.data());
      const date = `${values.day}/${values.month}/${values.year}`;
      setDate(date);
      const requestBody = {
        date,
        product_id: parseInt(values.productId),
      };
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/predict_needed_quantity",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        console.log("Prediction data:", data);
        setPrediction(data.prediction);
        setIsLoading(false);
      } catch (error) {
        console.error("Prediction error:", error);
        setError("Failed to fetch prediction data");
        setIsLoading(false);
      }
    } else {
      setError("No product found with the specified ID.");
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProduct({});
    setError("");
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">
        PredictionComponent
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className="bg-white shadow min-h-[10vh] p-6 rounded-md">
          <div className="mb-4">
            <label htmlFor="productId" className="block mb-1 font-medium">
              Product ID
            </label>
            <Field
              type="text"
              id="productId"
              name="productId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="productId"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
              <label htmlFor="day" className="block mb-1 font-medium">
                Day
              </label>
              <Field
                type="text"
                id="day"
                name="day"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="day"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="month" className="block mb-1 font-medium">
                Month
              </label>
              <Field
                type="text"
                id="month"
                name="month"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="month"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="block mb-1 font-medium">
                Year
              </label>
              <Field
                type="text"
                id="year"
                name="year"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="year"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mr-2"
            >
              Predict
            </button>
          </div>
        </Form>
      </Formik>
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black flex items-center justify-center z-[10000]">
          <div className="bg-white w-[400px] p-4 rounded-md">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 1.647A7.962 7.962 0 0120 12h-4a7.96 7.96 0 00-2 5.291l3 2.647zM20 12a8 8 0 00-2-5.291l-3 2.646A7.962 7.962 0 0016 12h4zM9 7H6v3H4V7H1V5h3V2h2v3h3v2z"
                  ></path>
                </svg>
                <p className="text-gray-700">Predicting values...</p>
              </div>
            ) : (
              <>
                {error ? (
                  <div className="flex items-center space-x-2">
                    <ExclamationIcon className="h-5 w-5 text-red-500" />
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : (
                  <>
                    {prediction ? (
                      <div>
                        <p className="text-lg font-bold mb-2">
                          Product Details:
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Name: </span>
                          {product.Product_Name}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Product ID: </span>
                          {product.Product_ID}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Quantity Present:</span>
                          {product.Quantity_Present}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">
                            Minimum Threshold:
                          </span>
                          {product.Minimum_Threshold}
                        </p>
                        <p className="text-lg font-bold  mt-4">
                          Predicted Quantity till {date}:
                        </p>
                        <p className="text-3xl text-blue-600 font-bold">
                          {prediction}
                        </p>
                      </div>
                    ) : (
                      <p>No product found with the provided ID.</p>
                    )}
                  </>
                )}
              </>
            )}
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mx-auto mt-4"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionComponent;
