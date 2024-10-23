// CLERK
// The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/',
  // '/api(.*)',
  // '/forum(.*)', : all forum routes are protected
]);


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  return NextResponse.next();

});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
