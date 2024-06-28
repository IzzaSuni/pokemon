import { useEffect, useState } from "react";

export const breakpoint = { s: 1024, m: 1280, l: 1400 };

export default function () {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint.m);

  useEffect(() => {
    function watchIsDesktop() {
      setIsDesktop(window.innerWidth >= breakpoint.m);
    }

    window.addEventListener("resize", watchIsDesktop);
    return () => window.removeEventListener("resize", watchIsDesktop);
  }, []);

  return isDesktop;
}
