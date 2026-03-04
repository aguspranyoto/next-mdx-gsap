"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin } from "lucide-react";

export default function Hero() {
  return (
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
            interactive, accessible, and performant web experiences using modern
            stacks.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="hero-cta">
              <Link href="/blog">
                <Button
                  size="lg"
                  className="rounded-full cursor-pointer h-14 px-8 text-base shadow-xl shadow-primary/20 transition-all hover:scale-105"
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
                  className="rounded-full cursor-pointer h-14 px-8 text-base transition-all hover:bg-secondary"
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
              <div className="text-xs text-muted-foreground">ID: AGS-2026</div>
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
  );
}
