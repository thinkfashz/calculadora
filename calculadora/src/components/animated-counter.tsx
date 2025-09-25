"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";

type AnimatedCounterProps = {
  target: number;
  duration?: number;
  className?: string;
  startOnVisible?: boolean;
  children?: React.ReactNode;
  as?: React.ElementType;
};

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function AnimatedCounter({
  target,
  duration = 2000,
  className,
  startOnVisible = true,
  children,
  as: Tag = 'span',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  useEffect(() => {
    if (!startOnVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easedPercentage = easeOutExpo(percentage);
      const newCount = Math.floor(easedPercentage * target);

      setCount(newCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, isVisible]);

  if (children) {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<any>, { ref: ref });
      }
      return child;
    });
  }

  return (
    <Tag ref={ref} className={className}>
      {count.toLocaleString("de-DE")}
    </Tag>
  );
}
