import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import SessionProviderWrapper from '@/providers/SessionProviderWrapper';
import { Toaster } from '@/components/ui/toaster';
import QueryClientProviderWrapper from '@/providers/QueryClientProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <QueryClientProviderWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </QueryClientProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
