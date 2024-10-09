"use client";
import { ReactNode, useState, useEffect } from "react";
import Header from "@/components/Dashboard-Components/header/Header";
import LowerNavBar from "@/components/Dashboard-Components/Footer";
import React from "react";
import { useParams } from "next/navigation";

export default function LayoutPrivate({ children }: { children: ReactNode }) {
  const params = useParams();
  const restaurantId = params.restaurantid as string;
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const [clonedChildren, setClonedChildren] = useState<ReactNode>(children);

  useEffect(() => {
    setClonedChildren(
      React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          selectedRestaurant,
        })
      )
    );
  }, [children, selectedRestaurant]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSelectRestaurant={setSelectedRestaurant} />
      <main className="flex-grow p-4 pb-16 mt-14">{clonedChildren}</main>
      <LowerNavBar restaurantId={restaurantId} />
    </div>
  );
}