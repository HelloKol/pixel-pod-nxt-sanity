import '@/styles/globals.css';
import { SiteHeader, SiteFooter, Seo } from '@/components';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata = {
  title: 'Pixel Pod',
  description: 'Generated by Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Seo />
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM || ''} />
      </body>
    </html>
  );
}
