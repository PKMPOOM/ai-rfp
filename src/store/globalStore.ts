import { create } from "zustand";

type state = {
  mainDrawerOpen: boolean;
  editDrawerOpen: boolean;
  documentID: string | undefined;
};

type action = {
  setMainDrawerOpen: (open: boolean) => void;
  setEditDrawerOpen: (open: boolean) => void;
  setDocumentID: (id: string | undefined) => void;
};

export const useGlobalStore = create<state & action>((set) => ({
  mainDrawerOpen: false,
  setMainDrawerOpen: (open: boolean) => set({ mainDrawerOpen: open }),

  editDrawerOpen: false,
  setEditDrawerOpen: (open: boolean) => set({ editDrawerOpen: open }),

  documentID: undefined,
  setDocumentID: (id: string | undefined) => set({ documentID: id }),
}));
