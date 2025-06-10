"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";

import {
  type ScrapedDataStore,
  createScrapedDataStore,
} from "@/stores/scraped-data-store";
import { useStore } from "zustand";

export type ScrapedDataStoreApi = ReturnType<typeof createScrapedDataStore>;

export const ScrapedDataStoreContext = createContext<
  ScrapedDataStoreApi | undefined
>(undefined);

export interface ScrapedDataStoreProviderProps {
  children: ReactNode;
}

export const ScrapedDataStoreProvider = ({
  children,
}: ScrapedDataStoreProviderProps) => {
  const storeRef = useRef<ScrapedDataStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createScrapedDataStore();
  }

  return (
    <ScrapedDataStoreContext.Provider value={storeRef.current}>
      {children}
    </ScrapedDataStoreContext.Provider>
  );
};

export const useScrapedDataStore = <T,>(
  selector: (store: ScrapedDataStore) => T,
): T => {
  const scrapedDataStoreContext = useContext(ScrapedDataStoreContext);

  if (!scrapedDataStoreContext) {
    throw new Error(
      `useScrapedDataStore must be used within ScrapedDataStoreProvider`,
    );
  }

  return useStore(scrapedDataStoreContext, selector);
};
