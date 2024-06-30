// const Header = dynamic(() => import("@/components/Header"), {
//   loading: () => <p>Loading...</p>,
// });

import { Header } from "@components";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
}
