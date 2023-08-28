import { useCallback, useState } from 'react';

const mapToArray = (arg: Map<unknown, unknown>) => {
  return Array.from(arg.keys());
};

export const useSelectItem = () => {
  const [items, setItems] = useState<Map<number, number>>(new Map());

  const selectItem = useCallback((flowerId: number) => {
    setItems((prevItems) => {
      const clone = new Map(prevItems);
      if (clone.has(flowerId)) clone.delete(flowerId);
      else clone.set(flowerId, flowerId);
      return clone;
    });
  }, []);

  const clearItems = useCallback(() => {
    setItems(new Map());
  }, []);

  const isSelected = useCallback(
    (flowerId: number) => items.has(flowerId),
    [items]
  );

  return {
    items: mapToArray(items) as number[],
    count: items.size,
    isEmpty: items.size === 0,
    selectItem,
    clearItems,
    isSelected,
  } as const;
};
