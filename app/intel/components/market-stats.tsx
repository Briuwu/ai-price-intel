"use client";

import { calculateMarketStats } from "@/lib/calculate-market-stats";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Users,
  Activity,
  DollarSign,
  Minus,
} from "lucide-react";
import { useScrapedDataStore } from "@/providers/scraped-data-store-provider";

export const MarketStats = () => {
  const { data } = useScrapedDataStore((state) => state);
  const stats = calculateMarketStats(data);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const statItems = [
    {
      label: "Average Price",
      value: formatPrice(stats.average_price),
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Mean price across all sources",
    },
    {
      label: "Median Price",
      value: formatPrice(stats.median_price),
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Middle value in price range",
    },
    {
      label: "Lowest Price",
      value: formatPrice(stats.min_price),
      icon: TrendingDown,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Best deal available",
    },
    {
      label: "Highest Price",
      value: formatPrice(stats.max_price),
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Premium pricing",
    },
    {
      label: "Price Range",
      value: formatPrice(stats.max_price - stats.min_price),
      icon: Minus,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Difference between min and max",
    },
    {
      label: "Standard Deviation",
      value: formatPrice(stats.std_dev),
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Price volatility measure",
    },
    {
      label: "Most Common Price",
      value: formatPrice(stats.mode_price),
      icon: DollarSign,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Frequently occurring price",
    },
    {
      label: "Sources Found",
      value: stats.competitor_count.toString(),
      icon: Users,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      description: "Number of price sources",
    },
  ];

  if (stats.competitor_count === 0) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <BarChart3 className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500">
              No pricing data available for analysis
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            Market Statistics
          </h3>
          <p className="text-sm text-slate-600">
            Comprehensive pricing analysis across all sources
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group rounded-xl border border-slate-200 p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2 ${item.bgColor} transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-medium tracking-wider text-slate-600 uppercase">
                      {item.label}
                    </p>
                    <p className="mb-1 text-lg font-bold text-slate-900">
                      {item.value}
                    </p>
                    <p className="text-xs leading-tight text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Insights */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <h4 className="mb-2 text-sm font-medium text-slate-900">
            Quick Insights
          </h4>
          <div className="grid grid-cols-1 gap-4 text-xs text-slate-600 md:grid-cols-2">
            <div>
              <span className="font-medium">Price Spread:</span>{" "}
              {(
                ((stats.max_price - stats.min_price) / stats.average_price) *
                100
              ).toFixed(1)}
              % variation
            </div>
            <div>
              <span className="font-medium">Best Savings:</span>{" "}
              {formatPrice(stats.max_price - stats.min_price)} potential savings
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
