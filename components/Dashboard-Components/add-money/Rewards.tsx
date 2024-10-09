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
      console.log("Fetching user data...");
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user data:", userError);
      }
      setUser(user);

      if (user) {
        // Fetch client stars, current tier, and next tier
        const [clientStarsResult, currentTierResult, restaurantResult] =
          await Promise.all([
            supabase
              .from("profiles")
              .select("star_balance")
              .eq("id", user.id)
              .single(),
            supabase
              .from("member_tiers")
              .select("*")
              .eq("restaurant_id", restaurantId)
              .order("stars_threshold", { ascending: false }),
            supabase
              .from("restaurants")
              .select("name")
              .eq("id", restaurantId)
              .single(),
          ]);

        // Handle client stars
        if (clientStarsResult.error) {
          console.error(
            "Error fetching client stars:",
            clientStarsResult.error
          );
        } else if (clientStarsResult.data) {
          setStarBalance(clientStarsResult.data.star_balance);
        }

        // Handle tiers
        if (currentTierResult.error) {
          console.error("Error fetching tiers:", currentTierResult.error);
        } else if (currentTierResult.data) {
          const tiers = currentTierResult.data;
          const currentTier = tiers.find(
            (tier) =>
              tier.stars_threshold <= clientStarsResult.data.star_balance
          );
          const nextTier = tiers.find(
            (tier) => tier.stars_threshold > clientStarsResult.data.star_balance
          );

          setCurrentTier(currentTier || null);
          setNextTier(nextTier || null);
        }

        // Handle restaurant name
        if (restaurantResult.error) {
          console.error(
            "Error fetching restaurant name:",
            restaurantResult.error
          );
        } else if (restaurantResult.data) {
          setRestaurantName(restaurantResult.data.name);
        }

        // Fetch nearest rewards
        const { data: offerings, error: offeringsError } = await supabase
          .from("offerings")
          .select("id, title, description, stars_required")
          .eq("restaurant_id", restaurantId)
          .order("stars_required", { ascending: true });

        if (offeringsError) {
          console.error("Error fetching offerings:", offeringsError);
        } else if (offerings) {
          const nearestOffers = offerings
            .filter(
              (offer) =>
                offer.stars_required > clientStarsResult.data.star_balance
            )
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

      <div className="flex justify-between items-center mb-6 bg-gray-00 p-4 rounded-lg">
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
