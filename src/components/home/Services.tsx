"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Paintbrush, Rocket, Smartphone } from "lucide-react";
import { services as servicesData } from "@/components/home/data";

const IconMap: Record<string, any> = {
  Code2,
  Paintbrush,
  Smartphone,
  Rocket,
};

export default function Services() {
  return (
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
          {servicesData.map((s, i) => {
            const Icon = IconMap[s.icon] || Code2;
            return (
              <Card
                key={i}
                className={`bento-item border-none shadow-xl shadow-slate-200/50 dark:shadow-none lg:col-span-2 bg-white dark:bg-card`}
              >
                <CardHeader>
                  <Icon className="w-8 h-8 mb-4 text-blue-500" />
                  <CardTitle className="text-2xl">{s.title}</CardTitle>
                </CardHeader>
                <div className="p-6 pt-0">
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
