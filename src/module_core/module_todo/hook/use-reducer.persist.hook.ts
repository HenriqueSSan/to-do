import { useEffect, useReducer } from 'react';

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

export function useReducerPersist<T, A>(
  key: string,
  defaultValue: T,
  reducer: (state: T, action: A) => T,
): [T, React.ActionDispatch<[A]>] {
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    return getStorageValue<T>(key) || defaultValue;
  });

  useEffect(() => {
    if (state) return localStorage.setItem(key, JSON.stringify(state));
    localStorage.removeItem(key);
  }, [key, state]);

  return [state, dispatch];
}
