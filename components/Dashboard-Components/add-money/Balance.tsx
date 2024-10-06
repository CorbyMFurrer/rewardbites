"use client";
import React, { useState } from "react";
import { FaPlus, FaMoneyBillWave } from "react-icons/fa";

const Balance: React.FC = () => {
  const [balance, setBalance] = useState(100); // Initial balance of $100
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState("");

  const handleAddMoney = () => {
    const amount = parseFloat(amountToAdd);
    if (!isNaN(amount) && amount > 0) {
      setBalance((prevBalance) => prevBalance + amount);
      setIsModalOpen(false);
      setAmountToAdd("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-7/8 mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-2 text-center">Your Balance</h2>

      <div className="flex justify-center items-center mb-4">
        <FaMoneyBillWave className="text-green-500 text-3xl mr-2" />
        <p className="text-2xl font-semibold">${balance.toFixed(2)}</p>
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mr-2" /> Add Money
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-4 w-1/3 z-10">
            <h2 className="text-xl font-semibold mb-2">
              Add Money to Your Account
            </h2>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              placeholder="Enter amount"
              className="input input-bordered w-full mb-2"
            />
            <button className="btn btn-primary w-full" onClick={handleAddMoney}>
              Add Money
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Balance;
