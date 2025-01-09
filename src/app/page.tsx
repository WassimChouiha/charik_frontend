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
      <div className="flex justify-center gap-2 mt-8">
        <Button
          onClick={onContactClick}
          className={`${
            tab === "contact"
              ? " "
              : "bg-white text-black hover:bg-neutral-300"
          }`}
        >
          Contact
        </Button>
        <Button
          onClick={onDealsClick}
          className={`${
            tab === "deals"
              ? ""
              : "bg-white text-black hover:bg-neutral-300"
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
