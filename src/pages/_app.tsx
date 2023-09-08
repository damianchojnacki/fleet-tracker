import '@/styles/global.css'
import {ThemeProvider} from "@/components/ThemeProvider"
import {Toaster} from "@/components/ui/toaster"

const App = ({ Component, pageProps }) => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Component {...pageProps} />

        <Toaster />
    </ThemeProvider>
)

export default App
