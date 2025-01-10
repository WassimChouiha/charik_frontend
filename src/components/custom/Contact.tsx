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
import LinkingPopup from "./Popup";

interface Contact {
  id: string;
  stage: string;
  properties: any;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set()
  );
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/contacts/")
      .then((response) => setContacts(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const firstName = contact.properties.firstname.toLowerCase();
      const lastName = contact.properties.lastname.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return firstName.includes(searchLower) || lastName.includes(searchLower);
    });
  }, [contacts, searchTerm]);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()} ${hours}:${minutes}`;
  };

  const toggleContactSelection = (id: string) => {
    setSelectedContacts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const isButtonDisabled = selectedContacts.size === 0;

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
            <div className="flex justify-between mb-4">
              <input
                className="w-[50%] mx-8 bg-neutral-100 border-2 rounded-md border-neutral-200 p-1"
                type="text"
                placeholder="Search contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                onClick={() => setIsPopupVisible(true)}
                disabled={isButtonDisabled}
              >
                Link Contact to Deal
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Create Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className={
                      selectedContacts.has(contact.id) ? "bg-neutral-200" : ""
                    }
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedContacts.has(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {contact.properties.firstname}
                      {contact.properties.lastname}
                    </TableCell>
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

      {isPopupVisible && (
        <LinkingPopup
          origin="deals"
          onClose={() => setIsPopupVisible(false)}
          selectedContacts={Array.from(selectedContacts)}
        />
      )}
    </div>
  );
};

export default Contacts;
