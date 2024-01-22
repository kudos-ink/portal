export function debounce(func: () => void, wait: number): () => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction() {
    const later = () => {
      timeout = null;
      func();
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...funcArgs: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastCall = 0;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const now = new Date().getTime();
    const remaining = wait - (now - lastCall);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCall = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = new Date().getTime();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}
