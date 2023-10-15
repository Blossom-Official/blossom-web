'use client';

import { useState } from 'react';

type NonEmptyArray<T> = readonly [T, ...T[]];

export type UseStepReturn<Steps extends NonEmptyArray<string>> = readonly [
  Steps[number],
  (step: Steps[number]) => void,
  () => void
];

export const useStep = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    initialStep?: Steps[number];
  }
): UseStepReturn<Steps> => {
  const initial = options?.initialStep ?? (steps[0] as Steps[number]);
  const [stack, setStack] = useState<Steps[number][]>([initial]);

  const setStep = (step: Steps[number]) => {
    assertString(step);
    setStack((prev) => [...prev].concat(step));
  };
  const prevStep = () => {
    if (stack.length === 1) return;
    setStack((prev) => prev.slice(0, prev.length - 1));
  };
  return [stack[stack.length - 1], setStep, prevStep] as const;
};

function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}
