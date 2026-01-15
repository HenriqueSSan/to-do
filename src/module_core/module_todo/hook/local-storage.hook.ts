import { useEffect, useState } from 'react';

function getStorageValue<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);

    if (saved) {
      const initial: T = JSON.parse(saved);
      return initial;
    }
  }
  return null;
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => getStorageValue<T>(key) || defaultValue);

  useEffect(() => {
    if (value) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  }, [key, value]);

  return [value, setValue] as const;
}
