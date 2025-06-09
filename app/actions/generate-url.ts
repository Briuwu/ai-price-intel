"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `You are an intelligent AI agent that generates product search URLs for eCommerce marketplaces. Your job is to take a product name and return valid search URLs for both Lazada and Shopee, two popular Southeast Asian marketplaces.

## SUPPORTED MARKETPLACES:
- Lazada
- Shopee

## GOAL:
Generate a search result URL for each supported marketplace using the product name.

## RULES:
1. You MUST return two results: one for Lazada and one for Shopee.
2. The product name should be:
   - Cleaned: Remove special characters (quotes, parentheses, etc.)
   - Spaces should be replaced with \`%20\`
3. Use the correct base domain:
   - Lazada: https://www.lazada.com.ph
   - Shopee: https://shopee.ph
4. Use the correct query pattern:
   - Lazada: \`https://www.lazada.com.ph/catalog/?q={query}\`
   - Shopee: \`https://shopee.ph/search?keyword={query}\`

## OUTPUT FORMAT:
Return an array of exactly two objects, like this:

[
  {
    "marketplace": "Lazada",
    "url": "https://www.lazada.com.ph/catalog/?q=Logitech%20MX%20Master%203"
  },
  {
    "marketplace": "Shopee",
    "url": "https://shopee.ph/search?keyword=Logitech%20MX%20Master%203"
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
