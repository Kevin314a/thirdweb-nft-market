
export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;

  const startDebounce = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args); // Pass the arguments to the original function
    }, delay);
  };

  const stopDebounce = () => {
    if (timer) clearTimeout(timer);
  };

  return { startDebounce, stopDebounce };
};

export function useDebounceEx<T extends (...args: any[]) => Promise<any>>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;

  const startDebounce = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const result = await fn(...args); // Wait for the original function to resolve
        resolve(result); // Resolve the promise with the result
      }, delay);
    });
  };

  const stopDebounce = () => {
    if (timer) clearTimeout(timer);
  };

  return { startDebounce, stopDebounce };
}