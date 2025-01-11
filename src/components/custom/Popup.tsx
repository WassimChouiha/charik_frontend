import React from "react";
import LinkingList from "./LinkingList";

interface PopupProps {
  onClose: () => void;
  selectedContacts: string[];
  origin: "deals" | "contacts";
}

const LinkingPopup: React.FC<PopupProps> = ({
  onClose,
  selectedContacts,
  origin,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <LinkingList
        origin={origin}
        selectedData={selectedContacts}
        onClose={onClose}
      />
    </div>
  );
};

export default LinkingPopup;
