import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Design Patterns Practice</h1>
      <p>Each pattern is implemented twice: class-based (TypeScript/OOP) and React-based.</p>
      <ul>
        <li>
          <Link href="/patterns/chain-of-responsibility">Chain of Responsibility</Link>
        </li>
      </ul>
    </main>
  );
}
