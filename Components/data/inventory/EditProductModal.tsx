import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { CheckIcon } from "@heroicons/react/outline";

interface EditProductModalProps {
  product: any;
  onClose: () => void;
  onProductUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  onProductUpdate,
}) => {
  const [name, setName] = useState(product.Product_Name);
  const [id, setId] = useState(product.Product_ID);
  const [quantity, setQuantity] = useState(product.Quantity_Present);
  const [threshold, setThreshold] = useState(product.Minimum_Threshold);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        Product_Name: name,
        Product_ID: id,
        Quantity_Present: quantity,
        Minimum_Threshold: threshold,
      });
      onProductUpdate();
      setIsSaved(true);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black flex items-center justify-center z-[10000]">
      <div className="bg-white w-[400px] p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Available Stock</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Minimum Threshold</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mr-2"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
        {isSaved && (
          <div className="mt-4 flex items-center">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-500">Product Updated Successfully</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductModal;
