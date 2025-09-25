"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/nuestro-metodo", label: "Nuestro Método" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => pathname.startsWith(link.href));
    const activeItem = itemRefs.current[activeIndex];
    
    if (activeItem && navRef.current) {
      const navBounds = navRef.current.getBoundingClientRect();
      const itemBounds = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        width: itemBounds.width,
        left: itemBounds.left - navBounds.left,
        opacity: 1,
      });
    } else {
       setIndicatorStyle({
        width: 0,
        left: 0,
        opacity: 0,
      });
    }
  }, [pathname]);

  const getIsActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 hidden md:flex",
        scrolled ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl" : ""
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>

        <nav ref={navRef} className="flex items-center gap-8 relative">
          {navLinks.map((item, index) => {
            const isActive = getIsActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={el => (itemRefs.current[index] = el)}
                className={cn(
                  "relative z-10 font-medium transition-colors duration-300 py-2 text-sm",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            )
          })}
           <div 
            className="absolute bottom-5 h-0.5 bg-primary transition-all duration-300 ease-in-out"
            style={indicatorStyle}
          />
        </nav>

        <Button asChild>
          <a href="https://wa.me/56966960729" target="_blank" rel="noopener noreferrer">Cotiza tu Proyecto</a>
        </Button>
      </div>
    </header>
  );
}
