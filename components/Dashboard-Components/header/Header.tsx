"use client";
import React from "react";
import RestaurantDropdown from "./RestaurantDropdown";

interface HeaderProps {
  onSelectRestaurant: (restaurant: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectRestaurant }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20">
      <div className="container mx-auto px-4 py-3">
        <RestaurantDropdown onSelectRestaurant={onSelectRestaurant} />
      </div>
    </header>
  );
};

export default Header;
