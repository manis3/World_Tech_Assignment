'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query
import DashboardWrapper from './dashboard-wrapper';
import './globals.css';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.querySelector('html')?.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <QueryClientProvider client={queryClient}>
          <header>
            {/* Your header content */}
          </header>
          <DashboardWrapper>{children}</DashboardWrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}
