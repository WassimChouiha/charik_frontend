import api from "@/lib/api";
import { Deal } from "@/types/Deal";
import { useEffect, useState } from "react";

export const useGetContacts = () => {
  const [contacts, setContacts] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/contacts/")
      .then((response) => setContacts(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    contacts,
    isLoading,
  };
};
