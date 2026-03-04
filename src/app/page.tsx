"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Link from "next/link";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Code2,
  Layers,
  Paintbrush,
  Rocket,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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

      // Bento hover interactions (enhanced below)
      // collect elements
      const bentoEls = gsap.utils.toArray<HTMLElement>(".bento-item");
      // Enhanced Bento hover interactions using GSAP timelines and quickSetter
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

        // ensure parent has perspective for 3D tilt
        const parent = el.parentElement as HTMLElement | null;
        if (parent && !parent.style.perspective)
          parent.style.perspective = "1200px";

        // timeline that handles entrance/exit (scale, lift, shadow)
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

        // quickSetters for performant mouse-follow tilt
        const setRotX = gsap.quickSetter(el, "rotationX", "deg");
        const setRotY = gsap.quickSetter(el, "rotationY", "deg");

        const onEnter = () => tl.play();
        const onLeave = () => {
          tl.reverse();
          // gently reset rotations
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
          const relX = (ev.clientX - (r.left + r.width / 2)) / r.width; // -0.5..0.5
          const relY = (ev.clientY - (r.top + r.height / 2)) / r.height; // -0.5..0.5
          const rotY = relX * 12; // rotate around Y
          const rotX = -relY * 9; // rotate around X
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

      // cleanup on unmount (deferred return)
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

      gsap.from(".footer-element", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });
      // return cleanup for hover handlers
      return cleanupHover;
    },
    { scope: container },
  );

  const services = [
    {
      icon: <Code2 className="w-8 h-8 mb-4 text-blue-500" />,
      title: "Web Development",
      desc: "Building scalable, high-performance web applications using Next.js, React, and Node.",
    },
    {
      icon: <Paintbrush className="w-8 h-8 mb-4 text-purple-500" />,
      title: "UI/UX Architecture",
      desc: "Crafting beautiful, accessible, and inclusive interfaces with Tailwind CSS and Shadcn.",
    },
    {
      icon: <Rocket className="w-8 h-8 mb-4 text-orange-500" />,
      title: "Creative Development",
      desc: "Bringing sites to life with GSAP, Three.js, and complex interactive animations.",
    },
    {
      icon: <Layers className="w-8 h-8 mb-4 text-green-500" />,
      title: "Systems Design",
      desc: "Creating robust design systems and component libraries for enterprise teams.",
    },
  ];

  const projects = [
    {
      id: "01",
      title: "E-Commerce Reimagined",
      desc: "A headless shopify store with 3D product configurators.",
      color: "from-blue-500/20 to-cyan-500/20",
      tag: "Next.js + Three.js",
    },
    {
      id: "02",
      title: "Fintech Dashboard",
      desc: "Real-time data visualization for a crypto trading platform.",
      color: "from-purple-500/20 to-pink-500/20",
      tag: "React + D3.js",
    },
    {
      id: "03",
      title: "Social Platform",
      desc: "A community app with real-time chat and video rooms.",
      color: "from-orange-500/20 to-yellow-500/20",
      tag: "WebRTC + Socket.io",
    },
    {
      id: "04",
      title: "AI Image SaaS",
      desc: "Web interface for an AI image generation model.",
      color: "from-green-500/20 to-emerald-500/20",
      tag: "OpenAI + Tailwind",
    },
  ];

  const timeline = [
    {
      year: "Sept 2025 - Present",
      role: "Frontend Developer — Contract",
      company: "PT Indocyber Global Teknologi",
      stacks: [
        "Next.js",
        "Material UI",
        "TanStack Query",
        "Zustand",
        "React Hook Form",
        "Zod",
        "TypeScript",
      ],
      desc: "Project: Satu Wings (Wings Group). Contributed as a frontend developer using Next.js 15, Material UI, Zustand, TanStack Query, React Hook Form, Zod, and TypeScript within a multi-zone / micro-frontend architecture. Built reusable UI components, worked with CI/CD and Git-based workflows, and integrated REST APIs with backend teams.",
    },
    {
      year: "Jun 2024 - Sept 2025",
      role: "Frontend Developer — Full time",
      company: "PT Global Indonesia Asia Sejahtera",
      stacks: [
        "Next.js",
        "React Flow",
        "NextAuth",
        "TanStack Table",
        "Prisma",
        "MongoDB",
        "Shadcn UI",
        "Tailwind CSS",
      ],
      desc: "Built documentation and profile websites using Next.js 15, React Flow, NextAuth v5, TanStack Table, Prisma, MongoDB, Shadcn UI, and Tailwind CSS with role-based access control. Converted Figma designs to responsive UIs, implemented SPA/SSR patterns, improved production performance, and used Docker (Laradock), Ubuntu, Jira, and Git/GitLab workflows.",
    },
    {
      year: "Jan 2024 - Apr 2024",
      role: "Junior Frontend Engineer — Contract",
      company: "PT Summit Global Teknologi",
      stacks: ["Vue.js", "Nuxt.js", "SCSS", "Swiper.js", "ScrollMagic"],
      desc: "Worked on responsive front-end projects using Vue.js/Nuxt and SCSS; converted Photoshop designs into HTML/SCSS, implemented animations with Swiper.js and ScrollMagic, and collaborated via Git for version control.",
    },
    {
      year: "Jul 2022 - Dec 2022",
      role: "Front End Engineering — Intern",
      company: "PT Surya Citra Media",
      stacks: ["Vue.js 3", "Vuexy", "Laravel 9"],
      desc: "Contributed to the SCM Hub project: installed VPN tools to access repos, cloned and redesigned the project, and developed frontend views using Vue.js 3 and Laravel 9.",
    },
    {
      year: "Apr 2022 - Jun 2022",
      role: "Web Developer — Intern",
      company: "PT Sugity Creatives",
      stacks: ["CodeIgniter 3", "Bootstrap", "XAMPP"],
      desc: "Designed and tested a Truck Arrival Monitoring website using CodeIgniter 3, installed XAMPP for local dev, and created QR codes for driver scanning workflows.",
    },
  ];

  return (
    <div
      ref={container}
      className="min-h-screen bg-background text-foreground overflow-hidden"
    >
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col items-start text-left xl:pr-12">
            <div className="hero-badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6 border-primary/20 shadow-sm">
              ✨ Available for new opportunities
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05]">
              <span className="hero-title block">Frontend</span>
              <span className="hero-title block text-transparent bg-clip-text bg-linear-to-r from-primary via-indigo-500 to-purple-600">
                Developer
              </span>
              <span className="hero-title block text-4xl tracking-normal">
                - Agus Pranyoto
              </span>
            </h1>
            <p className="hero-sub mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">
              I bridge the gap between design and engineering, creating highly
              interactive, accessible, and performant web experiences using
              modern stacks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="hero-cta">
                <Link href="/blog">
                  <Button
                    size="lg"
                    className="rounded-full h-14 px-8 text-base shadow-xl shadow-primary/20 transition-all hover:scale-105"
                  >
                    Read My Thoughts <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="hero-cta">
                <a href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 px-8 text-base transition-all hover:bg-secondary"
                  >
                    Contact Me
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-visual bento-item lg:w-105 w-[320px] relative hidden md:block mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-purple-500/30 rounded-[1.5rem] blur-3xl animate-pulse"></div>
            <div className="relative h-full w-full bg-card border shadow-2xl rounded-2xl p-6 flex flex-col backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 overflow-hidden">
              <div className="flex items-center gap-4">
                <Image
                  src="/agus-alibaba-cloud.jpg"
                  width={320}
                  height={320}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">Agus Pranyoto</h3>
                  <p className="text-sm text-muted-foreground">
                    Frontend Developer
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PT Indocyber Global Teknologi
                  </p>
                </div>
              </div>

              <div className="mt-4 mb-16 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I craft performant, accessible, and delightful web experiences
                  with modern stacks — from pixel-perfect UI to motion-driven
                  interactions.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    Next.js
                  </span>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    GSAP
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  ID: AGS-2026
                </div>
                <div className="w-16 h-16 bg-white/5 rounded-md flex items-center justify-center">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/aguspranyoto"
                    className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID (SERVICES) */}
      <section className="py-32 px-6 bg-slate-50 dark:bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto bento-grid">
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">
              My Expertise
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              What I bring to the table
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Card
                key={i}
                className={`bento-item border-none shadow-xl shadow-slate-200/50 dark:shadow-none lg:col-span-2 bg-white dark:bg-card`}
              >
                <CardHeader>
                  {s.icon}
                  <CardTitle className="text-2xl">{s.title}</CardTitle>
                </CardHeader>
                <div className="p-6 pt-0">
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL PROJECTS */}
      <section
        className="bg-foreground text-background overflow-hidden relative min-h-screen hidden lg:block"
        ref={horizontalRef}
      >
        <div className="absolute top-12 left-12 z-10">
          <h2 className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">
            Selected Works
          </h2>
          <h3 className="text-4xl font-bold">Featured Projects</h3>
        </div>

        <div className="flex h-screen w-[400vw] items-center">
          {projects.map((project, i) => (
            <div
              key={i}
              className="horizontal-panel w-screen h-screen flex items-center justify-center p-6 md:p-24 relative"
            >
              <div className="w-full max-w-6xl aspect-21/9 relative flex flex-col md:flex-row items-stretch border border-background/20 rounded-3xl overflow-hidden bg-background/5 backdrop-blur-md">
                <div
                  className={`w-full md:w-1/2 h-full bg-linear-to-br transition-colors ${project.color} flex items-center justify-center p-12`}
                >
                  <span className="text-9xl font-black opacity-30 drop-shadow-xl">
                    {project.id}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                  <div className="mb-4 inline-flex items-center rounded-full border border-background/30 px-3 py-1 text-xs font-semibold">
                    {project.tag}
                  </div>
                  <h4 className="text-4xl md:text-5xl font-bold mb-6">
                    {project.title}
                  </h4>
                  <p className="text-xl md:text-2xl opacity-70 mb-10 max-w-md leading-relaxed">
                    {project.desc}
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-fit border-background text-background hover:bg-background hover:text-foreground rounded-full px-8"
                  >
                    View Case Study
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE FALLBACK FOR PROJECTS */}
      <section className="py-24 px-6 bg-foreground text-background lg:hidden">
        <div className="mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">
            Selected Works
          </h2>
          <h3 className="text-4xl font-bold">Featured Projects</h3>
        </div>
        <div className="grid gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="border border-background/20 rounded-3xl overflow-hidden bg-background/5"
            >
              <div
                className={`w-full h-48 bg-linear-to-br ${project.color} flex items-center justify-center`}
              >
                <span className="text-6xl font-black opacity-30 drop-shadow-xl">
                  {project.id}
                </span>
              </div>
              <div className="p-8">
                <div className="mb-3 inline-flex items-center rounded-full border border-background/30 px-3 py-1 text-xs font-semibold">
                  {project.tag}
                </div>
                <h4 className="text-3xl font-bold mb-4">{project.title}</h4>
                <p className="text-lg opacity-80 mb-6">{project.desc}</p>
                <Button
                  variant="outline"
                  className="w-full border-background text-background hover:bg-background hover:text-foreground rounded-full"
                >
                  View Case Study
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-32 px-6 max-w-4xl mx-auto relative timeline-container">
        <div className="mb-20 md:text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">
            My Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
            Experience
          </h3>
        </div>
        <div className="">
          <Stepper activeStep={activeStep} orientation="vertical">
            {timeline.map((item, index) => (
              <Step
                key={index}
                expanded={activeStep === index}
                className="timeline-item"
              >
                <StepLabel
                  onClick={() => setActiveStep(index)}
                  className="cursor-pointer group py-4!"
                  optional={
                    <span className="text-primary font-mono text-sm font-semibold tracking-wider bg-primary/10 px-3 py-1 rounded-full inline-block mt-2">
                      {item.year}
                    </span>
                  }
                >
                  <h4 className="text-2xl font-bold group-hover:text-primary transition-colors text-foreground">
                    {item.role}
                  </h4>
                </StepLabel>
                <StepContent>
                  <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm mt-4 mb-4">
                    {item.stacks && item.stacks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.stacks.map((s, si) => (
                          <span
                            key={si}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    <h5 className="text-lg text-primary/80 mb-4 font-medium">
                      {item.company}
                    </h5>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                      {item.desc}
                    </p>
                    <div className="flex gap-4">
                      {index < timeline.length - 1 && (
                        <Button
                          onClick={() => setActiveStep(index + 1)}
                          className="rounded-full"
                        >
                          Next Expected
                        </Button>
                      )}
                      <Button
                        onClick={() => setActiveStep(0)}
                        variant="outline"
                        className="rounded-full"
                      >
                        Collapse
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="py-24 px-6 bg-card border-t text-center overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="footer-element text-5xl md:text-7xl font-black tracking-tighter mb-8">
            Let's build something{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600">
              extraordinary.
            </span>
          </h2>
          <p className="footer-element text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm currently available for freelance projects and open to full-time
            opportunities. Drop me a line if you want to collaborate!
          </p>
          <div className="footer-element flex justify-center gap-6 mb-16">
            <a
              href="mailto:agusprnyt@gmail.com"
              className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://github.com/aguspranyoto"
              className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/aguspranyoto"
              className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <div className="footer-element text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-8">
            <p>
              © {new Date().getFullYear()} Agus. All rights reserved. Crafted
              with Next.js & GSAP.
            </p>
            <div className="flex gap-6 mt-6 md:mt-0 font-medium">
              <Link
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                Read Blog
              </Link>
              <Link
                href="/blog/create"
                className="hover:text-primary transition-colors"
              >
                Author Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
