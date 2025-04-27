"use client";
import { useGetUserVerificationCodeQuery } from "@/hooks/User.hook";
import React, { useState, useEffect } from "react";

const VerifyEmail = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
   const { data: verificationCode, isLoading } =
     useGetUserVerificationCodeQuery(email as string);
  useEffect(() => {
    const codeStr = code.join("").trim();
    if (codeStr.length === 6 && verificationCode?.data?.emailVerificationCode) {
      if (codeStr === verificationCode?.data.emailVerificationCode) {
        setIsVerified(true);
        setIsInvalidCode(false);
      } else {
        setIsInvalidCode(true);
        setIsVerified(false);
      }
    }
  }, [code, verificationCode]);
 
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (!verificationCode)
    return (
      <div className="flex justify-center items-center min-h-screen">
        No verification code found
      </div>
    );

  console.log(verificationCode?.data.emailVerificationCode);

  // Handle the input change and focus shift
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];
    const value = e.target.value.slice(0, 1); // Ensure only 1 digit per field
    newCode[index] = value;

    // Move focus to next input after entering a digit
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `input-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }

    setCode(newCode);
  };

  // Handle backspace key event
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Move focus to previous input if current field is empty and backspace is pressed
      if (index > 0) {
        const prevInput = document.getElementById(
          `input-${index - 1}`
        ) as HTMLInputElement;
        if (prevInput) prevInput.focus();
      }
    }
  };

  // Automatically verify the email when the code is complete

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-[#04091d] border border-white/20 backdrop-blur-md  rounded-lg shadow-lg">
        {isVerified ? (
          ""
        ) : (
          <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Verify Your Email
          </h2>
        )}

        {isVerified ? (
          <>
            <div className="text-center text-green-500">
              <h3 className="text-xl">Email Verified Successfully!</h3>
            </div>
            <div className="mt-6 text-center">
              <button className="w-full button-primary">Back to home</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-white mb-4">
              Please enter the verification code sent to your email.
            </p>

            <div className="flex justify-center gap-4 mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-12 text-center rounded-md bg-white/20 text-white text-2xl focus:outline-none 
                    ${
                      isInvalidCode
                        ? "border-2 border-red-500"
                        : "border-2 border-transparent"
                    } 
                    ${isVerified ? "border-green-500" : "focus:ring-2 "} 
                    transition-all`}
                />
              ))}
            </div>

            {isInvalidCode && !isVerified && (
              <p className="mt-4 text-center text-red-500">
                Invalid verification code. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
