"use client";

import React from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import useConfirm from "@/hooks/useConfirm";
import { useModalsStore } from "@/stores/modals";

import { useDeleteAccount } from "../api/useDeleteAccount";
import { useEditAccount } from "../api/useEditAccount";
import { useGetAccount } from "../api/useGetAccount";

import { AccountForm, type FormAccountValues } from "./AccountForm";

export const EditAccountSheet = () => {
  const [ConfirmationDialog, confirm] = useConfirm("Delete", "Are you sure you want to delete this item?");

  const { IdAccountInEdit, isEditAccountModalOpen, setEditAccountModalClose } = useModalsStore([
    "isEditAccountModalOpen",
    "IdAccountInEdit",
    "setEditAccountModalClose",
  ]);

  const { data: account, isLoading } = useGetAccount(IdAccountInEdit);
  const { isPending: accountInEditPending, mutate: editMutation } = useEditAccount(IdAccountInEdit);
  const { isPending: accountDeletePending, mutate: deleteMutation } = useDeleteAccount(IdAccountInEdit);

  const onSubmit = (values: FormAccountValues) => {
    console.log(values);
    editMutation(values, {
      onSuccess: () => {
        setEditAccountModalClose();
      },
    });
  };

  const onDelete = async () => {
    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    deleteMutation(undefined, {
      onSuccess: () => {
        setEditAccountModalClose();
      },
    });
  };

  const defaultValues = {
    name: account?.name ?? "",
  };

  return (
    <>
      <Sheet open={isEditAccountModalOpen} onOpenChange={setEditAccountModalClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Update the details of your account to track your transactions.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <AccountForm
              id={IdAccountInEdit}
              onSubmit={onSubmit}
              disabled={accountInEditPending || accountDeletePending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
      <ConfirmationDialog />
    </>
  );
};
