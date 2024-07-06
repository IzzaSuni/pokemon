import { useEffect, useState } from "react";

export const breakpoint = { xs: 300, s: 500, m: 1080, l: 1280 };

export default function useBreakPoint() {
  const isDesktop = window.innerWidth >= breakpoint.l;
  const isTablet = window.innerWidth >= breakpoint.m;

  const [breakPoint, setBreakPoint] = useState({
    isDesktop,
    isTablet,
  });

  useEffect(() => {
    function watchIsDesktop() {
      setBreakPoint({
        isDesktop: window.innerWidth >= breakpoint.l,
        isTablet: window.innerWidth >= breakpoint.m,
      });
    }

    window.addEventListener("resize", watchIsDesktop);
    return () => window.removeEventListener("resize", watchIsDesktop);
  }, []);

  return breakPoint;
}
