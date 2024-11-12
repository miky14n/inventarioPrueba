"use client";

import { Amplify } from "aws-amplify";

const authConfig = {
  Cognito: {
    userPoolId: "us-east-2_UlkYzmw8j",
    userPoolClientId: "7edng94vo59ssqu5qmg0vpoama",
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
