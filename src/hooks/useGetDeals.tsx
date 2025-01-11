import api from "@/lib/api";
import { Deal } from "@/types/Deal";
import { useEffect, useState } from "react";

export const useGetDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/deals/")
      .then((response) => setDeals(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    deals,
    isLoading,
  };
};
