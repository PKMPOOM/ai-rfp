import { create } from "zustand";

// const questionDummy = [
//   {
//     section: "Guest Satisfaction Exit Surveys",
//     description:
//       "Typically conducted once a year, on-site, for both Casinos Regina and Moose Jaw to, including but not limited to: • Determine guests’ overall satisfaction with their current visit; • Gauge awareness of SaskGaming’s Responsible Gambling initiatives; • Identify potential new products and areas of potential improvement; • Provide guest feedback on new initiatives; • Other issues related to guest enjoyment at the casinos; and • Demographic analysis of respondents. Sample size: 500-600.",
//   },

//   {
//     section: "Customer Service Standards Surveys",
//     description:
//       "This could be traditional mystery shopper surveys or other creative ways to measure the quality of staff interaction with guests. The evaluation(s) will be completed with the following objectives: • Investigate the level of customer service at Casino Regina and Casino Moose Jaw; • Assess the effectiveness of staff delivering on customer service standards; • Knowledge of and/or experience with creative methods to measure customer service standards would be beneficial to SaskGaming’s strategic vision. Targeted interactions will be set on a project-by-project basis. Typical mystery shopper surveys targeted 350-400 interactions.",
//   },
//   {
//     section: "Online Customer Feedback Platform",
//     description:
//       "An online 'community' platform designed to engage with customers on an ad hoc basis with small surveys, polls, and discussion forums: • to facilitate the need for quick answers to questions; • to facilitate smaller surveys for guests who want to frequently participate; • provide a user-interface which is simple for guests to use, has powerful analytical functions, but also conducive to timely presentation of results to internal stakeholders. Capacity to facilitate a minimum 500 members (including minimum 100 members in MJ).",
//   },
//   {
//     section: "In-Province Online/Telephone Surveys",
//     description:
//       "The ability to survey the general public in the province (not necessarily core market typical casino guests) on an ad hoc basis. Potential topics include but are not limited to: • Public awareness of community support; • Charity preferences of customers/public.",
//   },
//   {
//     section: "Customer Experience Research and Strategy",
//     description:
//       "Support the development and implementation of Customer Experience Strategies: • Behavioral analytics: Understanding SaskGaming guests’ behaviors, mindset, and preferences; • Identification of core customer groups: Segments based on play behaviors, psychographics, location, etc.; • Determine desired guest experience through guest research; • Evaluate alignment of current and desired guest experience; • Development of metrics to analyze the performance in delivering a guest experience; • Customer mapping of guest touchpoints; and • Customer loyalty analysis: Identifying, evaluating, and developing loyalty drivers for SaskGaming.",
//   },
// ];

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
