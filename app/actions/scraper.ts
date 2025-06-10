"use server";
// Install with npm install @mendable/firecrawl-js
import FireCrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";

export async function scrapeProduct(url: string, marketplace: string) {
  const app = new FireCrawlApp({
    apiKey: process.env.FIRECRAWL_API_KEY,
  });

  if (marketplace === "Lazada") {
    const scrapeResult = (await app.scrapeUrl(url, {
      formats: ["markdown"],
      onlyMainContent: true,
      includeTags: [".Bm3ON"],
    })) as ScrapeResponse;

    if (scrapeResult.error) {
      throw new Error(scrapeResult.error);
    } else {
      return scrapeResult.markdown;
    }
  }
}
