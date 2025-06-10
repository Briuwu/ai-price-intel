import { createStore } from "zustand/vanilla";

export type ScrapedDataState = {
  data: {
    title: string;
    price: number;
    url: string;
    similarity?: number;
  }[];
  isLoading: boolean;
};

export type ScrapedDataActions = {
  addData: (data: ScrapedDataState["data"]) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetData: () => void;
};

export type ScrapedDataStore = ScrapedDataState & ScrapedDataActions;

export const defaultInitialState: ScrapedDataState = {
  data: [],
  isLoading: false,
};

export const createScrapedDataStore = (
  initState: ScrapedDataState = defaultInitialState,
) => {
  return createStore<ScrapedDataStore>()((set) => ({
    ...initState,
    addData: (data) => set((state) => ({ data: [...state.data, ...data] })),
    setIsLoading: (isLoading) => set({ isLoading }),
    resetData: () => set({ data: [] }),
  }));
};
