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

interface Contact {
  id: string;
  stage: string;
  properties: any;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/contacts/")
      .then((response) => setContacts(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.properties.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);
  console.log(filteredContacts);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()} ${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="flex flex-col w-[70%] mt-8 p-2">
        <h1 className="text-2xl font-semibold text-center mb-2">Contacts</h1>

        {isLoading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-[50%] mx-8"></Skeleton>
            <Skeleton className="h-96"></Skeleton>
          </div>
        )}
        {!isLoading && (
          <>
            <input
              className="w-[50%] mx-8 bg-neutral-100 border-2 rounded-md border-neutral-200 p-1 "
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Create Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.properties.firstname}</TableCell>
                    <TableCell>{contact.properties.email}</TableCell>
                    <TableCell>
                      {formatDate(contact.properties.createdate)}
                    </TableCell>
                    <TableCell>
                      <a
                        className="border-[1px] border-neutral-200 p-1 hover:bg-neutral-400"
                        target="_blank"
                        href={`https://app.hubspot.com/contacts/48460805/record/0-1/${contact.id}`}
                      >
                        View Contact
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

export default Contacts;
