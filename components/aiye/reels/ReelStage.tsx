"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ReelStageProps {
  children: React.ReactNode;
  className?: string;
  showGuides?: boolean;
}

export const ReelStage = ({ children, className, showGuides = false }: ReelStageProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Logic to fit 1080x1920 into the current viewport with some padding
      const padding = 40;
      const availableHeight = window.innerHeight - padding;
      const availableWidth = window.innerWidth - padding;
      
      const targetRatio = 9 / 16;
      const componentHeight = 1920;
      const componentWidth = 1080;

      // Calculate max scale that fits
      const scaleHeight = availableHeight / componentHeight;
      const scaleWidth = availableWidth / componentWidth;
      
      setScale(Math.min(scaleHeight, scaleWidth, 1)); // Max scale 1 (don't upscale on HUGE screens)
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-neutral-900 overflow-hidden">
      <div 
        className="relative shadow-2xl bg-black overflow-hidden"
        style={{
          width: 1080,
          height: 1920,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div className={cn("w-full h-full relative", className)}>
          {children}
        </div>

        {/* Optional Safe Area Guides for Instagram */}
        {showGuides && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {/* Instagram UI Safe Zones (approximate) */}
            <div className="absolute top-[120px] left-0 right-0 h-[100px] border-b border-red-500/30 bg-red-500/10 text-red-500 text-3xl font-bold flex items-center justify-center">Stories UI Top</div>
            <div className="absolute bottom-[250px] left-0 right-0 h-[250px] border-t border-red-500/30 bg-red-500/10 text-red-500 text-3xl font-bold flex items-center justify-center">Stories UI Bottom</div>
            <div className="absolute top-0 bottom-0 right-[40px] w-[1px] bg-blue-500/50"></div>
            <div className="absolute top-0 bottom-0 left-[40px] w-[1px] bg-blue-500/50"></div>
          </div>
        )}
      </div>
    </div>
  );
};
