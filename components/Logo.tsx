import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="hidden items-center gap-x-4 lg:flex">
        <Image src="/logo.svg" width={28} height={28} alt="Logo" />
        <p className="text-2xl font-semibold text-white">Finance</p>
      </Link>
    </div>
  );
};

export default Logo;
