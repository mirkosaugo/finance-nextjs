import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { StoreApi } from "zustand";
import { shallow } from "zustand/shallow";
import { UseBoundStoreWithEqualityFn } from "zustand/traditional";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createStoreWithSelectors = <T>(store: UseBoundStoreWithEqualityFn<StoreApi<T>>) => {
  return <K extends keyof T>(keys: K[]) => {
    return store((state) => keys.reduce((acc, curr) => ({ ...acc, [curr]: state[curr] }), {} as Pick<T, K>), shallow);
  };
};
