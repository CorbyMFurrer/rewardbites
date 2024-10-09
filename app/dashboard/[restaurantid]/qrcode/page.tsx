"use client";
import React from "react";
import QRCode from "react-qr-code";
import { useParams } from "next/navigation";

const QRCodePage = () => {
  const params = useParams();
  const restaurantId = params.restaurantid as string;

  // The URL you want to encode in the QR code
  const qrCodeValue = `https://yourwebsite.com/menu/${restaurantId}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <QRCode value={qrCodeValue} size={256} />
    </div>
  );
};

export default QRCodePage;
