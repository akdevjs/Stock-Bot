import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import DriverEditModal from "./DriverEditModal";

const AllDriver = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const fetchDrivers = async () => {
    const driversCollection = collection(db, "drivers");
    const driversSnapshot = await getDocs(driversCollection);
    const driversData = driversSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDrivers(driversData);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleEditDriver = (driver: any) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleRemoveDriver = async (driverId: string) => {
    try {
      await deleteDoc(doc(db, "drivers", driverId));
      fetchDrivers();
    } catch (error) {
      console.error("Error removing driver: ", error);
    }
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">
        All Drivers
      </h1>
      <div className="bg-white shadow min-h-[10vh] overflow-y-scroll overflow-hidden rounded-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="sticky top-0 z-10 bg-gray-200">
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sno
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver Name
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver Pno
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver Password
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map((driver, index) => (
              <tr
                key={driver.id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {driver.Name}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {driver.Pno}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {driver.password}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEditDriver(driver)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemoveDriver(driver.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <DriverEditModal
          driver={selectedDriver}
          onClose={() => setIsModalOpen(false)}
          onDriverUpdate={fetchDrivers}
        />
      )}
    </div>
  );
};

export default AllDriver;
