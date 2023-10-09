import { useEffect, useRef } from 'react';

export type Fn = () => VoidFunction | void;

export function useMount(
  fn: Fn = (): void => {},
): React.MutableRefObject<boolean> {
  const isMountedRef = useRef(false);
  const fnRef = useRef<Fn>(fn);

  useEffect(() => {
    const result = fnRef.current();

    isMountedRef.current = true;

    return (): void => {
      if (typeof result === 'function') {
        result();
      }

      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}
