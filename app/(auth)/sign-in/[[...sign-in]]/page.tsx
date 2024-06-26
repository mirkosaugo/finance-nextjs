// [[...sign-in]] -> catch all route for sign-in

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
