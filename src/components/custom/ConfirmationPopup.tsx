import React from "react";
import { Button } from "../ui/button";

interface ConfirmationPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[30%]">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
