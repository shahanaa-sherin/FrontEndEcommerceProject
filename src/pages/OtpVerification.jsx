import axios from "axios";
import React, { useRef, useState } from "react";

function OtpVerification() {
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // Refs for each OTP input field
  const otpInputs = Array.from({ length: 6 }, () => useRef(null));

  // Function to focus the next input field
  const focusNextInput = (index) => {
    if (index < otpInputs.length - 1) {
      otpInputs[index + 1].current.focus();
    }
  };

  // Function to handle input change in OTP fields
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    // If input value is entered and it's not the last input field, focus the next field
    if (value && index <= otpInputs.length - 1) {
      focusNextInput(index);
    }
    const newotp = [...otp];
    newotp[index] = value;
    setOtp(newotp);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/getotp", {
        phonenumber,
      });
      if (response.status === 200) {
        console.log(response.data);
        setError("");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("error occured please try again");
      }
    }
  };

  const validateOtp = async (e) => {
    e.preventDefault();
    console.log(otp, phonenumber);
    try {
      const response = await axios.post("http://localhost:4000/validateotp", {
        otp,
        phonenumber,
      });
      if (response.status === 200) {
        console.log(response.data);
        setError("otp is valid");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("error occured please try again");
      }
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            OTP Validation
          </h1>
          {/* Input for Phone Number */}
          <label htmlFor="phoneNumber" className="text-left">
            Enter your Mobile Number :
          </label>
          <input
            id="phoneNumber"
            type="number"
            className="w-full p-1 border rounded mb-4"
            placeholder="Enter Phone Number"
            value={phonenumber}
            onChange={(event) => setPhonenumber(event.target.value)}
          />
          <button onClick={handleSubmit}>get otp</button>
          {/* OTP Input Fields */}
          <label htmlFor="otp" className="text-left">
            Enter OTP
          </label>
          <div className="flex justify-around mb-4">
            {otpInputs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="number"
                className="w-9 p-1 border rounded"
                maxLength="1"
                onChange={(event) => handleInputChange(index, event)}
              />
            ))}
          </div>
          {/* Validate OTP Button */}
          <button
            onClick={validateOtp}
            className="mt-6 bg-amber-400 text-white p-2 rounded w-full"
          >
            Validate OTP
          </button>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
