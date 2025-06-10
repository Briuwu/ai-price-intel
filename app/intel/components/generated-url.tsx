"use client";

import { useURLStore } from "@/providers/url-store-provider";
import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";

export const GeneratedURL = () => {
  const { data } = useURLStore((state) => state);

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-slate-900">Source URLs</h2>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Globe className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">
            URLs will appear here after analysis
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.url} className="group">
              <div className="rounded-xl border border-slate-200 p-4 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-slate-900">
                        {item.marketplace}
                      </span>
                    </div>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs break-all text-slate-600 transition-colors duration-200 hover:text-blue-600"
                    >
                      {item.url}
                    </Link>
                  </div>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <ExternalLink className="h-4 w-4 text-slate-400 hover:text-blue-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
