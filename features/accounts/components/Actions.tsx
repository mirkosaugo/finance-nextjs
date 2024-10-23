import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConfirm from "@/hooks/useConfirm";
import { useModalsStore } from "@/stores/modals";

import { useDeleteAccount } from "../api/useDeleteAccount";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmationDialog, confirm] = useConfirm("Delete", "Are you sure you want to delete this item?");

  const { setEditAccountModalOpen } = useModalsStore(["setEditAccountModalOpen"]);

  const { isPending: deleteMutationPending, mutate: deleteMutation } = useDeleteAccount(id);

  const onDelete = async () => {
    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    deleteMutation();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
          <DropdownMenuItem disabled={deleteMutationPending} onClick={() => setEditAccountModalOpen(id)}>
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutationPending} onClick={onDelete}>
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog />
    </>
  );
};
