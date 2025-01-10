"use client";
import React from "react";
import { Button } from "../ui/button";
import DealsTable from "./DealsTable";
import ContactsTable from "./ContactsTable";

interface Props {
  selectedData: string[];
  onClose: () => void;
  origin: "deals" | "contacts";
}

const LinkingList: React.FC<Props> = ({ selectedData, onClose, origin }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md w-[50%]">
      <h2 className="text-lg font-semibold mb-4">Available {origin}</h2>
      {origin === "deals" && (
        <DealsTable selectedContacts={selectedData} onClose={onClose} />
      )}
      {origin === "contacts" && (
        <ContactsTable selectedDeals={selectedData} onClose={onClose} />
      )}
      <Button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </Button>
    </div>
  );
};

export default LinkingList;
