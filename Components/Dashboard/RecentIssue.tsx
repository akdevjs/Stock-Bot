import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import Skeleton from "react-loading-skeleton";

const RecentIssue = () => {
  const [issueData, setIssueData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssueData = async () => {
      const issuesCollection = collection(db, "issues");
      const issuesQuery = query(issuesCollection, orderBy("Time", "desc"));
      const unsubscribe = onSnapshot(issuesQuery, (snapshot) => {
        const productsArray = snapshot.docs.map((doc) => ({
          Date: doc.data().Date,
          Product_Name: doc.data().Product_Name,
          Product_ID: doc.data().Product_ID,
          Qty: doc.data().Qty,
        }));
        setIssueData(productsArray);
        setIsLoading(false);
      });

      return () => unsubscribe();
    };

    fetchIssueData();
  }, []);

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">
        Recent Issue
      </h1>
      <div className="bg-white shadow max-h-[170px] overflow-y-scroll overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="sticky top-0 z-10 bg-gray-200">
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
                Product Name
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
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <Skeleton height={20} count={5} />
                </td>
              </tr>
            ) : (
              issueData.map((item: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {item.Date}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {item.Product_Name}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {item.Product_ID}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                    {item.Qty}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentIssue;
