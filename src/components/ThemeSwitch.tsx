import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button variant='ghost' size='icon' />
    }

    return (
        <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? (
                <Sun className='h-4 w-4' />
            ) : (
                <Moon className='h-4 w-4' />
            )}
        </Button>
    )
}

export default ThemeSwitch
