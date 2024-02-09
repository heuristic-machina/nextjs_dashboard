import '@/app/ui/css/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'Next.js Dashboard built with App Router.',
  // metadataBase: new URL('https://example-website.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <SpeedInsights />
        </body>
    </html>
  );
}
