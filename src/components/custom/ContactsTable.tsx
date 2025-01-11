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
import { useLink } from "@/hooks/useLink";
import { useGetContacts } from "@/hooks/useGetContacts";
import { Skeleton } from "../ui/skeleton";

interface Props {
  selectedDeals: string[];
  onClose: () => void;
}

function ContactsTable({ selectedDeals, onClose }: Props) {
  const { contacts, isLoading } = useGetContacts();
  const { linking, handleLink } = useLink({
    selectedData: selectedDeals,
    onClose,
    linkingOrigin: "deals",
  });

  const showLoading = useMemo(() => {
    return isLoading || linking;
  }, [isLoading, linking]);

  if (showLoading) {
    return (
      <>
        <div className="flex flex-col my-2">
          <Skeleton className="h-[700px] w-full"></Skeleton>
        </div>
      </>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact Name</TableHead>
          <TableHead>Contact Email</TableHead>
          <TableHead>Create Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell
              className="border-b py-2 cursor-pointer hover:bg-gray-100"
              key={contact.id}
              onClick={() => handleLink(contact.id)}
            >
              {contact.properties.firstname} {contact.properties.lastname}
            </TableCell>
            <TableCell>{contact.properties.email}</TableCell>
            <TableCell>{formatDate(contact.properties.createdate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ContactsTable;
