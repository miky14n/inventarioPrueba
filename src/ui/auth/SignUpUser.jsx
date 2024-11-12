"use client";
import { handleSignUp } from "@/lib/cognitoActions";
import { useState } from "react";
import NuxButton from "@/components/Button";

export default function SignUpUser({ setSuperEmail, setStateRender }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [passErr, setPassErr] = useState("");
  const [signUpErr, setSignUpErr] = useState("");

  const handleChangeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setSuperEmail(emailValue);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    if(password.length <8 ){
      setPassErr("Password must be at least 8 characters long");
    }
    else{
      setPassErr("");
    }
  };

  const handleChangeConfirmPassword = (event) => {
    const checkPass = event.target.value;
    setConfirmPass(checkPass);
    if (password !== checkPass) {
      setPassErr("Passwords must match!");
    } else {
      setPassErr("");
    }
  };

  async function handleSignUpForm() {
    try {
      const { isSignUpComplete, userId, nextStep } = await handleSignUp({
        email: email,
        password: password,
      });
      console.log(isSignUpComplete, userId, nextStep);
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setStateRender("ConfirmUser");
      }
    } catch (error) {
      console.log("Error Signing up:", error);
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
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
                className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={handleChangeConfirmPassword}
                className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {signUpErr && (
              <div className="text-red-600 text-sm mt-2">{signUpErr}</div>
            )}
            {passErr && (
              <div className="text-red-600 text-sm mt-2">{passErr}</div>
            )}

            <div className="flex justify-center">
              <NuxButton
                action={handleSignUpForm}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                content="Sign Up"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
