"use client";

import { signOut } from "next-auth/react";

const SignOutButton = ({}) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignOutButton;
