"use client";

import { Plus } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalsStore } from "@/stores/modals";

import { Payment, columns } from "./columns";

const PAYMENTS: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
];

export default function AccountsPage() {
  const { setNewAccountModalOpen } = useModalsStore(["setNewAccountModalOpen"]);

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Accounts</CardTitle>
          <Button size="sm" onClick={() => setNewAccountModalOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={PAYMENTS} filterKey="email" onDelete={() => {}} disabled={false} />
        </CardContent>
      </Card>
    </div>
  );
}
