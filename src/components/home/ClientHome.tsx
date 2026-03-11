"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Projects from "@/components/home/Projects";
import TimelineSection from "@/components/home/TimelineSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ClientHome() {
  const container = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero Animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(
          ".hero-title",
          { y: 50, opacity: 0, duration: 1, stagger: 0.1 },
          "-=0.4",
        )
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .from(
          ".hero-visual",
          { scale: 0.8, opacity: 0, duration: 1.2, ease: "back.out(0.2)" },
          "-=1",
        );

      // Bento grid Animations
      gsap.from(".bento-grid .bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Bento hover interactions
      const bentoEls = gsap.utils.toArray<HTMLElement>(".bento-item");
      const hoverHandles: Array<{
        el: HTMLElement;
        enter: (e?: Event) => void;
        leave: (e?: Event) => void;
        move: (e: MouseEvent) => void;
        tl: gsap.core.Timeline;
      }> = [];

      bentoEls.forEach((el) => {
        el.style.willChange = "transform";
        el.style.transformStyle = "preserve-3d";
        const parent = el.parentElement as HTMLElement | null;
        if (parent && !parent.style.perspective)
          parent.style.perspective = "1200px";

        const tl = gsap.timeline({ paused: true });
        tl.to(
          el,
          {
            y: -12,
            scale: 1.035,
            duration: 0.4,
            ease: "power3.out",
            boxShadow: "0 20px 40px rgba(2,6,23,0.12)",
            transformOrigin: "center center",
          },
          0,
        );

        const setRotX = gsap.quickSetter(el, "rotationX", "deg");
        const setRotY = gsap.quickSetter(el, "rotationY", "deg");

        const onEnter = () => tl.play();
        const onLeave = () => {
          tl.reverse();
          gsap.to(
            {},
            {
              duration: 0.45,
              onUpdate: () => {
                setRotX(0);
                setRotY(0);
              },
            },
          );
        };

        const onMove = (ev: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const relX = (ev.clientX - (r.left + r.width / 2)) / r.width;
          const relY = (ev.clientY - (r.top + r.height / 2)) / r.height;
          const rotY = relX * 12;
          const rotX = -relY * 9;
          setRotX(rotX);
          setRotY(rotY);
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousemove", onMove);

        hoverHandles.push({
          el,
          enter: onEnter,
          leave: onLeave,
          move: onMove,
          tl,
        });
      });

      const cleanupHover = () => {
        hoverHandles.forEach(({ el, enter, leave, move, tl }) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
          el.removeEventListener("mousemove", move);
          tl.kill();
          el.style.willChange = "";
          el.style.transformStyle = "";
          const parent = el.parentElement as HTMLElement | null;
          if (parent && parent.style.perspective === "1200px")
            parent.style.perspective = "";
        });
      };

      // Horizontal scroll for projects
      const sections = gsap.utils.toArray(".horizontal-panel");
      if (horizontalRef.current && sections.length > 0) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + horizontalRef.current!.offsetWidth * 2,
          },
        });
      }

      // Timeline Animations
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      return cleanupHover;
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="min-h-screen bg-background text-foreground overflow-hidden"
    >
      <Hero />
      <Services />
      <Projects horizontalRef={horizontalRef} />
      <TimelineSection />
    </div>
  );
}
