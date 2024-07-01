"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const WelcomeMessage = () => {
  const { isLoaded, user } = useUser();

  return <h2 className="text-2xl font-medium text-white lg:text-4xl">Hi {isLoaded ? `${user?.firstName}!` : null}</h2>;
};

export default WelcomeMessage;
