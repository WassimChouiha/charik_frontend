"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

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
    <div className="flex flex-col items-center">
          <Card className="flex flex-col w-[70%] mt-8 p-2">
      <h1 className="text-2xl font-semibold text-center mb-2">Deals</h1>
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
        <>
        
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal Name</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>{deal.properties.dealname}</TableCell>
                    <TableCell>{deal.properties.dealstage}</TableCell>
                    <TableCell>{deal.properties.closedate}</TableCell>
                    <TableCell>{deal.properties.amount}</TableCell>
                    <TableCell>
                      <a href={`https://app.hubspot.com/deals/${deal.id}`}>
                        View Deal
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          
        </>
      )}
      </Card>
    </div>
  );
};

export default Deals;
