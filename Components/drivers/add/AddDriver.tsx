import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import ConfrimAddDriverModal from "./ConfrimAddDriverModal";
import { CheckCircleIcon } from "@heroicons/react/outline";

interface AddDriverFormValues {
  name: string;
  pno: string;
  password: string;
}

const AddDriver: React.FC = () => {
  const initialValues: AddDriverFormValues = {
    name: "",
    pno: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    pno: Yup.string().required("Driver Pno is required"),
    password: Yup.string().required("Password is required"),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingDriver, setIsAddingDriver] = useState(false);
  const [driverInfo, setDriverInfo] = useState<AddDriverFormValues>({
    name: "",
    pno: "",
    password: "",
  });
  const [isDriverAdded, setIsDriverAdded] = useState(false);

  const handleFormSubmit = (values: AddDriverFormValues) => {
    setDriverInfo(values);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    setIsAddingDriver(true);

    try {
      const driversCollection = collection(db, "drivers");
      await addDoc(driversCollection, {
        Name: driverInfo.name,
        Pno: driverInfo.pno,
        password: driverInfo.password,
      });

      setIsAddingDriver(false);
      setIsDriverAdded(true);
      setDriverInfo(initialValues);
    } catch (error) {
      console.error("Error adding driver: ", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDriverInfo(initialValues);
  };

  const handleModalClose = () => {
    setIsDriverAdded(false);
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">Add Driver</h1>
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
            <label htmlFor="pno" className="block mb-1 font-medium">
              Driver Pno
            </label>
            <Field
              type="text"
              id="pno"
              name="pno"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="pno" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mr-2"
            >
              Add Driver
            </button>
          </div>
        </Form>
      </Formik>
      {isModalOpen && (
        <ConfrimAddDriverModal
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          driverInfo={driverInfo}
        />
      )}
      {isAddingDriver && (
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
            <p className="text-gray-700">Adding driver...</p>
          </div>
        </div>
      )}
      {isDriverAdded && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black flex items-center justify-center z-[10000]">
          <div className="bg-white w-[400px] p-4 rounded-md text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">Driver added successfully</p>
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

export default AddDriver;
