"use client";

import React, { useState, useRef } from "react";
import { FaGift, FaCamera } from "react-icons/fa";
import Modal from "../../Modal";
import { createClient } from "@/libs/supabase/client";

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  stars_reward: number;
}

const dummyOffers: SpecialOffer[] = [
  {
    id: "1",
    title: "Share on Social Media",
    description: "Share our app on social media and earn stars!",
    stars_reward: 10,
  },
  {
    id: "2",
    title: "Refer a Friend",
    description: "Refer a friend and earn stars when they sign up!",
    stars_reward: 20,
  },
  {
    id: "3",
    title: "Complete a Survey",
    description: "Complete a quick survey and earn stars!",
    stars_reward: 5,
  },
];

const SpecialOffers: React.FC = () => {
  const [offers] = useState<SpecialOffer[]>(dummyOffers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<SpecialOffer | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
    }
  };

  const handleUpload = async () => {
    // Here you would implement the logic to upload the image
    console.log("Uploading image:", capturedImage);
    // After successful upload, you could update the user's rewards
    const client = createClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const { error } = await client
        .from("profiles")
        .update({
          star_balance: client.rpc("increment", {
            x: selectedOffer?.stars_reward as number,
          }),
        })
        .eq("id", user.id);
      if (error) {
        console.error("Error updating star balance:", error);
      } else {
        alert(
          `Congratulations! You've earned ${selectedOffer?.stars_reward} stars!`
        );
      }
    }
    setIsModalOpen(false);
    setCapturedImage(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-7/8 mx-auto mb-12">
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
          </>
        )}
      </Modal>
    </div>
  );
};

export default SpecialOffers;
