import '@/styles/global.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { Nunito } from 'next/font/google'

const font = Nunito({
    subsets: ['latin-ext'],
    variable: '--font-primary',
})

const App = ({ Component, pageProps }) => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <main className={`${font.variable}`}>
            <Component {...pageProps} />
        </main>

        <Toaster />
    </ThemeProvider>
)

export default App
