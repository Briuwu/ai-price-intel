"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type URLStore, createURLStore } from "@/stores/url-store";

export type URLStoreApi = ReturnType<typeof createURLStore>;

export const URLStoreContext = createContext<URLStoreApi | undefined>(
  undefined,
);

export interface URLStoreProviderProps {
  children: ReactNode;
}

export const URLStoreProvider = ({ children }: URLStoreProviderProps) => {
  const storeRef = useRef<URLStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createURLStore();
  }

  return (
    <URLStoreContext.Provider value={storeRef.current}>
      {children}
    </URLStoreContext.Provider>
  );
};

export const useURLStore = <T,>(selector: (store: URLStore) => T): T => {
  const urlStoreContext = useContext(URLStoreContext);

  if (!urlStoreContext) {
    throw new Error(`useURLStore must be used within URLStoreProvider`);
  }

  return useStore(urlStoreContext, selector);
};
