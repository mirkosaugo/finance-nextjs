import dynamic from "next/dynamic";

export const Header = dynamic(() => import("./Header"), {
  loading: () => <p>Loading...</p>,
});

export const Logo = dynamic(() => import("./Logo"), {
  loading: () => <p>Loading...</p>,
});

export const NavButton = dynamic(() => import("./NavButton"), {
  loading: () => <p>Loading...</p>,
});

export const Navigation = dynamic(() => import("./Navigation"), {
  loading: () => <p>Loading...</p>,
});

export const WelcomeMessage = dynamic(() => import("./WelcomeMessage"), {
  loading: () => <p>Loading...</p>,
});
