import React, { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import DepositBalance from "./DepositBalance";
import WithdrawBalance from "./WithdrawBalance";

const Profile = () => {
  const navigate = useNavigate();

  // useEffect hook to check value in localStorage for navigation
  useEffect(() => {
    const existingData = localStorage.getItem("accountDetails");
    if (!existingData) {
      navigate("/");
    }
  }, [navigate]);

  // Access the deposit value from the local Storage
  const data = localStorage.getItem("accountDetails");
  const accountDetails = JSON.parse(data);

  let balance = 0;
  if (accountDetails && accountDetails.length > 0) {
    balance = accountDetails[0].deposit;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <p className="mt-3">Your Current Balance is Rs. {balance}</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-3 mb-md-0 d-flex justify-content-center">
            <DepositBalance />
          </div>
          <div className="col-md-6 col-lg-4 d-flex justify-content-center">
            <WithdrawBalance />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
