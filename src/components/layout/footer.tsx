import { Anchor } from '@/components/ui'
import { CREATOR, SOURCE } from '@/config'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="container space-y-4 py-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 text-sm text-muted-fg">
          &copy; {year} {CREATOR.name} &bull;{' '}
          <Anchor href={SOURCE} external className="link text-muted-fg">
            Source Code
          </Anchor>
        </div>
        <div className="flex-1 text-sm text-muted-fg md:text-right">
          A project by{' '}
          <Anchor
            href={CREATOR.profiles.twitter.url}
            external
            noreferrer
            className="link">
            {CREATOR.profiles.twitter.uid}
          </Anchor>
        </div>
      </div>
      <div className="text-sm text-balance text-subtle">
        This project is not affiliated with Microsoft Corporation or any of its
        products.
      </div>
    </footer>
  )
}
