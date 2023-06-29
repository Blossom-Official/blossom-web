'use client';

import { ChangeEventHandler, useCallback, useState } from 'react';

export const useInputState = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChangeState: ChangeEventHandler<HTMLElement & { value: string }> =
    useCallback((event) => {
      const {
        target: { value },
      } = event;

      setValue(value);
    }, []);

  return [value, setValue, handleChangeState] as const;
};
