export type Proposal = {
  id: string;
  uuid: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  documents: DocumentSection[];
};

export type DocumentSection = {
  id: string;
  created_at: Date;
  title: string;
  body: string;
  embeddeds: string[];
};

export type SaveDocumentPayload = Omit<
  DocumentSection,
  "id" | "created_at" | "embeddeds"
>;
