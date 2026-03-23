import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1>404 — Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
