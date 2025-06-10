"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateURL } from "@/app/actions/generate-url";
import { useURLStore } from "@/providers/url-store-provider";
import { scrapeProduct } from "@/app/actions/scraper";
import { normalizeData } from "@/app/actions/data-normalizer";

export const UserInput = () => {
  const { addData } = useURLStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    if (productName.trim() === "") {
      toast.error("Please enter a product name");
      return;
    }

    startTransition(async () => {
      const urls = await generateURL(productName);

      addData(urls);

      const scrapedData = await Promise.all(
        urls.map(async (url) => scrapeProduct(url.url, url.marketplace)),
      );

      const normalizedData = await Promise.all(
        scrapedData.map(async (data) => normalizeData(data ?? "")),
      );

      console.log(normalizedData);

      toast.success("URLs generated successfully");
    });
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter product name..."
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        disabled={isPending}
      />
      <Button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Generating..." : "Submit"}
      </Button>
    </div>
  );
};
