import { Deal } from "@/types/Deal";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/deals/")
      .then((response) => setDeals(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    deals,
    isLoading,
  };
};
