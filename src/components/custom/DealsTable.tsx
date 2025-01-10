import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate } from "@/utils/utils";
import { useGetDeals } from "@/hooks/useGetDeals";
import { useLink } from "@/hooks/useLink";

interface Props {
  selectedContacts: string[];
  onClose: () => void;
}

function DealsTable({ selectedContacts, onClose }: Props) {
  const { deals, isLoading } = useGetDeals();
  const { linking, handleLink } = useLink({
    selectedData: selectedContacts,
    onClose,
    linkingOrigin: "contacts",
  });

  const showLoading = useMemo(() => {
    return isLoading || linking;
  }, [isLoading, linking]);

  if (showLoading) {
    return <p>...Loading</p>;
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deal name</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead>Close Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deals.map((deal) => (
          <TableRow key={deal.id}>
            <TableCell
              className="border-b py-2 cursor-pointer hover:bg-gray-100"
              key={deal.id}
              onClick={() => handleLink(deal.id)}
            >
              {deal.properties.dealname}
            </TableCell>
            <TableCell>{deal.properties.dealstage}</TableCell>
            <TableCell>{formatDate(deal.properties.createdate)}</TableCell>
            <TableCell>{formatDate(deal.properties.closedate)}</TableCell>
            <TableCell>{deal.properties.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DealsTable;
