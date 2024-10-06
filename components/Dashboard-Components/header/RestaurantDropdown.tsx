import React, { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { createClient } from "@/libs/supabase/client";
import { useRouter, useParams } from "next/navigation";

interface Restaurant {
  id: number;
  name: string;
}

interface RestaurantDropdownProps {
  onSelectRestaurant: (restaurant: string) => void;
}

const RestaurantDropdown: React.FC<RestaurantDropdownProps> = ({
  onSelectRestaurant,
}) => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const currentRestaurantId = params.restaurantid as string;

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Error fetching restaurants:", error);
      } else {
        setRestaurants(data || []);

        // Set the selected restaurant based on the current URL
        const currentRestaurant = data?.find(
          (r) => r.id.toString() === currentRestaurantId
        );
        if (currentRestaurant) {
          setSelectedRestaurant(currentRestaurant);
          onSelectRestaurant(currentRestaurant.name);
        }
      }
    };

    fetchRestaurants();
  }, [currentRestaurantId]);

  const handleSelectRestaurant = (
    restaurant: Restaurant,
    close: () => void
  ) => {
    if (restaurant.id.toString() !== currentRestaurantId) {
      setSelectedRestaurant(restaurant);
      onSelectRestaurant(restaurant.name);
      router.push(`/dashboard/${restaurant.id}`);
    }
    close();
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
            <span>
              {selectedRestaurant
                ? selectedRestaurant.name
                : "Select Restaurant"}
            </span>
            <FaChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                open ? "transform rotate-180" : ""
              }`}
            />
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute left-0 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {restaurants.map((restaurant) => (
                  <button
                    key={restaurant.id}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleSelectRestaurant(restaurant, close)}
                  >
                    {restaurant.name}
                  </button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RestaurantDropdown;
