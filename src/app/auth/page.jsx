"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInUser from "@/ui/auth/SignInUser";
import SignUpUser from "@/ui/auth/SignUpUser";
import ConfirmUser from "@/ui/auth/ConfirmUser";
import { handleCurrentUser } from "@/lib/cognitoActions";

export default function Auth() {
  const router = useRouter();
  const [superEmail, setSuperEmail] = useState("");
  const [stateRender, setStateRender] = useState("SignIn");
  const [render, setRender] = useState(<SignInUser />);

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const logged = await handleCurrentUser();
        if (logged === true) {
          router.push("/inventory");
        }
      } catch (error) {}
    };
    tryLogin();
  }, []);

  useEffect(() => {
    switch (stateRender) {
      case "SignIn":
        setRender(
          <SignInUser
            setStateRender={setStateRender}
            setSuperEmail={setSuperEmail}
          />
        );
        break;
      case "SignUp":
        console.log("Changing StateRender to signUp");
        setRender(
          <SignUpUser
            setStateRender={setStateRender}
            superEmail={superEmail}
            setSuperEmail={setSuperEmail}
          />
        );
        break;
      case "ConfirmUser":
        console.log("Changing StateRender to ConfirmSignUp");
        setRender(
          <ConfirmUser
            setStateRender={setStateRender}
            superEmail={superEmail}
          />
        );
        break;

      case "Inventory":
        console.log("Redirecting to Inventory");
        router.push("/inventory");
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateRender, router]);

  return <>{render}</>;
}
