"use client";

import { useScrapedDataStore } from "@/providers/scraped-data-store-provider";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { BarChart3, Loader2 } from "lucide-react";

export const MarketData = () => {
  const { data, isLoading } = useScrapedDataStore((state) => state);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-blue-600" />
        <p className="font-medium text-slate-600">Scraping market data...</p>
        <p className="mt-1 text-sm text-slate-500">
          This may take a few moments
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <BarChart3 className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-slate-900">No Data Yet</h3>
        <p className="mx-auto max-w-sm text-slate-600">
          Start by entering a product name above to see comparative market
          analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-slate-600">
            {data.length} products found
          </span>
        </div>
      </div>
      <div className="overflow-hidden border-slate-200">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};
