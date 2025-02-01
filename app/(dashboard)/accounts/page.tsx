"use client";

import { Row } from "@tanstack/react-table";
import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteAccounts } from "@/features/accounts/api/useDeleteAccounts";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useModalsStore } from "@/stores/modals";

import { type ResponseType as ItemType, columns } from "./columns";

const WrapperCard = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <Card className="border-none drop-shadow-sm">{children}</Card>
  </div>
);

export default function AccountsPage() {
  const { setNewAccountModalOpen } = useModalsStore(["setNewAccountModalOpen"]);
  const { data: accounts = [], error, isError, isLoading } = useGetAccounts();
  const { isPending: isDeleting, mutate: deleteAccounts } = useDeleteAccounts();

  const onDelete = (rows: Row<ItemType>[]) => {
    const ids = rows.map((row) => row.original.id);
    deleteAccounts({ ids });
  };

  if (isLoading) {
    return (
      <WrapperCard>
        <CardHeader className="flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="mt-4 h-[20px] w-[220px] rounded-full" />
          <Skeleton className="mt-4 h-[20px] w-[100px] rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="flex h-[500px] w-full items-center justify-center">
            <Loader2 className="size-6 animate-spin text-slate-300" />
          </div>
        </CardContent>
      </WrapperCard>
    );
  }

  return (
    <WrapperCard>
      <CardHeader className="flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="line-clamp-1 text-xl">Accounts</CardTitle>
        <Button size="sm" onClick={() => setNewAccountModalOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={accounts} filterKey="name" onDelete={onDelete} disabled={isDeleting} />
      </CardContent>
    </WrapperCard>
  );
}
