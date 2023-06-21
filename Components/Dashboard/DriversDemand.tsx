import React, { useEffect, useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const DriversDemand = () => {
  const [demands, setDemands] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "demands"), (snapshot) => {
      const demandsData: any = [];
      snapshot.forEach((doc) => {
        if (doc.data().Status === "Pending") {
          demandsData.push({ id: doc.id, ...doc.data() });
        }
      });
      setDemands(demandsData);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (demandId: string, newStatus: string) => {
    const demandRef = doc(db, "demands", demandId);
    await updateDoc(demandRef, { Status: newStatus });
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">
        Drivers Demand
      </h1>
      <div className="bg-white shadow max-h-[150.5px] min-w-[60rem] overflow-y-scroll overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="sticky top-0 z-10 bg-gray-200">
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Driver Name
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Driver Pno
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product ID
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Qty
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          {demands.length === 0 ? (
            <tbody className="relative bg-white divide-y divide-gray-200 h-[120px] text-gray-500">
              <tr className="absolute left-[43%] top-[35%]">
                <td>No demands available</td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200 h-[120px] overflow-y-scroll">
              {demands.map((demand: any) => (
                <tr key={demand.id}>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.DriverName}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.DriverPno}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.ProductID}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.ProductName}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.Qty}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.Date}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {demand.Time}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleStatusUpdate(demand.id, "Available")}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() =>
                        handleStatusUpdate(demand.id, "Unavailable")
                      }
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DriversDemand;
