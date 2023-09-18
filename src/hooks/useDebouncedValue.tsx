import { useEffect, useState } from 'react';

export const useDebouncedValue = (value: string, delay = 300): string => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
