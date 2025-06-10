import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Search,
  Bot,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  Globe,
  Target,
  Activity,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                PriceIntel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/intel">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Try Demo
                </Button>
              </Link>
              <Link href="/intel">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              AI-Powered Pricing Intelligence
            </span>
          </div>

          <h1 className="mb-6 text-5xl leading-tight font-bold text-slate-900 md:text-7xl">
            Stay Ahead with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart Pricing
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-600">
            Track competitor prices across e-commerce platforms, analyze market
            trends, and get AI-powered pricing recommendations to maximize your
            profits automatically.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/intel">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg hover:from-blue-700 hover:to-purple-700"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900">10K+</div>
              <div className="text-sm text-slate-600">Products Analyzed</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900">95%</div>
              <div className="text-sm text-slate-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Everything You Need for Competitive Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Comprehensive tools to analyze, understand, and optimize your
              pricing strategy
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            <Card className="group border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 transition-colors group-hover:bg-blue-100">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  AI URL Generator
                </h3>
                <p className="mb-4 text-slate-600">
                  Smart product search URLs for e-commerce platforms with
                  intelligent keyword optimization.
                </p>
                <Badge variant="secondary" className="text-xs">
                  Automated
                </Badge>
              </CardContent>
            </Card>

            <Card className="group border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Web Scraper
                </h3>
                <p className="mb-4 text-slate-600">
                  Fetch competitor product data in real-time from multiple
                  e-commerce platforms.
                </p>
                <Badge variant="secondary" className="text-xs">
                  Real-time
                </Badge>
              </CardContent>
            </Card>

            <Card className="group border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 transition-colors group-hover:bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Data Normalizer
                </h3>
                <p className="mb-4 text-slate-600">
                  Clean and standardize messy product listings for accurate
                  analysis.
                </p>
                <Badge variant="secondary" className="text-xs">
                  AI-Powered
                </Badge>
              </CardContent>
            </Card>

            <Card className="group border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 transition-colors group-hover:bg-orange-100">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Market Analytics
                </h3>
                <p className="mb-4 text-slate-600">
                  Compute median, average, mode, and statistical insights from
                  market data.
                </p>
                <Badge variant="secondary" className="text-xs">
                  Advanced
                </Badge>
              </CardContent>
            </Card>

            <Card className="group border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 transition-colors group-hover:bg-red-100">
                  <Bot className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  AI Pricing Recommender
                </h3>
                <p className="mb-4 text-slate-600">
                  Get optimal pricing suggestions based on your business goals
                  and market conditions.
                </p>
                <Badge variant="secondary" className="text-xs">
                  Smart AI
                </Badge>
              </CardContent>
            </Card>

            <Card className="group border-dashed border-slate-200 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-slate-100">
                  <Zap className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Dynamic Pricing
                </h3>
                <p className="mb-4 text-slate-600">
                  Automated pricing engine with store integrations for real-time
                  price updates.
                </p>
                <Badge variant="outline" className="text-xs">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              How PriceIntel Works
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Simple, automated process to get competitive pricing insights
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Enter Product
              </h3>
              <p className="text-sm text-slate-600">
                Simply enter your product name or description
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                AI Analysis
              </h3>
              <p className="text-sm text-slate-600">
                Our AI scrapes and analyzes competitor data
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Get Insights
              </h3>
              <p className="text-sm text-slate-600">
                View detailed market statistics and trends
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Optimize Pricing
              </h3>
              <p className="text-sm text-slate-600">
                Implement AI-recommended pricing strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-slate-600">
              Powered by cutting-edge AI and robust infrastructure
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                <Activity className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="mb-1 font-semibold text-slate-900">Next.js</h4>
              <p className="text-sm text-slate-600">Frontend</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                <Target className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="mb-1 font-semibold text-slate-900">TypeScript</h4>
              <p className="text-sm text-slate-600">Language</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                <Brain className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="mb-1 font-semibold text-slate-900">Gemini AI</h4>
              <p className="text-sm text-slate-600">AI Services</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                <Globe className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="mb-1 font-semibold text-slate-900">Firecrawl</h4>
              <p className="text-sm text-slate-600">Scraping</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to Optimize Your Pricing?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Join thousands of sellers who are already using PriceIntel to stay
            competitive and maximize profits.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/intel">
              <Button
                size="lg"
                className="bg-white px-8 py-6 text-lg text-blue-600 hover:bg-blue-50"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PriceIntel</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>© 2024 PriceIntel. All rights reserved.</span>
              <Link href="#" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
