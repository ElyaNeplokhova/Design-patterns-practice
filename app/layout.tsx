import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Patterns Practice',
  description: 'Study repo: GoF design patterns in class-based and React implementations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: '2rem' }}>
        {children}
      </body>
    </html>
  );
}
