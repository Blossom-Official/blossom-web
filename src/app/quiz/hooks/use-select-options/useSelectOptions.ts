'use client';

import { useState } from 'react';

import { HandleSelectFn, OptionKey, Options } from './types';

const initialState: Options = {
  relationship: 'NOOP',
  age: 'NOOP',
  mind: 'NOOP',
  color: 'NOOP',
  season: 'NOOP',
};

export const useSelectOptions = () => {
  const [selections, setSelections] = useState<Options>(initialState);

  const handleSelect: HandleSelectFn = <T extends OptionKey>(
    key: T,
    value: Options[T],
    options?: { onChangeSelection?: () => void }
  ) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    options?.onChangeSelection?.();
  };

  return { selections, handleSelect } as const;
};
