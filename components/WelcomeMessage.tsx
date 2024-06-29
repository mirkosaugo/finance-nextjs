"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const WelcomeMessage = () => {
  const { isLoaded, user } = useUser();

  return isLoaded ? <h2 className="text-2xl font-medium text-white lg:text-4xl">Hi {user?.firstName}! </h2> : null;
};

export default WelcomeMessage;
