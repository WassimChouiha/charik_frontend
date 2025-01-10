import { Deal } from "@/types/Deal";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetContacts = () => {
  const [contacts, setContacts] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/contacts/")
      .then((response) => setContacts(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    contacts,
    isLoading,
  };
};
