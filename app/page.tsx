import * as React from "react";
import Check from "@/registry/new-york/icons/check/check";
import ArrowRight from "@/registry/new-york/icons/arrow-right/arrow-right";
import X from "@/registry/new-york/icons/x/x";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <Check />
      <ArrowRight />
      <X />
    </div>
  );
}
