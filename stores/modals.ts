import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import { createStoreWithSelectors } from "@lib/utils";

type ModalsStore = {
  isNewAccountModalOpen: boolean;
  setNewAccountModalOpen: (isOpen: boolean) => void;
};


const modalsStore = createWithEqualityFn<ModalsStore>()(
  devtools((set) => ({
    isNewAccountModalOpen: false,
    setNewAccountModalOpen: (isNewAccountModalOpen) => set((state) => ({ ...state, isNewAccountModalOpen })),
  })),
  Object.is,
);

export const useModalsStore = createStoreWithSelectors(modalsStore);
