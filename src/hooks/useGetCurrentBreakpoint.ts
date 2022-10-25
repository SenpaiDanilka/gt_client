import {useEffect, useMemo, useState} from "react";

const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export default function useGetCurrentBreakpoint() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const currentBreakpoint = useMemo(() =>
    Object.keys(TAILWIND_BREAKPOINTS).find((key) =>
      TAILWIND_BREAKPOINTS[key as keyof typeof TAILWIND_BREAKPOINTS] > dimensions.width
    ), [dimensions]);

  const isMobileBreakpoint = currentBreakpoint === "md" || currentBreakpoint === "sm";

  return { currentBreakpoint, dimensions, isMobileBreakpoint };
}