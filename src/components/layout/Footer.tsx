import { Anchor } from '@/components/core';
import { CREATOR, SOURCE } from '@/const';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container space-y-4 py-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex-1 text-sm text-muted-fg">
          &copy; {year} {CREATOR.name} &bull; <Anchor href={SOURCE} external className="link" text="Source Code" />
        </div>
        <div className="flex-1 text-sm text-muted-fg md:text-right">
          A project by{' '}
          <Anchor href={CREATOR.profiles.twitter.url} external rel="nofollow noreferrer" className="link">
            {CREATOR.profiles.twitter.uid}
          </Anchor>
        </div>
      </div>
      <div className="text-balance text-sm text-subtle">
        This project is not affiliated with Microsoft Corporation or any of its products.
      </div>
    </footer>
  );
}
