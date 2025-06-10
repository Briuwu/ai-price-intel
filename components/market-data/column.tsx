"use client";

import type { ScrapedDataState } from "@/stores/scraped-data-store";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "./data-column-header";

export const columns: ColumnDef<ScrapedDataState["data"][number]>[] = [
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <div className="max-w-xs font-medium text-slate-900">{title}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const formattedPrice = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
      return (
        <div className="font-semibold text-green-700">{formattedPrice}</div>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Source",
    cell: ({ row }) => {
      const url = row.getValue("url") as string;
      return (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-800"
        >
          <span className="text-sm">View</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      );
    },
  },
  {
    accessorKey: "similarity",
    header: "Similarity",
    cell: ({ row }) => {
      const similarity = row.getValue("similarity") as number;
      return (
        <div className="text-sm text-slate-500">
          {similarity ? `${(similarity * 100).toFixed(2)}%` : "N/A"}
        </div>
      );
    },
  },
];
