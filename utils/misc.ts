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
