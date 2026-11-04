"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  onSwipe: (offsetX: number) => void;
};

export function PhoneFrame({ children, onSwipe }: PhoneFrameProps) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => onSwipe(info.offset.x)}
      className="relative z-10 w-[min(72vw,290px)] cursor-grab rounded-[2.5rem] border-[7px] border-foreground/90 bg-foreground p-1.5 shadow-2xl shadow-primary/20 active:cursor-grabbing"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-card">
        <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
        <div className="min-h-[480px] px-4 pb-5 pt-9">{children}</div>
      </div>
    </motion.div>
  );
}