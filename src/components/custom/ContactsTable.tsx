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
    return <p>...Loading</p>;
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
              {contact.properties.firstname}
              {contact.properties.lastname}
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
