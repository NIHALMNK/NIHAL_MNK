"use client";

import * as React from "react";
import { gsap, prefersReducedMotion } from "./gsap";

interface SectionRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  threshold?: string;
}

/**
 * Reusable hook to animate a section when it enters the viewport.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  options: SectionRevealOptions = {}
) {
  const { y = 35, duration = 0.7, delay = 0, threshold = "top 88%" } = options;
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: threshold,
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, duration, delay, threshold]);

  return ref;
}

interface StaggerRevealOptions {
  itemSelector?: string;
  y?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  threshold?: string;
}

/**
 * Reusable hook to reveal child elements with a staggered entrance.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  options: StaggerRevealOptions = {}
) {
  const {
    itemSelector = "[data-animate-item]",
    y = 30,
    scale = 0.98,
    duration = 0.6,
    stagger = 0.1,
    delay = 0,
    threshold = "top 85%",
  } = options;

  const containerRef = React.useRef<T>(null);

  React.useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(itemSelector);
      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y,
          scale,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: threshold,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [itemSelector, y, scale, duration, stagger, delay, threshold]);

  return containerRef;
}

interface HeroParallaxOptions {
  avatarSelector?: string;
  contentSelector?: string;
}

/**
 * Reusable hook for subtle hero parallax on scroll.
 */
export function useHeroParallax<T extends HTMLElement = HTMLElement>(
  options: HeroParallaxOptions = {}
) {
  const {
    avatarSelector = "[data-hero-avatar]",
    contentSelector = "[data-hero-content]",
  } = options;

  const heroRef = React.useRef<T>(null);

  React.useEffect(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const hero = heroRef.current;

    const ctx = gsap.context(() => {
      const avatar = hero.querySelector(avatarSelector);
      const content = hero.querySelector(contentSelector);

      if (avatar) {
        gsap.to(avatar, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (content) {
        gsap.to(content, {
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [avatarSelector, contentSelector]);

  return heroRef;
}
