import 'react';

// allow custom css props
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
