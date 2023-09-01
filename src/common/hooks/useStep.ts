'use client';

import { useState } from 'react';

export const useStep = (steps: string[]) => {
  const [step, setStep] = useState(steps[0]);

  const set = (nextStep: string) => {
    const stepIndex = steps.indexOf(nextStep);
    if (stepIndex === -1) {
      assertStep(step);
      return;
    }
    setStep(nextStep);
  };

  const nextStep = () => {
    const stepIndex = steps.indexOf(step);
    const newStep = steps[stepIndex + 1];
    assertString(newStep);
    setStep(newStep);
  };

  const prevStep = () => {
    const stepIndex = steps.indexOf(step);
    const newStep = steps[stepIndex - 1];
    assertString(newStep);
    setStep(newStep);
  };

  return { step, setStep: set, nextStep, prevStep } as const;
};

function assertStep(step: string) {
  throw new Error(`${step} is not part of the step.`);
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}
