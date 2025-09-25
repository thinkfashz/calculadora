"use client";

import { Home, MessageSquare, Wrench, Package, Gem, Beaker, Calculator } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/nuestro-metodo", label: "Método", icon: Beaker },
  { href: "/servicios", label: "Servicios", icon: Wrench },
  { href: "/proyectos", label: "Proyectos", icon: Package },
  { href: "/contacto", label: "Contacto", icon: MessageSquare },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-sm md:hidden">
            <div className="flex h-20 items-stretch justify-around">
                {navItems.map((item) => {
                    const isActive = (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-1 flex-col items-center justify-center gap-1.5 text-xs font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                            )}
                        >
                            <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}
