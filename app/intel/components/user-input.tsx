"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateURL } from "@/app/actions/generate-url";
import { useURLStore } from "@/providers/url-store-provider";
import { scrapeProduct } from "@/app/actions/scraper";
import {
  findSimilarProducts,
  normalizeData,
} from "@/app/actions/data-normalizer";
import { useScrapedDataStore } from "@/providers/scraped-data-store-provider";
import { Search, Sparkles } from "lucide-react";

export const UserInput = () => {
  const { addData, resetData: resetURLData } = useURLStore((state) => state);
  const {
    addData: addScrapedData,
    setIsLoading: setScrapedLoader,
    resetData: resetScrapedData,
  } = useScrapedDataStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const [productName, setProductName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (productName.trim() === "") {
      toast.error("Please enter a product name");
      return;
    }

    resetURLData();
    resetScrapedData();

    startTransition(async () => {
      try {
        const urls = await generateURL(productName);

        addData(urls);

        toast.success("URLs generated successfully");

        setScrapedLoader(true);
        const scrapedData = await Promise.all(
          urls.map(async (url) => scrapeProduct(url.url, url.marketplace)),
        );

        console.log("scrapedData", scrapedData);
        toast.success("Market data scraped successfully");

        const normalizedData = await normalizeData(
          scrapedData.flat().join("\n"),
        );

        console.log("normalizedData", normalizedData);

        toast.success("Market data normalized successfully");

        const similarProducts = await findSimilarProducts(
          productName,
          normalizedData,
        );

        toast.success("Similar products found successfully");

        addScrapedData(similarProducts);
        setScrapedLoader(false);

        toast.success("Market data added successfully");
      } catch (error) {
        const err =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(err);
        toast.error(err);
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-medium text-slate-900">
          Start Your Research
        </h3>
        <p className="text-sm text-slate-600">
          Enter a product name to analyze across multiple marketplaces
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <Input
          placeholder="e.g., iPhone 15 Pro, MacBook Air, Nike Air Max..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isPending}
          className="rounded-xl border-slate-300 py-6 pr-4 pl-12 text-base focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-6 text-base font-medium shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Analyzing Markets...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Analyze Product
          </div>
        )}
      </Button>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
          <p>{error}</p>
          <Button
            variant="outline"
            onClick={() => {
              setError(null);
              handleSubmit();
            }}
            className="mx-auto mt-2"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
