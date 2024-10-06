"use client";
import React from "react";
import Rewards from "@/components/Dashboard-Components/add-money/Rewards";
import Balance from "@/components/Dashboard-Components/add-money/Balance";

export default function ViewRewards() {
  return (
    <section className="max-w-xl mx-auto space-y-6">
      <Rewards />
      <Balance />
    </section>
  );
}
