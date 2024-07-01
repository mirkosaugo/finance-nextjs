"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useModalsStore } from "@/stores/modals";

export default function Home() {
  const accounts = useGetAccounts();
  const { setNewAccountModalOpen } = useModalsStore(["setNewAccountModalOpen"]);

  return (
    <div>
      <Button className="mt-6" variant="secondary" onClick={() => setNewAccountModalOpen(true)}>
        Open Modal
      </Button>
      {accounts?.data?.map((account) => <div key={account.id}>{account.name}</div>)}
    </div>
  );
}
