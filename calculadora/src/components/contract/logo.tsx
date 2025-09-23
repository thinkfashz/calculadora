import { cn } from "@/lib/utils";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 250 50"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g className="group">
        <path d="M 10 40 L 10 15 L 27.5 5 L 45 15 L 45 40" strokeWidth="3" className="stroke-primary group-hover:stroke-accent transition-colors" fill="none" />
        <rect x="22" y="28" width="11" height="12" className="fill-primary group-hover:fill-accent transition-colors" />
      </g>
      <text
        x="55"
        y="32"
        fontFamily="Inter, sans-serif"
        fontSize="24"
        fontWeight="bold"
        className="fill-foreground"
      >
        Casas Fabrick
      </text>
    </svg>
  );
}
