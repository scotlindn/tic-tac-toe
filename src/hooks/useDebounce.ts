import { useMemo } from 'react'

import type { DebouncedFunc, DebounceSettings } from 'lodash-es'
import debounce from 'lodash-es/debounce'

type AnyFunction = (...args: any) => any

/**
 * get a memoized debounced function (looks like useDebouncedCallback)
 * @param func - function to debounce
 * @param options - debounce options
 * @returns debounced function
 */
export const useDebounce = <T extends AnyFunction>(
  func: T,
  deps: any[] = [],
  options?: DebounceSettings & { wait: number }
): DebouncedFunc<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => debounce(func, options?.wait ?? 200, options), deps)
}
