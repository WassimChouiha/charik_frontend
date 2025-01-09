import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";

interface Deal {
  id: string;
  name: string;
  properties: any;
}

interface PopupProps {
  onClose: () => void;
  selectedContacts: string[];
}

const Popup: React.FC<PopupProps> = ({ onClose, selectedContacts }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/deals/")
      .then((response) => setDeals(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLinkContactsToDeal = (dealId: string) => {
    if (selectedContacts.length === 0) {
      alert("No contacts selected");
      return;
    }

    setLinking(true);
    const linkData = selectedContacts.map((contactId) => ({
      from_id: contactId,
      to_id: dealId,
    }));

    console.log("Linking data:", linkData); 

   
    axios
      .post("http://127.0.0.1:8000/api/link-objects/contacts/deals/", linkData)
      .then(() => {
        alert("Contacts successfully linked to the deal!");
        onClose();
      })
      .catch((error) => {
        console.error("Error linking contacts:", error);
        alert("Failed to link contacts to the deal.");
      })
      .finally(() => setLinking(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[50%]">
        <h2 className="text-lg font-semibold mb-4">Available Deals</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {deals.map((deal) => (
              <li
                key={deal.id}
                className="border-b py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleLinkContactsToDeal(deal.id)}
              >
                {deal.properties.dealname}
              </li>
            ))}
          </ul>
        )}
        <Button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Popup;
