"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaGift, FaCamera } from "react-icons/fa";
import Modal from "../../Modal";
import { createClient } from "@/libs/supabase/client";
import ReactConfetti from "react-confetti";

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  stars_reward: number;
}

const dummyOffers: SpecialOffer[] = [
  {
    id: "1",
    title: "Get Vaccinated",
    description: "Upload your flu shot card for stars!",
    stars_reward: 10,
  },
  {
    id: "2",
    title: "Selfie with a friend at blacksheep",
    description: "Take a selfie with your friend for 20 stars!",
    stars_reward: 20,
  },
  {
    id: "3",
    title: "Run the Boston Marathon",
    description: "Take a picture of your medal for stars",
    stars_reward: 100,
  },
];

const SpecialOffers: React.FC = () => {
  const [offers] = useState<SpecialOffer[]>(dummyOffers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<SpecialOffer | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [newStarBalance, setNewStarBalance] = useState<number | null>(null);
  const [earnedStars, setEarnedStars] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });
  const client = createClient();

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const handleOfferClick = (offer: SpecialOffer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleUpload = async () => {
    console.log("Uploading image:", capturedImage);

    const {
      data: { user },
      error: userError,
    } = await client.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      alert("Error fetching user. Please try again.");
      return;
    }

    if (user) {
      console.log("User found:", user);

      const starsToAddInt4: number = Math.min(
        Math.floor(selectedOffer?.stars_reward || 0),
        9999
      );
      console.log("Stars to add:", starsToAddInt4);
      setEarnedStars(starsToAddInt4); // Set earned stars

      try {
        // Call the RPC function to increment the star balance
        const { error: rpcError } = await client.rpc("increment_star_balance", {
          user_id: user.id,
          increment_by: starsToAddInt4,
        });

        if (rpcError) {
          console.error("Error updating star balance via RPC:", rpcError);
          alert("Failed to update star balance. Please try again.");
        } else {
          // Fetch the updated star balance
          const { data: profileData, error: profileError } = await client
            .from("profiles")
            .select("star_balance")
            .eq("id", user.id)
            .single();

          if (profileError) {
            console.error("Error fetching updated star balance:", profileError);
            alert(
              "Star balance updated, but failed to retrieve the updated value."
            );
          } else {
            console.log(
              "Star balance updated successfully via RPC:",
              profileData
            );
            setNewStarBalance(profileData.star_balance);
            setIsModalOpen(false);
            setCapturedImage(null);
            window.location.reload(); // Refresh the whole page after upload
          }
        }
      } catch (err) {
        console.error("Unexpected error during RPC:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    } else {
      console.log("No user found.");
      alert("User not authenticated.");
    }
  };

  useEffect(() => {
    if (newStarBalance !== null) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    }
  }, [newStarBalance]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-7/8 mx-auto mb-12">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
        />
      )}
      <h2 className="text-2xl font-bold mb-2 text-center">Special Offers</h2>

      <ul className="space-y-3 overflow-y-auto max-h-40">
        {offers.map((offer) => (
          <li
            key={offer.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            onClick={() => handleOfferClick(offer)}
          >
            <div className="flex items-center">
              <FaGift className="text-yellow-400 mr-3 text-xl" />
              <div>
                <span className="font-medium">{offer.title}</span>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </div>
            </div>
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
              {offer.stars_reward} stars
            </span>
          </li>
        ))}
      </ul>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <h3 className="text-xl font-semibold mb-4">{selectedOffer?.title}</h3>
        <p className="mb-4">{selectedOffer?.description}</p>
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full mb-4"
            />
            <div className="flex justify-center space-x-4">
              <button className="btn btn-primary" onClick={startCamera}>
                <FaCamera className="mr-2" /> Start Camera
              </button>
              <button className="btn btn-secondary" onClick={takePicture}>
                Take Picture
              </button>
            </div>
          </>
        ) : (
          <>
            <img src={capturedImage} alt="Captured" className="w-full mb-4" />
            <div className="flex justify-center space-x-4">
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setCapturedImage(null)}
              >
                Retake
              </button>
            </div>
            {newStarBalance !== null && (
              <div className="text-center mt-4">
                <h2 className="text-3xl font-bold text-yellow-500">
                  <span role="img" aria-label="star">
                    ⭐
                  </span>{" "}
                  You've earned {earnedStars} stars!{" "}
                  <span role="img" aria-label="star">
                    ⭐
                  </span>
                </h2>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default SpecialOffers;
