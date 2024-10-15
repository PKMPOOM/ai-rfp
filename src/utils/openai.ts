import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";
import {
  embed,
  EmbeddingModel,
  embedMany,
  streamText,
  convertToCoreMessages,
  CoreMessage,
} from "ai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing env: OPENAI_API_KEY");
}

export class CustomAI {
  textModel: OpenAIProvider;
  embedingsModel: EmbeddingModel<string>;
  context: string | undefined;
  constructor() {
    const model = createOpenAI({
      apiKey,
      compatibility: "strict", // strict mode, enable when using the OpenAI API
    });
    this.textModel = model;
    this.embedingsModel = model.embedding("text-embedding-ada-002");
  }

  async createEmbedding(text: string) {
    return embed({
      model: this.textModel.embedding("text-embedding-ada-002"),
      value: text.replaceAll("\n", " "),
      maxRetries: 3,
    });
  }

  async createMultipleEmbeddings(texts: string[]) {
    const { embeddings } = await embedMany({
      model: this.embedingsModel,
      values: ["sunny day at the beach", "rainy afternoon in the city"],
    });

    return embeddings;
  }

  createCompletion(CoreMessage: CoreMessage[]) {
    return streamText({
      model: this.textModel("gpt-4o"),
      // prompt: text,
      messages: CoreMessage,
      maxTokens: 4000,
      maxSteps: 5, // enable multi-step calls
      experimental_continueSteps: true,
    });
  }

  setContext = (context: string) => (this.context = context);
  resetContext = () => (this.context = undefined);
}

export const appAI = new CustomAI();
