import { useState, useEffect } from 'react';

function calcSeconds(milliseconds: number | (() => number)) {
  const ms = (
    typeof milliseconds === 'function' ? milliseconds() : milliseconds
  ) || 0;
  if (ms <= 0) {
    return 0;
  }
  return Math.ceil(ms / 1000);
}

export function useCountDown(intervalms: number | (() => number), callback: () => void) {
  const [seconds, setSeconds] = useState(() => calcSeconds(intervalms));

  useEffect(() => {
    let target = calcSeconds(intervalms) - 1;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      setSeconds(Math.max(target, 0));
      if (target <= 0) {
        callback();
      } else {
        target -= 1;
        timeout = setTimeout(tick, 1000);
      }
    }
    // Negative timeouts triggers callback immediately
    timeout = setTimeout(tick, (typeof intervalms === 'function' ? intervalms() : intervalms) - (target * 1000));
    return () => {
      clearTimeout(timeout);
    }
  }, [intervalms]);

  return seconds;
}


function calcRemainingSeconds(timestamp: number) {
  return Math.max(0, Math.floor((timestamp - Date.now()) / 1000));
}

export function useCountDownTo(targetTimestamp: number, onComplete?: (at: number) => void) {
  const [seconds, setSeconds] = useState(() => calcRemainingSeconds(targetTimestamp));

  useEffect(() => {
    const rem = calcRemainingSeconds(targetTimestamp);
    if (rem === 0) {
      if (onComplete) onComplete(Date.now());
      setSeconds(0);
      return;
    }

    let handle = setInterval(() => {
      const r = calcRemainingSeconds(targetTimestamp);
      if (r === 0) {
        clearInterval(handle);
        if (onComplete) onComplete(Date.now());
      }
      setSeconds(r);
    }, 1000);

    return () => { clearInterval(handle); }
  }, [targetTimestamp]);

  return seconds;
}