// [[...sign-in]] -> catch all route for sign-in
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4 gap-4">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Welcome Back</h1>
          <p className="text-base text-gray-600">Login or Create an account</p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>

          <ClerkLoading>
            <div>
              <Loader2 className="animate-spin" />
            </div>
          </ClerkLoading>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center h-full bg-blue-600 text-white">
        <Image src="/logo.svg" width={100} height={100} alt="Sign In" />
      </div>
    </div>
  );
}
