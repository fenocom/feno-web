"use client";

import { useCallback, useEffect, useState } from "react";

const getInitialValue = (key, initialValue) => {
  if (typeof window === "undefined") return initialValue;
  const stored = window.localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : initialValue;
  } catch {
    return initialValue;
  }
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getInitialValue(key, initialValue));

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const setStoredValue = useCallback(
    (next) => {
      setValue((current) => (typeof next === "function" ? next(current) : next));
    },
    [setValue],
  );

  return [value, setStoredValue];
};


