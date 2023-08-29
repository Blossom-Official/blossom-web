'use client';

import { useState } from 'react';

import { OptionKey, Options } from './types';

const initialState: Options = {
  relationship: 'NOOP',
  age: 'NOOP',
  mind: 'NOOP',
  color: 'NOOP',
  vibe: 'NOOP',
};

interface UseOptionsProps {
  onSelect?: () => unknown;
}
export const useSelectOptions = ({ onSelect }: UseOptionsProps) => {
  const [options, setOptions] = useState<Options>(initialState);

  const handleSelect = <T extends OptionKey>(key: T, value: Options[T]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
    onSelect?.();
  };

  return { options, handleSelect } as const;
};
