/** React props with children */
type Props<P = {}> = React.PropsWithChildren<P>

/** Page props with dynamic params and search params */
type PageProps<
  P = Record<string, string>,
  S = Record<string, string>,
> = Readonly<{
  params?: Promise<P>
  searchParams?: Promise<S>
}>
