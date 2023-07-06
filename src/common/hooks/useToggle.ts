'use client';

import { useCallback, useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle, setValue] as const;
};
