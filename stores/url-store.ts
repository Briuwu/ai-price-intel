import { createStore } from "zustand/vanilla";

export type URLState = {
  data: {
    marketplace: string;
    url: string;
  }[];
};

export type URLActions = {
  addData: (data: URLState["data"]) => void;
  resetData: () => void;
};

export type URLStore = URLState & URLActions;

export const defaultInitialState: URLState = {
  data: [],
};

export const createURLStore = (initState: URLState = defaultInitialState) => {
  return createStore<URLStore>()((set) => ({
    ...initState,
    addData: (data) => set((state) => ({ data: [...state.data, ...data] })),
    resetData: () => set({ data: [] }),
  }));
};
