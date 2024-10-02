import { SaveDocumentPayload } from "@/type/document";
import { prisma } from "@/utils/prisma";

const saveDocument = async (docData: SaveDocumentPayload) => {
  await prisma.documents.create({
    data: {
      body: docData.body,
      title: docData.title,
    },
  });
};

export const documentController = {
  saveDocument,
};
