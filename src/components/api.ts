import { SaveDocumentPayload } from "@/type/document";
import { AppAPI } from "@/utils/fetchUtils";

const docAPI = new AppAPI("/document");
export const saveSection = (section: SaveDocumentPayload) => {
  return docAPI.post("", section);
};
