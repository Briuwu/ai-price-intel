import { UserInput } from "./components/user-input";
import { GeneratedURL } from "./components/generated-url";
import { MarketData } from "@/components/market-data";
import { MarketChartsWrapper } from "./components/market-charts-wrapper";
import { MarketStats } from "./components/market-stats";

export default async function IntelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium tracking-wider text-slate-600 uppercase">
              Market Intelligence
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-slate-900">
            Product Research Hub
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600">
            Analyze products across multiple marketplaces with intelligent data
            aggregation
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mx-auto max-w-2xl">
              <UserInput />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Generated URLs - Left Column */}
          <div className="lg:col-span-1">
            <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <GeneratedURL />
            </div>
          </div>

          {/* Market Data - Right Columns */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  Market Analysis
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Comparative data from multiple sources
                </p>
              </div>
              <MarketData />
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="my-8">
          <MarketStats />
        </div>

        {/* Market Charts */}
        <div className="mb-8">
          <MarketChartsWrapper />
        </div>
      </div>
    </div>
  );
}
