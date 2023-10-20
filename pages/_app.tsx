import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import { ThemeProvider } from 'layouts/ThemeProvider';
import Head from 'next/head'
// import { Anuphan } from '@next/font/google'

// const anuphan = Anuphan({
//   subsets: ['latin', 'thai'],
//   weight: ['400', '700'],
// })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {process.env.NEXT_PUBLIC_UMAMI_ID &&
          process.env.NEXT_PUBLIC_UMAMI_URL &&
          process.env.NODE_ENV === 'production' && (
            <Script
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
              src={process.env.NEXT_PUBLIC_UMAMI_URL}
            />
          )}
        <Toaster />
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}
