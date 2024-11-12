"use client";
import { handleSendEmailVerificationCode } from "@/lib/cognitoActions";
import { useState } from "react";
import NuxButton from "@/components/Button";

export default function ConfirmUser({ superEmail, setStateRender }) {
  const [code, setCode] = useState("");
  const [signUpErr, setSignUpErr] = useState("");

  const handleChangeCode = (event) => {
    setCode(event.target.value);
    console.log("variables:", superEmail, code);
  };

  async function handleSignUpConfirmation() {
    try {
      const { isSignUpComplete, nextStep, message } =
        await handleSendEmailVerificationCode({
          username: superEmail,
          confirmationCode: code,
        });
      console.log(isSignUpComplete, nextStep);
      if (message === "Code sent successfully") {
        setStateRender("Inventory");
      } else {
        setSignUpErr(message);
      }
    } catch (error) {
      console.log("error confirming sign up", error);
      setSignUpErr(error);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 text-center">
          <h2 className="text-white text-2xl font-semibold">Nuxway</h2>
        </div>
        <div className="px-8 py-6">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Code</label>
              <input
                type="text"
                value={code}
                onChange={handleChangeCode}
                className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {signUpErr && (
              <div className="text-red-600 text-sm mt-2">{signUpErr}</div>
            )}
            <div className="flex justify-center">
              <NuxButton
                action={handleSignUpConfirmation}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                content="Send Code"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
