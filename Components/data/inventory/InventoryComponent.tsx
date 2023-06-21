import React, { useEffect, useState } from "react";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { CheckIcon } from "@heroicons/react/outline";
import EditProductModal from "./EditProductModal";

const Inventory = () => {
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<any>(false);
  const [isDeleted, setIsDeleted] = useState<any>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsQuery = query(collection(db, "products"));
      const productsSnapshot = await getDocs(productsQuery);
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = products.filter(
        (product: any) =>
          product.Product_Name.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          product.Product_ID.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);
  const handleRemoveProduct = async (productId: any) => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "products", productId));
      fetchProducts();
      setIsDeleted(true);
    } catch (error) {
      console.error("Error removing product: ", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-3xl font-bold text-blue-600 mt-5 mb-4">Inventory</h1>
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
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
                Available Stock
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Minimum Threshold
              </th>
              <th className="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product: any, index: any) => (
              <tr
                key={product.id}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {product.Product_Name}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {product.Product_ID}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {product.Quantity_Present}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {product.Minimum_Threshold}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      window.confirm(
                        `Are you sure to remove ${product.Product_Name} with ID: ${product.Product_ID}?`
                      ) && handleRemoveProduct(product.id)
                    }
                    className="text-red-500"
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
        <EditProductModal
          product={selectedProduct}
          onClose={handleModalClose}
          onProductUpdate={fetchProducts}
        />
      )}
      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center z-[10000]">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold">Removing Product...</h2>
          </div>
        </div>
      )}
      {isDeleted && (
        <div className="fixed inset-0 flex items-center justify-center z-[10000]">
          <div className="bg-white p-4 rounded-md flex items-center">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-xl font-bold">Product Removed Successfully</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
