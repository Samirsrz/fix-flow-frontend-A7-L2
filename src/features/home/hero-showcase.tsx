"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSteps } from "./hero-steps";
import { PhoneFrame } from "./phone-frame";
import { FloatingCard, ShowcaseScreen } from "./showcase-screens";

const STEP_MS = 5000;
const TICK_MS = 50;

const roundButton =
  "flex size-8 shrink-0 items-center justify-center rounded-full border bg-card text-muted-foreground transition hover:bg-accent hover:text-foreground";

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const elapsed = useRef(0);

  const rotateX = useSpring(0, { stiffness: 140, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 140, damping: 18 });

  const paused = userPaused || hoverPaused || Boolean(reduceMotion);
  const step = heroSteps[active];

  const goTo = useCallback((next: number) => {
    setActive((next + heroSteps.length) % heroSteps.length);
    setProgress(0);
    elapsed.current = 0;
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      elapsed.current += TICK_MS;
      if (elapsed.current >= STEP_MS) {
        goTo(active + 1);
        return;
      }
      setProgress((elapsed.current / STEP_MS) * 100);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [active, paused, goTo]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 16);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
<div
      role="region"
      aria-roledescription="carousel"
      aria-label="How FixFlow works"
      className="w-full"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <div
        className="relative mx-auto flex min-h-[540px] max-w-[390px] items-center justify-center [perspective:1200px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div
          aria-hidden="true"
          className="absolute size-64 rounded-full bg-primary/10 blur-3xl"
        />

        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PhoneFrame onSwipe={(x) => Math.abs(x) > 40 && goTo(active + (x < 0 ? 1 : -1))}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 16, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ShowcaseScreen step={step} />
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-0 top-24 z-20 hidden md:block"
          animate={reduceMotion ? undefined : { y: [0, -7, 0], x: [0, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FloatingCard step={step} variant="primary" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-24 right-0 z-20"
          animate={reduceMotion ? undefined : { y: [0, 6, 0], x: [0, -3, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <FloatingCard step={step} variant="secondary" />
        </motion.div>
      </div>

      <div
        className="mx-auto mt-2 max-w-[480px] text-center"
        aria-live={paused ? "polite" : undefined}
      >
        <p className="font-heading text-lg font-semibold">{step.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {step.description}
        </p>
      </div>

      <div className="mx-auto mt-5 max-w-[480px]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous step"
            onClick={() => goTo(active - 1)}
            className={roundButton}
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="grid flex-1 grid-cols-4 gap-1">
            {heroSteps.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to ${item.label}`}
                aria-current={index === active ? "step" : undefined}
                onClick={() => goTo(index)}
                className="text-left"
              >
                <div className="mb-1 flex items-center justify-between text-[10px]">
                  <span
                    className={
                      index === active
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="text-muted-foreground">0{index + 1}</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${index < active ? 100 : index === active ? progress : 0}%`,
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {!reduceMotion && (
            <button
              type="button"
              aria-label={userPaused ? "Play carousel" : "Pause carousel"}
              onClick={() => setUserPaused((value) => !value)}
              className={roundButton}
            >
              {userPaused ? (
                <Play className="size-3.5" />
              ) : (
                <Pause className="size-3.5" />
              )}
            </button>
          )}

          <button
            type="button"
            aria-label="Next step"
            onClick={() => goTo(active + 1)}
            className={roundButton}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}