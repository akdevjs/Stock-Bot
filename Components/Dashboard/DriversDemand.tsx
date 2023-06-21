import React from "react";
import { ChatIcon, XIcon } from "@heroicons/react/outline";

const DriversDemand = () => {
  const dummyData = [
    {
      DriverName: "John Doe",
      DriverPno: "52860",
      ProductID: 1001,
      ProductName: "Engine Oil",
      Qty: 5,
      Date: "20-06-2023",
      Time: "09:00 AM",
    },
    {
      DriverName: "Jane Smith",
      DriverPno: "43290",
      ProductID: 1002,
      ProductName: "Brake Pads",
      Qty: 3,
      Date: "20-06-2023",
      Time: "10:30 AM",
    },
    {
      DriverName: "David Johnson",
      DriverPno: "63584",
      ProductID: 1003,
      ProductName: "Air Filter",
      Qty: 2,
      Date: "20-06-2023",
      Time: "11:15 AM",
    },
    {
      DriverName: "Emily Wilson",
      DriverPno: "73190",
      ProductID: 1004,
      ProductName: "Spark Plugs",
      Qty: 4,
      Date: "20-06-2023",
      Time: "12:45 PM",
    },
    {
      DriverName: "Michael Brown",
      DriverPno: "85672",
      ProductID: 1005,
      ProductName: "Tire Pressure Gauge",
      Qty: 1,
      Date: "20-06-2023",
      Time: "02:30 PM",
    },
    {
      DriverName: "Olivia Davis",
      DriverPno: "97486",
      ProductID: 1006,
      ProductName: "Car Battery",
      Qty: 2,
      Date: "20-06-2023",
      Time: "03:45 PM",
    },
    {
      DriverName: "William Taylor",
      DriverPno: "10257",
      ProductID: 1007,
      ProductName: "Windshield Wipers",
      Qty: 3,
      Date: "20-06-2023",
      Time: "04:30 PM",
    },
    {
      DriverName: "Sophia Miller",
      DriverPno: "11639",
      ProductID: 1008,
      ProductName: "Antifreeze",
      Qty: 2,
      Date: "20-06-2023",
      Time: "05:15 PM",
    },
  ];

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">
        Drivers Demand
      </h1>
      <div className="bg-white shadow max-h-[170px] overflow-y-scroll overflow-hidden rounded-md">
        <table className="min-w-full   divide-y  divide-gray-200">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData.map((demand, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.DriverName}
                </td>
                <td className="px-6 py-1 py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.DriverPno}
                </td>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.ProductID}
                </td>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.ProductName}
                </td>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.Qty}
                </td>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.Date}
                </td>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  {demand.Time}
                </td>
                <td className="px-6  py-1 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 mr-2">
                    <ChatIcon className="h-5 w-5" />
                  </button>
                  <button className="text-red-600">
                    <XIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriversDemand;
