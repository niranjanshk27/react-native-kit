import React from 'react';

export function useDebounce(cb: Function, delay = 1000) {
  const lastUsed = React.useRef<number>(0);

  return React.useCallback((...args) => {
    if (Date.now() - lastUsed.current < delay) return;

    lastUsed.current = Date.now();
    if (cb) cb(...args);
  }, [cb]);
};