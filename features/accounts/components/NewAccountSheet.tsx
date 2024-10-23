"use client";

import React from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useModalsStore } from "@/stores/modals";
import { useCreateAccounts } from "@features/accounts/api/useCreateAccount";

import { AccountForm, type FormAccountValues } from "./AccountForm";

export const NewAccountSheet = () => {
  const { isPending, mutate } = useCreateAccounts();

  const { isNewAccountModalOpen, setNewAccountModalOpen } = useModalsStore([
    "setNewAccountModalOpen",
    "isNewAccountModalOpen",
  ]);

  const onSubmit = (values: FormAccountValues) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        setNewAccountModalOpen(false);
      },
    });
  };

  return (
    <Sheet open={isNewAccountModalOpen} onOpenChange={setNewAccountModalOpen}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions.</SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={isPending}
          defaultValues={{
            name: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
