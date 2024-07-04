import { useEffect, useState } from "react";

export const breakpoint = { s: 1024, m: 1280, l: 1400 };

export default function useBreakPoint() {
  const isDesktop = window.innerWidth >= breakpoint.m;
  const isTablet = window.innerWidth >= breakpoint.s && !isDesktop;

  const [breakPoint, setBreakPoint] = useState({
    isDesktop,
    isTablet,
  });

  useEffect(() => {
    function watchIsDesktop() {
      setBreakPoint({
        isDesktop: window.innerWidth >= breakpoint.m,
        isTablet: window.innerWidth >= breakpoint.s,
      });
    }

    window.addEventListener("resize", watchIsDesktop);
    return () => window.removeEventListener("resize", watchIsDesktop);
  }, []);

  return breakPoint;
}
