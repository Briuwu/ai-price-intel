"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateURL } from "@/app/actions/generate-url";
import { useURLStore } from "@/providers/url-store-provider";

export const UserInput = () => {
  const { addData } = useURLStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    if (productName.trim() === "") {
      toast.error("Please enter a product name");
      return;
    }

    startTransition(async () => {
      const urls = await generateURL(productName);

      addData(urls);

      toast.success("URLs generated successfully");
    });
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter product name..."
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Generating..." : "Submit"}
      </Button>
    </div>
  );
};
