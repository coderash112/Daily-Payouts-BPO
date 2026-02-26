import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata = {
  title: 'Premium BPO & IT Services | In-House Outsourcing Solutions',
  description: 'Scalable. Secure. US-Focused. Professional BPO services including chat support, voice process, digital marketing, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
