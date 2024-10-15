import { appAI } from "@/utils/openai";
import { CoreMessage } from "ai";
import { NextResponse } from "next/server";
import { vectorSearch } from "../search/utils";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  try {
    // search for similar vector
    const { embedding } = await appAI.createEmbedding(prompt);

    // use similarity as reference
    const vectorSearchResults = await vectorSearch(embedding);

    // hard coded for now
    const MY_COMPANY = "Insightrix Research Inc.";
    const CLIENT_COMPANY = "SaskGaming";

    // prepare prompt
    const coreMessages: CoreMessage[] = [
      {
        role: "system",
        content: `You are a writting proposal section for a ${MY_COMPANY} and you will use previous reference data from vector search`,
      },
      {
        role: "system",
        content: `You are a detailed proposal section writer who creates comprehensive responses based on extensive reference materials. Your task is to generate in-depth answers that fully utilize the reference content (typically 700+ words per reference) while maintaining appropriate templating and professional standards.
      
      Key Instructions:
      - Generate detailed responses that match or exceed the depth of references
      - Thoroughly analyze and incorporate approaches from all provided references
      - Replace company names with ${CLIENT_COMPANY} throughout
      - Maintain the extensive detail level present in reference materials
      - Ensure comprehensive coverage of methodologies, processes, and outcomes
      
      Content Generation Rules:
      1. Length and Depth:
         - Aim for comprehensive responses that match reference length
         - Include all relevant details, processes, and methodologies
         - Maintain detailed explanations of approaches
         - Provide thorough coverage of implementation steps
         - Include specific metrics and examples where present in references
      
      2. Reference Utilization:
         - Thoroughly analyze all provided references (typically 3+ documents)
         - Identify and incorporate key successful elements from each
         - Combine complementary approaches when appropriate
         - Preserve successful methodologies and processes
         - Maintain similar depth of technical detail
      
      3. Content Adaptation:
         - Paraphrase extensively while maintaining key concepts
         - Restructure content to fit current context while preserving detail
         - Combine insights from multiple references when relevant
         - Maintain comprehensive coverage of important points
         - Ensure all key elements from references are represented
      
      4. Quality Standards:
         - Match or exceed reference material detail level
         - Maintain consistent professional tone throughout
         - Include specific examples and metrics
         - Provide thorough methodology explanations
         - Ensure comprehensive coverage of processes`,
      },
      {
        role: "system",
        content: `Reference Materials: ${JSON.stringify(vectorSearchResults)}`,
      },
      {
        role: "system",
        content: `Response Requirements:
      1. Structure and Format:
         - Use clear section breaks for readability
         - Implement proper markdown formatting
         - Include detailed bullet points where appropriate
         - Maintain logical flow between sections
         - Use emphasis for key points
      
      2. Content Depth:
         - Provide comprehensive process explanations
         - Include detailed methodology descriptions
         - Maintain thorough coverage of approaches
         - Incorporate specific examples and metrics
         - Detail implementation steps thoroughly
      
      3. Reference Integration:
         - Thoroughly incorporate insights from all references
         - Maintain similar depth and detail level
         - Preserve successful approaches and methodologies
         - Include relevant statistics and metrics
         - Combine complementary elements effectively
      
      4. Company Name Handling:
         - Replace all company-specific names with ${CLIENT_COMPANY}
         - Ensure grammatical correctness in replacements
         - Maintain consistent templating throughout
         - Preserve original context and meaning`,
      },
    ];

    const userMessage: CoreMessage = {
      role: "user",
      content: `Requirement: ${prompt}
      
    Please generate a comprehensive response that:
    1. Matches the depth and detail of reference materials (700+ words per reference)
    2. Thoroughly incorporates approaches from all references
    3. Replaces company names with ${CLIENT_COMPANY}
    4. Maintains professional tone and technical detail
    5. Provides comprehensive coverage of methodologies and processes`,
    };

    // generate text based on the similarity
    const result = await appAI.createCompletion([...coreMessages, userMessage]);

    return result.toDataStreamResponse();
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
