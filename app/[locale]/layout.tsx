import './globals.css';

import { Inter } from 'next/font/google';

import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { createTranslator, IntlError, NextIntlClientProvider } from 'next-intl';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

async function getLocales(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    if (error instanceof IntlError) {
      notFound();
    }
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getLocales(locale);

  const t = createTranslator({ locale, messages });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: t('RootLayout.title'),
    description: t('RootLayout.description'),
    openGraph: {
      images: [
        {
          url: '/images/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: t('RootLayout.title'),
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      image: '/images/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: t('RootLayout.title'),
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getLocales(locale);

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <meta property="og:url" content="https://www.ICCCAD.org" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ICCCAD" />
        <meta
          property="og:description"
          content="ICCCAD is an open source CRM/ERP starter built on top of NextJS. Technology stack: NextJS with Typescrtipt, Postgresql, TailwindCSS, React, Prisma, shadCN, resend.com, react.email and more."
        />
        <meta property="og:image" content="https://ICCCAD.org/api/og" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ICCCAD.org" />
        <meta property="twitter:url" content="https://www.ICCCAD.org" />
        <meta name="twitter:title" content="ICCCAD" />
        <meta
          name="twitter:description"
          content="ICCCAD is an open source CRM/ERP starter built on top of NextJS. Technology stack: NextJS with Typescrtipt, Postgresql, TailwindCSS, React, Prisma, shadCN, resend.com, react.email and more."
        />
        <meta name="twitter:image" content="https://ICCCAD.org/api/og" />
      </head>
      <body className={inter.className + 'h-screen overflow-hidden'}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
