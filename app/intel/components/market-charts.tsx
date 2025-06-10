"use client";

import type { ScrapedDataState } from "@/stores/scraped-data-store";
import { calculateMarketStats } from "@/lib/calculate-market-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

interface MarketChartsProps {
  data: ScrapedDataState["data"];
}

export const MarketCharts = ({ data }: MarketChartsProps) => {
  const stats = calculateMarketStats(data);

  // Prepare data for individual product comparison
  const productData = data
    .filter(
      (product) => typeof product.price === "number" && !isNaN(product.price),
    )
    .map((product, index) => ({
      name: product.title?.slice(0, 20) + "..." || `Product ${index + 1}`,
      price: typeof product.price === "number" ? product.price : 0,
      fill: index % 2 === 0 ? "#3b82f6" : "#10b981",
    }))
    .sort((a, b) => a.price - b.price);

  // Prepare data for price distribution histogram
  const prices = productData.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const binCount = Math.min(10, Math.max(5, Math.floor(prices.length / 3)));
  const binSize = (maxPrice - minPrice) / binCount || 1;
  const bins = Array.from({ length: binCount }, (_, i) => ({
    binStart: minPrice + i * binSize,
    binEnd: minPrice + (i + 1) * binSize,
    count: 0,
  }));
  prices.forEach((price) => {
    let binIndex = Math.floor((price - minPrice) / binSize);
    if (binIndex >= binCount) binIndex = binCount - 1;
    bins[binIndex].count++;
  });
  const histogramData = bins.map((bin) => ({
    range: `₱${Math.round(bin.binStart)}–₱${Math.round(bin.binEnd)}`,
    count: bin.count,
  }));

  const chartConfig = {
    count: {
      label: "Products",
      color: "hsl(var(--chart-1))",
    },
    price: {
      label: "Price",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  if (stats.competitor_count === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-slate-200">
            <CardContent className="p-6">
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <BarChart3 className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">
                  No data available for visualization
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Charts Grid */}

      {/* Product Comparison Chart - Full Width */}
      {productData.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">
                Product Price Comparison
              </CardTitle>
            </div>
            <CardDescription>
              Individual product prices sorted from lowest to highest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={productData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <defs>
                    <linearGradient
                      id="priceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₱${value}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name, props) => [
                          `₱${value}`,
                          props.payload.name,
                        ]}
                      />
                    }
                    cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#1d4ed8"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#1d4ed8", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Price Distribution Histogram */}
      {histogramData.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Price Distribution</CardTitle>
            </div>
            <CardDescription>
              Number of products in each price range (market price clusters)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={histogramData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    label={{
                      value: "# Products",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 12,
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [value, "# Products"]}
                      />
                    }
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Price Range Visualization */}
      <Card className="col-span-full border-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Price Range Analysis</CardTitle>
          </div>
          <CardDescription>
            Visual representation of price spread and volatility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Price Range Bar */}
            <div className="relative">
              <div className="mb-2 flex justify-between text-sm text-slate-600">
                <span>Min: ₱{stats.min_price}</span>
                <span>Avg: ₱{stats.average_price}</span>
                <span>Max: ₱{stats.max_price}</span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                  style={{ width: "60%" }}
                />
                <div
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500"
                  style={{ left: "60%", width: "40%" }}
                />
                {/* Average marker */}
                <div
                  className="absolute top-0 h-full w-1 bg-white shadow-lg"
                  style={{
                    left: `${((stats.average_price - stats.min_price) / (stats.max_price - stats.min_price)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <div className="text-lg font-bold text-green-700">
                  ₱{stats.min_price}
                </div>
                <div className="text-xs text-green-600">Lowest Price</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-lg font-bold text-blue-700">
                  ₱{stats.average_price}
                </div>
                <div className="text-xs text-blue-600">Average Price</div>
              </div>
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <div className="text-lg font-bold text-red-700">
                  ₱{stats.max_price}
                </div>
                <div className="text-xs text-red-600">Highest Price</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-3 text-center">
                <div className="text-lg font-bold text-orange-700">
                  ₱{stats.std_dev}
                </div>
                <div className="text-xs text-orange-600">Std Deviation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
