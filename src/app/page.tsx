"use client";
import Deals from "@/components/custom/Deals";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Contacts from "@/components/custom/Contact";
const IframePage = () => {
  const [tab, setTab] = useState("contact");

  const onContactClick = () => {
    setTab("contact");
  };

  const onDealsClick = () => {
    setTab("deals");
  };

  return (
    <div>
      <div className="flex justify-center gap-2">
        <Button
          onClick={onContactClick}
          className={`${
            tab === "contact"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Contact
        </Button>
        <Button
          onClick={onDealsClick}
          className={`${
            tab === "deals"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Deals
        </Button>
      </div>
      {tab === "contact" && <Contacts />}
      {tab === "deals" && <Deals />}
    </div>
  );
};
export default IframePage;
