import React from "react";

interface ConfrimAddDriverModalProps {
  onClose: () => void;
  onConfirm: () => void;
  driverInfo: {
    name: string;
    pno: string;
    password: string;
  };
}

const ConfrimAddDriverModal: React.FC<ConfrimAddDriverModalProps> = ({
  onClose,
  onConfirm,
  driverInfo,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur-md bg-blur-sm bg-black flex items-center justify-center z-[10000]">
      <div className="bg-white w-[400px] p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Confirm Driver Details</h2>
        <p>
          <strong>Name:</strong> {driverInfo.name}
        </p>
        <p>
          <strong>Driver Pno:</strong> {driverInfo.pno}
        </p>
        <p>
          <strong>Password:</strong> {driverInfo.password}
        </p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md mr-2"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfrimAddDriverModal;
