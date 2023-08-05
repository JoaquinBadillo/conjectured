import '@styles/globals.css';
import '@styles/index.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { Footer, Navbar } from '@components/index';

const ubuntu = Ubuntu({ 
  weight: '500',
  subsets: ['latin-ext'] 
})

export const metadata: Metadata = {
  title: 'Conjectured',
  description: 'Computer Science, Mathematics, and Programming. By Joaquin Badillo',
}

export default function RootLayout({children, }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} bg-gray-100 dark:bg-black-900 transition-all duration-300 ease-linear`}>
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  )
}
