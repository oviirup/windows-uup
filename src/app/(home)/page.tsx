export default function Page() {
  return (
    <main className="container mt-16 mb-12 space-y-24 lg:mt-28 lg:mb-20 lg:space-y-32">
      <section className="relative space-y-8">
        <hgroup className="space-y-3 text-2xl sm:text-3xl md:text-4xl">
          <h1 className="w-max bg-[linear-gradient(45deg,#8360c3,#0083e0,#009ddb,#00b3bd,#2ebd90)] bg-clip-text font-heading font-bold text-transparent">
            Windows UUP
          </h1>
          <p className="max-w-[18em] text-[0.75em] leading-tight text-balance text-muted-fg">
            {`Download & Compile UUP files -> ISO from Microsoft servers in one click`}
          </p>
        </hgroup>
      </section>
    </main>
  )
}
