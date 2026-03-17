"use client";

import { Button } from "@/components/ui/button";
import { projects as projectsData } from "@/components/home/data";
import Link from "next/link";
import Image from "next/image";

export default function Projects({
  horizontalRef,
}: {
  horizontalRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <>
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
          {projectsData.map((project, i) => (
            <div
              key={i}
              className="horizontal-panel w-screen h-screen flex items-center justify-center p-6 md:p-24 relative"
            >
              <div className="w-full max-w-4xl aspect-21/9 relative flex flex-col md:flex-row items-stretch border border-background/20 rounded-3xl overflow-hidden bg-background/5 backdrop-blur-md">
                {project.image === "" ? (
                  <div
                    className={`w-full md:w-1/2 h-full bg-linear-to-br transition-colors ${project.color} flex items-center justify-center p-12`}
                  >
                    <span className="text-9xl font-black opacity-30 drop-shadow-xl">
                      {project.id}
                    </span>
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 h-full">
                    <div className="size-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={447}
                        height={382}
                        className="object-contain w-full h-full p-6"
                      />
                    </div>
                  </div>
                )}

                <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tag.map((t, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center rounded-full border border-background/30 px-3 py-1 text-xs font-semibold"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6">
                    {project.title}
                  </h4>
                  <p className="text-md md:text-lg opacity-70 mb-10 max-w-md leading-relaxed">
                    {project.desc}
                  </p>
                  <Link
                    href={project.link}
                    target={project.link === "#" ? "_self" : "_blank"}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-fit border-none cursor-pointer bg-foreground text-background hover:bg-background hover:text-foreground rounded-full px-8"
                    >
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* mobile */}
      <section className="py-24 px-6 bg-foreground text-background lg:hidden">
        <div className="mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">
            Selected Works
          </h2>
          <h3 className="text-4xl font-bold">Featured Projects</h3>
        </div>
        <div className="grid gap-8">
          {projectsData.map((project, i) => (
            <div
              key={i}
              className="border border-background/20 rounded-3xl overflow-hidden bg-background/5"
            >
              {project.image === "" ? (
                <div
                  className={`w-full bg-linear-to-br transition-colors ${project.color} flex items-center justify-center p-12`}
                >
                  <span className="text-9xl font-black opacity-30 drop-shadow-xl">
                    {project.id}
                  </span>
                </div>
              ) : (
                <div className="w-full">
                  <div className="size-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={447}
                      height={382}
                      className="object-contain w-full h-full p-6"
                    />
                  </div>
                </div>
              )}
              <div className="p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tag.map((t, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center rounded-full border border-background/30 px-3 py-1 text-xs font-semibold"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <h4 className="text-2xl font-bold mb-4">{project.title}</h4>
                <p className="text-lg opacity-80 mb-6">{project.desc}</p>
                <Link
                  href={project.link}
                  target={project.link === "#" ? "_self" : "_blank"}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-none cursor-pointer bg-background text-foreground hover:bg-foreground hover:text-background rounded-full px-8"
                  >
                    View Project
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
