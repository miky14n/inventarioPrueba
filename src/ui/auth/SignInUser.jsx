"use client";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import NuxButton from "@/components/Button";

export default function SignInUser({ setSuperEmail, setStateRender }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const handleForgetPass = () => {
    setStateRender("ForgotPassword");
  };

  const handleChangeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setSuperEmail(emailValue);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpClick = () => {
    console.log("Sign up order!");
    setStateRender("SignUp");
  };

  const handleSignIn = async () => {
    try {
      var { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
      });
      console.log("User:", isSignedIn, nextStep);
      switch (nextStep.signInStep) {
        case "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED":
          setStateRender("ResetPassword");
          break;
        case "RESET_PASSWORD":
          setStateRender("ResetPassword");
          break;
        case "CONFIRM_SIGN_UP":
          setStateRender(`ConfirmUser`);
          break;
        case "DONE":
          setStateRender("Inventory");
          break;
        default:
          setLoginErr(
            "Something went wrong, please contact Nuxway Technology",
            nextStep
          );
          break;
      }
    } catch (err) {
      console.log("Error in SignIn:", JSON.stringify(err));

      setLoginErr("Error:", JSON.stringify(err));
    }
  };

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
              <button
                type="button"
                onClick={handleForgetPass}
                className="text-blue-600 mt-2 text-sm hover:text-blue-800 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            {loginErr && (
              <div className="text-red-600 text-sm mt-2">{loginErr}</div>
            )}
            <div className="flex justify-center">
              <NuxButton
                action={handleSignIn}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                content="Sign In"
              />
            </div>
          </form>
          <div className="text-center mt-4 text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={handleSignUpClick}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
