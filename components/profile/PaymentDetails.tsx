"use client";
import React, { useState } from "react";

interface CreditCardData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

const dummyCardData: CreditCardData = {
  cardNumber: "**** **** **** 1234",
  cardHolder: "John Doe",
  expirationDate: "12/25",
  cvv: "***",
};

const PaymentDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardData, setCardData] = useState<CreditCardData>(dummyCardData);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the data to your backend
    console.log("Saving card data:", cardData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-96 p-6 rounded-lg shadow-md">
      {!isEditing ? (
        <div
          className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-lg cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <div className="text-xl mb-4">{cardData.cardNumber}</div>
          <div className="text-sm mb-2">{cardData.cardHolder}</div>
          <div className="text-sm">{cardData.expirationDate}</div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleInputChange}
            placeholder="Card Number"
            maxLength={19}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cardHolder"
            value={cardData.cardHolder}
            onChange={handleInputChange}
            placeholder="Card Holder"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="expirationDate"
            value={cardData.expirationDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            maxLength={5}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cvv"
            value={cardData.cvv}
            onChange={handleInputChange}
            placeholder="CVV"
            maxLength={3}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentDetails;
