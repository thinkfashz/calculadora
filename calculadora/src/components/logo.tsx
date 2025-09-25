"use client";

import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center font-body", className)}>
      <span className="text-4xl font-light text-foreground sm:text-5xl">
        Casas
      </span>
      <span className="ml-2 text-4xl font-bold text-primary sm:text-5xl">
        Fabrick
      </span>
    </div>
  );
}
