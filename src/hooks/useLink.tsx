import api from "@/lib/api";
import { useState } from "react";
import { useToast } from "./use-toast";

interface Params {
  selectedData: string[];
  onClose: () => void;
  linkingOrigin: "contacts" | "deals";
}

export const useLink = ({ selectedData, onClose, linkingOrigin }: Params) => {
  const [linking, setLinking] = useState(false);
  const { toast } = useToast();
  const handleLink = (toId: string) => {
    if (selectedData.length === 0) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "No contacts selected.",
      });
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
        toast({
          title: "Success",
          description: "successfully linked!",
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error linking:", error);
        toast({
          title: "Failed",
          description: "unable to linked!",
          variant: "destructive",
        });
      })
      .finally(() => setLinking(false));
  };

  return { handleLink, linking };
};
