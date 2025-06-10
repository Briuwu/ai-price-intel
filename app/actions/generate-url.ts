"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `You are an intelligent AI agent that generates product search URLs for eCommerce marketplaces. Your job is to take a product name and return valid search URLs for Lazada, a popular Southeast Asian marketplace.

## SUPPORTED MARKETPLACES:  
- Lazada

## GOAL:
Generate a search result URL for each supported marketplace using the product name.

## RULES:
1. You MUST return two results: one for Lazada.
2. The product name should be:
   - Cleaned: Remove special characters (quotes, parentheses, etc.)
   - Spaces should be replaced with \`%20\`
3. Use the correct base domain:
   - Lazada: https://www.lazada.com.ph
4. Use the correct query pattern:
   - Lazada: \`https://www.lazada.com.ph/catalog/?q={query}\`

## OUTPUT FORMAT:
Return an array of exactly one object, like this:

[
  {
    "marketplace": "Lazada",
    "url": "https://www.lazada.com.ph/catalog/?q=Logitech%20MX%20Master%203"
  }
]

Only return the array. Do not include explanations or extra text.
`;

export async function generateURL(productName: string) {
  const { object } = await generateObject({
    model: google("gemini-2.0-flash"),
    output: "array",
    schema: z.object({
      marketplace: z.string(),
      url: z.string(),
    }),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Product: ${productName}`,
      },
    ],
  });

  return object;
}
