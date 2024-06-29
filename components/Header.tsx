import React from "react";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <Logo />
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
