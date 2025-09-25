"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressStepsProps = {
  steps: string[];
  currentStep: number;
  className?: string;
};

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  const [progress, setProgress] = useState(0);

  const totalSpaces = steps.length - 1;
  const completedSpaces = Math.max(0, currentStep - 1);
  const targetProgress = totalSpaces > 0 ? (completedSpaces / totalSpaces) * 100 : 0;

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setProgress(targetProgress);
    });
    return () => cancelAnimationFrame(animation);
  }, [targetProgress]);

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile view: Vertical */}
      <div className="space-y-6 md:hidden">
        {steps.map((step, index) => {
          const isActive = index < currentStep;
          return (
            <div key={index} className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 bg-secondary font-bold text-muted-foreground transition-all duration-500",
                  isActive ? "border-primary bg-primary text-primary-foreground" : "border-border"
                )}
              >
                 <div className="relative h-full w-full flex items-center justify-center">
                    <span className={cn("transition-opacity duration-300", isActive ? "opacity-0" : "opacity-100")}>
                      {index + 1}
                    </span>
                    {isActive && (
                       <Check className="absolute h-6 w-6 transform transition-all duration-500 ease-out scale-0 opacity-0 delay-200" style={isActive ? {transform: 'scale(1)', opacity: 1} : {}} />
                    )}
                  </div>
              </div>
              <span className={cn("font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop view: Horizontal */}
      <div className="hidden md:block space-y-4">
        <div className="relative">
          <Progress value={progress} className="absolute left-0 top-1/2 -translate-y-1/2 h-1 transition-all duration-1000 ease-out" />
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index < currentStep;
              return (
                <div key={index} className="flex flex-col items-center gap-2 z-10">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-secondary font-bold text-muted-foreground transition-all duration-500",
                      isActive ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    )}
                  >
                    <div className="relative h-full w-full flex items-center justify-center">
                      <span className={cn("transition-opacity duration-300", isActive ? "opacity-0" : "opacity-100")}>
                        {index + 1}
                      </span>
                      {isActive && (
                         <Check className="absolute h-5 w-5 transform transition-all duration-500 ease-out scale-0 opacity-0 delay-200" style={isActive ? {transform: 'scale(1)', opacity: 1} : {}} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground -mx-4">
          {steps.map((step, index) => {
            const isActive = index < currentStep;
            return (
              <div
                key={index}
                className={cn(
                  "w-full text-center font-medium transition-colors duration-500",
                  isActive ? "text-primary" : ""
                )}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}