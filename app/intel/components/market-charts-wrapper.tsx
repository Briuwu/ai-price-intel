"use client";

import { useScrapedDataStore } from "@/providers/scraped-data-store-provider";
import { MarketCharts } from "./market-charts";
import { Loader2 } from "lucide-react";

export const MarketChartsWrapper = () => {
  const { data, isLoading } = useScrapedDataStore((state) => state);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-blue-600" />
        <p className="font-medium text-slate-600">
          Preparing visualizations...
        </p>
      </div>
    );
  }

  return <MarketCharts data={data} />;
};
