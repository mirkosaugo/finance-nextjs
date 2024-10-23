import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import { createStoreWithSelectors } from "@lib/utils";

type ModalsStore = {
  IdAccountInEdit?: string;

  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;

  setNewAccountModalOpen: (isOpen: boolean) => void;
  setEditAccountModalOpen: (id: string) => void;
  setEditAccountModalClose: () => void;
};


const modalsStore = createWithEqualityFn<ModalsStore>()(
  devtools((set) => ({
    IdAccountInEdit: undefined,

    isNewAccountModalOpen: false,
    isEditAccountModalOpen: false,

    setNewAccountModalOpen: (isOpen) => set((state) => ({ ...state, isNewAccountModalOpen: isOpen })),

    setEditAccountModalOpen: (id) => set((state) => ({ ...state, isEditAccountModalOpen: true, IdAccountInEdit: id })),

    setEditAccountModalClose: () => set((state) => ({ ...state, isEditAccountModalOpen: false, IdAccountInEdit: undefined })),
  })),
  Object.is,
);

export const useModalsStore = createStoreWithSelectors(modalsStore);
