export type Proposal = {
  id: string;
  uuid: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  documents: DocumentSection[];
};

export type SaveDocumentPayload = Omit<
  DocumentSection,
  "id" | "createdAt" | "embeddeds" | "updatedAt"
>;

export interface DocumentSection {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type proposalList = {
  id: number;
  title: string;
  create_at: string;
  update_at: string;
  uuid: string;
  documents: number;
}[];
