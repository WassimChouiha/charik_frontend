import api from "@/lib/api";
import { useState } from "react";

interface Params {
  selectedData: string[];
  onClose: () => void;
  linkingOrigin: "contacts" | "deals";
}

export const useLink = ({ selectedData, onClose, linkingOrigin }: Params) => {
  const [linking, setLinking] = useState(false);

  const handleLink = (toId: string) => {
    if (selectedData.length === 0) {
      alert("No contacts selected");
      return;
    }

    setLinking(true);
    const linkData = selectedData.map((fromId) => ({
      from_id: fromId,
      to_id: toId,
    }));

    api
      .post(
        `/link-objects/${
          linkingOrigin === "contacts" ? "contacts/deals/" : "deals/contacts/"
        }`,
        linkData
      )
      .then(() => {
        alert("successfully linked!");
        onClose();
      })
      .catch((error) => {
        console.error("Error linking:", error);
        alert("Failed to link .");
      })
      .finally(() => setLinking(false));
  };

  return { handleLink, linking };
};
