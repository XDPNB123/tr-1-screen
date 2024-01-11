import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface MagicCardProps extends HTMLAttributes<HTMLDivElement> {}

const MagicCard = forwardRef<HTMLDivElement, MagicCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-center items-center bg-slate-900  rounded-xl relative before:content-[''] before:w-[104%] before:h-[104%] before:rounded-2xl before:bg-[linear-gradient(var(--card-bg-angle),#5ddcff,#3c67e3_43%,#4e00c2)] before:animate-[card-bg-animation_4s_linear_infinite] before:absolute before:z-[-1]  after:absolute after:content-[''] after:top-[5vh] after:z-[-1] after:w-full after:h-full after:blur-3xl after:bg-[linear-gradient(var(--card-bg-angle),#5ddcff,#3c67e3_43%,#4e00c2)] after:animate-[card-bg-animation_4s_linear_infinite] flex-wrap",
          className
        )}
        {...props}
      />
    );
  }
);

MagicCard.displayName = "MagicCard";

export { MagicCard };
