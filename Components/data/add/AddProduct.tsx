import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import ConfrimAddProductModal from "./ConfrimAddProductModal";
import { CheckCircleIcon } from "@heroicons/react/outline";

interface AddProductFormValues {
  name: string;
  id: string;
  quantity: string;
  threshold: string;
}

const AddProduct: React.FC = () => {
  const initialValues: AddProductFormValues = {
    name: "",
    id: "",
    quantity: "",
    threshold: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    id: Yup.string().required("Product ID is required"),
    quantity: Yup.string().required("Quantity is required"),
    threshold: Yup.string().required("Minimum Threshold is required"),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productInfo, setProductInfo] = useState<AddProductFormValues>({
    name: "",
    id: "",
    quantity: "",
    threshold: "",
  });
  const [isProductAdded, setIsProductAdded] = useState(false);

  const handleFormSubmit = (values: AddProductFormValues) => {
    setProductInfo(values);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    setIsAddingProduct(true);

    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        Product_Name: productInfo.name,
        Product_ID: productInfo.id,
        Quantity_Present: productInfo.quantity,
        Minimum_Threshold: productInfo.threshold,
      });

      setIsAddingProduct(false);
      setIsProductAdded(true);
      setProductInfo(initialValues);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductInfo(initialValues);
  };

  const handleModalClose = () => {
    setIsProductAdded(false);
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">
        Add Product
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className="bg-white shadow min-h-[10vh] p-6 rounded-md">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block mb-1 font-medium">
              Product ID
            </label>
            <Field
              type="text"
              id="id"
              name="id"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="id" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Quantity
            </label>
            <Field
              type="text"
              id="quantity"
              name="quantity"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="quantity"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="threshold" className="block mb-1 font-medium">
              Minimum Threshold
            </label>
            <Field
              type="text"
              id="threshold"
              name="threshold"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="threshold"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mr-2"
            >
              Add Product
            </button>
          </div>
        </Form>
      </Formik>
      {isModalOpen && (
        <ConfrimAddProductModal
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          productInfo={productInfo}
        />
      )}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black flex items-center justify-center z-[10000]">
          <div className="bg-white w-[400px] p-4 rounded-md flex items-center">
            <svg
              className="animate-spin h-5 w-5 text-blue-500 mr-4"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 1.647A7.962 7.962 0 0020 12h-4a7.96 7.96 0 01-2 5.291l3 2.647zM20 12a8 8 0 00-2-5.291l-3 2.646A7.962 7.962 0 0016 12h4zM9 7H6v3H4V7H1V5h3V2h2v3h3v2z"
              ></path>
            </svg>
            <p className="text-gray-700">Adding product...</p>
          </div>
        </div>
      )}
      {isProductAdded && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black flex items-center justify-center z-[10000]">
          <div className="bg-white w-[400px] p-4 rounded-md text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">Product added successfully</p>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mx-auto"
              onClick={handleModalClose}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
