"use client";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";

export default function Home() {
  const accounts = useGetAccounts();

  return <div>{accounts?.data?.map((account) => <div key={account.id}>{account.name}</div>)}</div>;
}
