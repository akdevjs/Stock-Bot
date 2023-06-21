import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

interface DriverEditModalProps {
  driver: any;
  onClose: () => void;
  onDriverUpdate: () => void;
}

const DriverEditModal: React.FC<DriverEditModalProps> = ({
  driver,
  onClose,
  onDriverUpdate,
}) => {
  const [name, setName] = useState(driver.Name);
  const [pno, setPno] = useState(driver.Pno);
  const [password, setPassword] = useState(driver.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSaveDisabled =
    !name || !pno || !password || password !== confirmPassword;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const driverRef = doc(db, "drivers", driver.id);
      await updateDoc(driverRef, {
        Name: name,
        Pno: pno,
        password: password,
      });
      onDriverUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating driver: ", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black    flex items-center justify-center z-[10000]">
      <div className="bg-white w-[400px] p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Driver {driver.Pno}</h2>
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
            <label className="block mb-1 font-medium">Pno</label>
            <input
              type="text"
              value={pno}
              onChange={(e) => setPno(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mr-2"
              onClick={handleSave}
              disabled={isSaveDisabled}
            >
              {isLoading ? "Loading..." : "Save"}
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
      </div>
    </div>
  );
};

export default DriverEditModal;
