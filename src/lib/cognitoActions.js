import { redirect } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  getCurrentUser,
} from "aws-amplify/auth";
import { getErrorMessage } from "@/utils/get-error-message";

export async function handleCurrentUser() {
  let logged = false;
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    if (userId !== "" && userId) {
      console.log("Logged?", username, userId, signInDetails);
      logged = true;
    }
  } catch (err) {
    console.log(err);
    logged = false;
  }
  return logged;
}

export async function handleSignUp(formData) {
  let response;
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: formData.email,
      password: formData.password,
    });
    response = { isSignUpComplete, userId, nextStep };
    console.log(isSignUpComplete, userId, nextStep);
  } catch (error) {
    console.log("error signing up from actions:", error);
    return getErrorMessage(error);
  }
  return response;
}

export async function handleSendEmailVerificationCode(formData) {
  let currentState;
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: formData.username,
      confirmationCode: formData.confirmationCode,
    });
    currentState = {
      ...{ isSignUpComplete, nextStep },
      message: "Code sent successfully",
    };
    console.log("All good");
  } catch (error) {
    console.log("error confirming sign up", error);
    currentState = {
      message: error,
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(formData) {
  let response;
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp(
      formData.email,
      formData.code
    );
    response = { isSignUpComplete, nextStep };
  } catch (error) {
    return getErrorMessage(error);
  }
  return response;
}

export async function handleSignIn(formData) {
  try {
    const { isSignedIn, nextStep } = await signIn(
      formData.email,
      formData.password
    );
    if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode(formData.email);
      return { isSignedIn, nextStep };
    }
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect("/auth");
}
