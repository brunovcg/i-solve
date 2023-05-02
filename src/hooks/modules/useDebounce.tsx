/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
/**
 * Provides a value that only changes when the parameter didn't
 * change after the specified delay. Useful to avoid useEffects
 * to run too much when the dependencies are bound to the user
 * input.
 *
 * @param {any} value state that changes should be debounced.
 * @param {number} delay delay to update the debounced value.
 * @returns a value that only changes after waiting the delayed
 * time and no new change on the value was made.
 */
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handle);
  });

  return debouncedValue;
};

export default useDebounce;
