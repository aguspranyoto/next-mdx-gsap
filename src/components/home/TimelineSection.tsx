"use client";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { timeline as timelineData } from "@/components/home/data";

export default function TimelineSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
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
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ "& .MuiStepIcon-root": { color: "#000 !important" } }}
        >
          {timelineData.map((item, index) => (
            <Step
              key={index}
              expanded={activeStep === index}
              className="timeline-item"
            >
              <StepLabel
                onClick={() => setActiveStep(index)}
                className="cursor-pointer group py-4!"
                optional={
                  <span className="text-primary font-mono text-sm font-semibold tracking-wider bg-background border border-foreground/20 px-3 py-1 rounded-full inline-block mt-2">
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
                    {index < timelineData.length - 1 && (
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
  );
}
