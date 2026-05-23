import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 bg-clip-text text-center text-4xl font-display font-medium tracking-tight text-transparent md:text-6xl italic"
      >
        С Днем Рождения! <br /> Сияй ярко ✨
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[450px] md:min-h-[550px] flex-col items-center justify-center overflow-hidden bg-[#FDFBF7] w-full rounded-3xl z-0 border border-rose-100/50 my-10 shadow-inner",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-110 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 0.8, width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-44 overflow-visible w-[24rem] bg-gradient-conic from-rose-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] opacity-80"
        >
          <div className="absolute w-[100%] left-0 bg-[#FDFBF7] h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-32 h-[100%] left-0 bg-[#FDFBF7] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 0.8, width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-44 w-[24rem] bg-gradient-conic from-transparent via-transparent to-rose-400 text-white [--conic-position:from_290deg_at_center_top] opacity-80"
        >
          <div className="absolute w-32 h-[100%] right-0 bg-[#FDFBF7] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-[#FDFBF7] h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        <div className="absolute top-1/2 h-36 w-full translate-y-8 scale-x-120 bg-[#FDFBF7] blur-xl"></div>
        <div className="absolute top-1/2 z-50 h-36 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-28 w-[20rem] -translate-y-1/2 rounded-full bg-rose-300 opacity-40 blur-2xl"></div>
        
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "12rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-28 w-48 -translate-y-[4.5rem] rounded-full bg-rose-200 blur-xl"
        ></motion.div>
        
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[24rem] -translate-y-[5.5rem] bg-rose-300"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-36 w-full -translate-y-[10rem] bg-[#FDFBF7]"></div>
      </div>

      <div className="relative z-50 flex -translate-y-48 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
