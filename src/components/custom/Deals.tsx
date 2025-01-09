"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

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
  const [selectedDeals, setSelectedDeals] = useState<Set<string>>(new Set());

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

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()} ${hours}:${minutes}`;
  };
  const toggleDealSelection = (id: string) => {
    setSelectedDeals((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };
  const isButtonDisabled = selectedDeals.size === 0;

  return (
    <div className="flex flex-col items-center">
      <Card className="flex flex-col w-[70%] mt-8 p-2">
        <h1 className="text-2xl font-semibold text-center mb-2">Deals</h1>
        {isLoading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-[50%] mx-8"></Skeleton>
            <Skeleton className="h-96"></Skeleton>
          </div>
        )}
        {!isLoading && (
          <>
            <div className="flex justify-between mb-4">
              <input
                className="w-[50%] mx-8 bg-neutral-100 border-2 rounded-md border-neutral-200 p-1 "
                type="text"
                placeholder="Search deals"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                onClick={() => console.log(Array.from(selectedDeals))}
                disabled={isButtonDisabled}
              >
                Link Deal to contact
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Deal Name</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.map((deal) => (
                  <TableRow
                    key={deal.id}
                    className={
                      selectedDeals.has(deal.id) ? "bg-neutral-200" : ""
                    }
                  >
                    <TableCell>
                      {" "}
                      <input
                        type="checkbox"
                        checked={selectedDeals.has(deal.id)}
                        onChange={() => toggleDealSelection(deal.id)}
                      />
                    </TableCell>
                    <TableCell>{deal.properties.dealname}</TableCell>
                    <TableCell>{deal.properties.dealstage}</TableCell>
                    <TableCell>
                      {formatDate(deal.properties.closedate)}
                    </TableCell>
                    <TableCell>{deal.properties.amount}</TableCell>
                    <TableCell>
                      <a
                        className="border-[1px] border-neutral-200 p-1 hover:bg-neutral-400"
                        target="_blank"
                        href={`https://app.hubspot.com/contacts/48460805/record/0-3/${deal.id}`}
                      >
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
