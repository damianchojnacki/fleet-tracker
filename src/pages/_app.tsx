import '@/styles/global.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { Nunito } from 'next/font/google'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const font = Nunito({
    subsets: ['latin-ext'],
    variable: '--font-primary',
})

const App = ({ Component, pageProps }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <main className={`${font.variable}`}>
                        <Component {...pageProps} />
                    </main>

                    <Toaster />
                </ThemeProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default App
