"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
      contact.properties.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);
  console.log(filteredContacts);

  return (
    <div className="flex flex-col">
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Search contacts"
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
              <th>Contact Name</th>
              <th>Stage</th>
              <th>Close Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.properties.firstname}</td>
                {/* <td>{deal.stage}</td>
                <td>{deal.closeDate}</td> */}
                <td>
                  <a href={`https://app.hubspot.com/contacts/${contact.id}`}>
                    View 
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

export default Contacts;
