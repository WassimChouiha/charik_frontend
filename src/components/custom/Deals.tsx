"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface Deal {
  id: string;
  stage: string;
  closeDate: string;
  properties: any;
}

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/deals/")
      .then((response) => setDeals(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) =>
      deal.properties.dealname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [deals, searchTerm]);
  console.log(filteredDeals);

  return (
    <div className="flex flex-col">
      <h1>Deals</h1>
      <input
        type="text"
        placeholder="Search deals"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8"></Skeleton>
          <Skeleton className="h-28"></Skeleton>
        </div>
      )}
      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Stage</th>
              <th>Close Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.properties.dealname}</td>
                <td>{deal.stage}</td>
                <td>{deal.closeDate}</td>
                <td>
                  <a href={`https://app.hubspot.com/deals/${deal.id}`}>
                    View Deal
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Deals;
