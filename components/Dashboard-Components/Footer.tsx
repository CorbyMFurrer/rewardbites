import React, { useEffect, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/libs/supabase/client";

interface LowerNavBarProps {
  restaurantId?: string;
}

const LowerNavBar: React.FC<LowerNavBarProps> = ({ restaurantId }) => {
  const pathname = usePathname();
  const [defaultRestaurantId, setDefaultRestaurantId] = useState<string | null>(
    null
  );
  const supabase = createClient();

  useEffect(() => {
    const fetchDefaultRestaurantId = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id")
        .eq("name", "Black Sheep")
        .single();

      if (error) {
        console.error("Error fetching default restaurant ID:", error);
      } else if (data) {
        setDefaultRestaurantId(data.id.toString());
      }
    };

    fetchDefaultRestaurantId();
  }, []);

  const currentRestaurantId = restaurantId || defaultRestaurantId || "";

  if (!currentRestaurantId) {
    return null; // or a loading spinner
  }

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <ul className="flex justify-around py-2">
        <li>
          <Link
            href={`/dashboard/${currentRestaurantId}`}
            className={`flex flex-col items-center ${
              pathname === `/dashboard/${currentRestaurantId}`
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          >
            <FaHome size={24} />
            <span className="text-sm">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/dashboard/${currentRestaurantId}/profile`}
            className={`flex flex-col items-center ${
              pathname === `/dashboard/${currentRestaurantId}/profile`
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          >
            <FaUser size={24} />
            <span className="text-sm">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LowerNavBar;
