// CLERK
// The clerkMiddleware helper enables authentication and is where you'll configure your protected routes. 
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";



const isProtectedRoute = createRouteMatcher([
  '/',
  // '/forum(.*)', : all forum routes are protected
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    return auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};