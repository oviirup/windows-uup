import { Icon } from '@/components/core';
import style from './style.module.scss';

export default function HomePage() {
  return (
    <main className="container mb-12 mt-16 space-y-24 lg:mb-20 lg:mt-28 lg:space-y-32">
      <section className="relative space-y-8">
        <hgroup className="max-w-md space-y-3 lg:max-w-lg">
          <h1 className={style.hero__title}>Windows UUP</h1>
          <p className={style.hero__subtitle}>
            Download &amp; Compile UUP files{' '}
            <Icon name="arrow-right" className="inline translate-y-[-0.1em] align-middle" /> ISO from Microsoft servers
            in one click
          </p>
        </hgroup>
      </section>
    </main>
  );
}
