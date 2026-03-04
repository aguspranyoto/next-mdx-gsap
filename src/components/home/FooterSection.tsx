"use client";

import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";

export default function FooterSection() {
  return (
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
            className=" p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            target="_blank"
            href="https://github.com/aguspranyoto"
            className=" p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/aguspranyoto"
            className=" p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
        <div className="footer-element text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-8">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              target="_blank"
              href="https://www.linkedin.com/in/aguspranyoto"
              className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600"
            >
              Agus Pranyoto
            </a>
            . All rights reserved. Crafted with Next.js & GSAP.
          </p>
          <div className="flex gap-6 mt-6 md:mt-0 font-medium">
            <Link href="/blog" className="hover:text-primary transition-colors">
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
  );
}
