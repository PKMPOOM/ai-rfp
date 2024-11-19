import { create } from "zustand";

export type ReqModalMode = "single" | "bulk";
export type requirement = {
  section: string;
  description: string;
};
type state = {
  clientName: string;
  aiContext: string;
  requirementModalOpen: boolean;
  requirementModalMode: ReqModalMode;
  requirementList: requirement[] | undefined;
  contextModalOpen: boolean;
};

type action = {
  setAIContext: (context: string) => void;
  setClienName: (name: string) => void;
  setRequirementModalOpen: (open: boolean) => void;
  setRequirementModalMode: (mode: ReqModalMode) => void;
  setRequirementList: (list: requirement[]) => void;
  setContextModalOpen: (open: boolean) => void;
  deleteRequirement: (index: number) => void;
  saveListToLocalStorage: (list: requirement[]) => void;
};

export const useGenerativeStore = create<state & action>((set) => ({
  clientName: "",
  aiContext: "",
  requirementModalOpen: false,
  bulkRequirementModalOpen: false,
  requirementList: [],
  contextModalOpen: false,
  requirementModalMode: "single",

  setAIContext: (context: string) => set({ aiContext: context }),
  setClienName: (name: string) => set({ clientName: name }),
  setRequirementModalOpen: (open: boolean) =>
    set({ requirementModalOpen: open }),
  setRequirementList: (list: requirement[]) => set({ requirementList: list }),
  setContextModalOpen: (open: boolean) => set({ contextModalOpen: open }),
  setRequirementModalMode: (mode) => set({ requirementModalMode: mode }),
  deleteRequirement: (index) =>
    set((state) => {
      if (state.requirementList) {
        const newlist = [...state.requirementList];
        newlist.splice(index, 1);
        return { requirementList: newlist };
      } else {
        return state;
      }
    }),
  saveListToLocalStorage: (list: requirement[]) =>
    localStorage.setItem("requirementList", JSON.stringify(list)),
}));
