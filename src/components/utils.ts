import { isFunction, isObject } from '@/lib/assertions';
import { twMerge } from 'tailwind-merge';

/**
 * Creates a formatted className from given arguments
 *
 * @param args - String, array, or object
 * @returns Sanitized class-names
 */
export function cn(...args: any[]) {
  if (!args.length) throw new Error('No argument is used');
  let names: string[] = [];
  args.forEach((arg) => {
    if (!arg) return;
    const argType = arg?.constructor;
    if (argType === String || argType === Number) {
      names.push(arg.toString());
    } else if (argType === Array) {
      let inner = cn.apply(null, arg);
      if (inner) names.push(inner);
    } else if (argType === Object) {
      let entries = Object.entries(arg);
      entries.map(([key, value]) => Boolean(value) && names.push(key));
    }
    return;
  });
  return twMerge(names);
}

/** Use multiple refs on a single element */
export function referrals<El>(...refs: PossibleRef<El>[]) {
  if (!refs.length) return;
  return (el: El) => {
    for (const ref of refs) {
      if (!ref) continue;
      else if (isFunction(ref)) ref(el);
      else if (isObject(ref)) ref.current = el;
    }
  };
}

type PossibleRef<El> = React.ForwardedRef<El> | undefined;
