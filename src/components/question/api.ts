import { AppAPI } from "@/utils/fetchUtils";

const generativeAPI = new AppAPI("/generative");

export const testGenerate = () => {
  return generativeAPI.post("", {
    section: "section",
    description: "description",
  });
};
