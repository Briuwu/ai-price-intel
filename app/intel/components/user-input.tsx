"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const UserInput = () => {
  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    if (productName.trim() === "") {
      toast.error("Please enter a product name");
      return;
    }

    console.log(productName);
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter product name..."
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};
