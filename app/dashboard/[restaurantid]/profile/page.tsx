import React from "react";
import ButtonAccount from "@/components/ButtonAccount";
import PaymentDetails from "@/components/profile/PaymentDetails";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <ButtonAccount />
      <PaymentDetails />
    </div>
  );
};

export default ProfilePage;
