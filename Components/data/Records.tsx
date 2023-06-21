import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

const Records = () => {
  const [issueRecords, setIssueRecords] = useState<any>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsQuery = query(
          collection(db, "issues"),
          orderBy("Time", "desc")
        );
        const recordsSnapshot = await getDocs(recordsQuery);
        const recordsData = recordsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIssueRecords(recordsData);
      } catch (error) {
        console.error("Error fetching records: ", error);
      }
    };

    fetchRecords();
    console.log(issueRecords);
  }, []);

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">Records</h1>
      <div className="bg-white shadow min-h-[10vh] overflow-y-scroll overflow-hidden rounded-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="sticky top-0 z-10 bg-gray-200">
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sno
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QTY
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {issueRecords.map((record: any, index: any) => (
              <tr
                key={record.id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {record.Product_Name}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {record.Product_ID}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {record.Qty}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {record.Date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
