"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface RewardItem {
  id: string;
  title: string;
  description: string;
  stars_required: number;
}

interface MemberTier {
  id: number;
  name: string;
  stars_threshold: number;
  benefits: string;
}

const Rewards: React.FC = () => {
  const params = useParams();
  const restaurantId = params.restaurantid as string;

  const [user, setUser] = useState<User | null>(null);
  const [starBalance, setStarBalance] = useState<number>(0);
  const [nearestRewards, setNearestRewards] = useState<RewardItem[]>([]);
  const [currentTier, setCurrentTier] = useState<MemberTier | null>(null);
  const [nextTier, setNextTier] = useState<MemberTier | null>(null);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user && restaurantId) {
        const { data: clientStars } = await supabase
          .from("client_restaurant_stars")
          .select("stars, tier_id")
          .eq("client_id", user.id)
          .eq("restaurant_id", restaurantId)
          .single();

        if (clientStars) {
          setStarBalance(clientStars.stars);

          // Fetch current tier information
          const { data: tierInfo } = await supabase
            .from("member_tiers")
            .select("*")
            .eq("id", clientStars.tier_id)
            .single();

          if (tierInfo) {
            setCurrentTier(tierInfo);

            // Fetch next tier information
            const { data: nextTierInfo } = await supabase
              .from("member_tiers")
              .select("*")
              .eq("restaurant_id", restaurantId)
              .gt("stars_threshold", tierInfo.stars_threshold)
              .order("stars_threshold", { ascending: true })
              .limit(1)
              .single();

            if (nextTierInfo) {
              setNextTier(nextTierInfo);
            }
          }
        }

        // Fetch restaurant name
        const { data: restaurantData } = await supabase
          .from("restaurants")
          .select("name")
          .eq("id", restaurantId)
          .single();
        if (restaurantData) {
          setRestaurantName(restaurantData.name);
        }
      }

      // Fetch nearest rewards
      if (restaurantId && user) {
        const { data: offerings } = await supabase
          .from("offerings")
          .select("id, title, description, stars_required")
          .eq("restaurant_id", restaurantId)
          .order("stars_required", { ascending: true });

        if (offerings) {
          const nearestOffers = offerings
            .filter((offer) => offer.stars_required > starBalance)
            .slice(0, 3);
          setNearestRewards(nearestOffers);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [restaurantId]);

  const starsToNextTier = nextTier ? nextTier.stars_threshold - starBalance : 0;

  const getTierEmoji = (tierName: string) => {
    switch (tierName?.toLowerCase()) {
      case "bronze":
        return "🥉";
      case "silver":
        return "🥈";
      case "gold":
        return "🥇";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-7/8 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your {restaurantName} Rewards
      </h2>

      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
        <div>
          <p className="text-2xl font-semibold flex items-center">
            <FaStar className="text-yellow-400 mr-2" />
            {starBalance}
          </p>
          <p className="text-sm text-gray-600">Your Star Balance</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold flex items-center justify-end">
            {getTierEmoji(currentTier?.name)} {currentTier?.name} Member
          </p>
          <p className="text-sm text-gray-600">
            {starsToNextTier} stars to {nextTier?.name}{" "}
            {getTierEmoji(nextTier?.name)}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>Progress to {nextTier?.name}</span>
          <span>
            {starBalance}/{nextTier?.stars_threshold}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${
                (starBalance / (nextTier?.stars_threshold || 1)) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">Nearest Rewards</h3>
      <ul className="space-y-3">
        {nearestRewards.map((reward) => (
          <li
            key={reward.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-3 text-xl" />
              <span className="font-medium">{reward.title}</span>
            </div>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
              {reward.stars_required} stars
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;
