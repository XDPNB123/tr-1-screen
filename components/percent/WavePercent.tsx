import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useRef } from "react";

interface WavePercentProps {
  percent: number;
  className?: string;
}

const WavePercent = forwardRef<any, WavePercentProps>(
  ({ percent, className }, ref) => {
    const waterRef = useRef<any>(null);

    useEffect(() => {
      waterRef.current.style.transform = `translate(0,${100 - percent}%)`;
    }, [percent]);
    return (
      <>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
          </symbol>
        </svg>

        <div
          className={cn(
            "w-[9vw] h-[9vw] absolute rounded-full overflow-hidden  border-4 border-blue-400",
            className
          )}
        >
          <div className="absolute left-0 top-0 z-[3] w-full h-full flex items-center justify-center text-white text-3xl">
            <div className="percentNum">{percent}%</div>
          </div>
          <div
            ref={waterRef}
            className="absolute left-0 top-0 z-[2] w-full h-full translate-x-0 translate-y-full bg-[#4D6DE3]  transition-all duration-300"
          >
            <svg
              viewBox="0 0 560 20"
              className="w-[200%] absolute bottom-full right-0 fill-[#C7EEFF] animate-[wave-back_1.4s_infinite_linear]"
            >
              <use xlinkHref="#wave"></use>
            </svg>
            <svg
              viewBox="0 0 560 20"
              className="w-[200%] absolute bottom-full left-0 fill-[#4D6DE3] mb-[-1px] animate-[wave-front_.7s_infinite_linear]"
            >
              <use xlinkHref="#wave"></use>
            </svg>
          </div>
        </div>
      </>
    );
  }
);

WavePercent.displayName = "WavePercent";

export { WavePercent };
