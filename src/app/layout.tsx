import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A World Made for Shree — The Ultimate Birthday Surprise',
  description: 'An enchanted dark romantic digital universe handcrafted by Ayush for his princess Shree on her 7th November birthday.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
