import { Proposal, proposalList, SaveDocumentPayload } from "@/type/document";
import { AppAPI } from "@/utils/fetchUtils";

const docAPI = new AppAPI("/document");
const embeddingAPI = new AppAPI("/embedding");

export const saveSection = (
  section: SaveDocumentPayload,
  proposalId: string | undefined,
) => {
  if (proposalId === undefined) {
    throw new Error("Proposal ID is undefined");
  }
  return embeddingAPI.post("", {
    proposalId: proposalId,
    title: section.title,
    body: section.body.replace(/\n/g, " "),
  });
};

export const getProposalList = () => {
  return docAPI.get<proposalList>("", {
    queryKey: "proposalList",
  });
};

export const getProposal = (uuid: string | undefined) => {
  return docAPI.get<Proposal>(`/${uuid}`, {
    shouldFetch: uuid !== "Create_new" && uuid !== undefined,
    queryKey: `proposal-${uuid}`,
  });
};

export const createNewProposal = (name: string) => {
  return docAPI.post("", { name });
};

export const updateProposalName = (uuid: string, name: string) => {
  return docAPI.put(`/${uuid}`, { name });
};

export const deleteDocument = (id: string) => {
  return docAPI.delete(`/${id}`);
};
