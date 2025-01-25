import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full">
      <MacbookScroll
        title={
          <span className="text-white">
            Hi, I'm Luca Alonso <br /> 
            Software Engineer
          </span>
        }
        src={`/code-screenshot.png`}
        showGradient={false}
      />
    </div>
  );
}
