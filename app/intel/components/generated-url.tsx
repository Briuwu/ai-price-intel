"use client";

import { useURLStore } from "@/providers/url-store-provider";
import Link from "next/link";

export const GeneratedURL = () => {
  const { data } = useURLStore((state) => state);
  return (
    <div className="rounded-lg p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Generated URLs</h2>

        <ul className="space-y-5">
          {data.map((item) => (
            <li key={item.url}>
              <span className="block font-medium">{item.marketplace}</span>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm"
              >
                {item.url}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
