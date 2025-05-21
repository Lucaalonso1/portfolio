"use client";

import React from "react";
import { StickyScrollSections } from "./sticky-scroll-sections";

export const StickyScrollSectionsExample = () => {
  const sections = [
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Sección 1</h2>
        </div>
      ),
    },
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Sección 2</h2>
        </div>
      ),
    },
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Sección 3</h2>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-[300vh]">
      <StickyScrollSections sections={sections} />
    </div>
  );
}; 