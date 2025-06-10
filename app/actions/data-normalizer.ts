"use server";

import { z } from "zod";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

const SYSTEM_PROMPT = `You are an intelligent AI agent that normalizes noisy product data scraped from eCommerce websites like Lazada.

You will receive a raw block of scraped product content which may include:
- Messy titles
- Mixed casing
- Pricing info with currency symbols
- Non-product text like "voucher", "sold", location tags (e.g. "China")
- HTML elements or markdown image links

Your goal is to extract and clean only the essential structured data: **title**, **price**, and **URL**.

---

## TASK RULES:

1. **title**: Extract the clean, readable product name.
   - Remove unnecessary marketing terms (e.g. "professional game book")
   - Remove redundant info like multiple CPU variants unless part of official product title
   - Use proper casing (Title Case preferred)

2. **price**:
   - Extract the numerical value only (no symbols or commas)
   - Convert it to a number (float)
   - Ignore promotional labels like “voucher” or “save %”

3. **url**:
   - Extract the clean product URL (must begin with https)
   - Do not include image links or tracking params

4. **Ignore**:
   - Image markdown or HTML tags
   - Number of sold items
   - Customer rating
   - Voucher info
   - Location like "China"

---

## EXAMPLE INPUT:
[![laptop Gaming laptop TUF/9th  I5-9300H/I7-9750H /AMD Ryzen 7-3750h 120Hz High refresh rate FHD camera +RGB keyboard lighting/professional game book + large design software](https://img.lazcdn.com/g/p/1b31f91678b6b1a4cd08a5b8925cf55d.jpg_200x200q80.avif)](https://www.lazada.com.ph/products/pdp-i2635145170.html)

[laptop Gaming laptop TUF/9th I5-9300H/I7-9750H /AMD Ryzen 7-3750h 120Hz High refresh rate FHD camera +RGB keyboard lighting/professional game book + large design software](https://www.lazada.com.ph/products/pdp-i2635145170.html)

₱29,504.44

Voucher save 41%

378 sold

(118)

China

---

## OUTPUT FORMAT:
Return a JSON object in this structure:

{
  "title": "<Clean Product Title>",
  "price": <Float>,
  "url": "<Clean URL>"
}

---

## EXPECTED OUTPUT FOR EXAMPLE:
{
  "title": "TUF Gaming Laptop with 120Hz Display and RGB Keyboard",
  "price": 29504.44,
  "url": "https://www.lazada.com.ph/products/pdp-i2635145170.html"
}

Only return the JSON object. Do not include explanations or comments.
`;

export async function normalizeData(data: string) {
  const { object } = await generateObject({
    model: google("gemini-2.0-flash"),
    output: "array",
    schema: z.object({
      title: z.string(),
      price: z.string(),
      url: z.string().url(),
    }),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: data,
      },
    ],
  });

  return object;
}
