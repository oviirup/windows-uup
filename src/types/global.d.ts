/** React props with children */
type Props<P = {}> = Readonly<React.PropsWithChildren<P>>;

/** Page props with dynamic params and search params */
type PageProps<
  Props = {},
  P = Record<string | string[]> | undefined,
  S = Record<string | string[]> | undefined,
> = Readonly<Props & { params?: P; searchParams?: S }>;
