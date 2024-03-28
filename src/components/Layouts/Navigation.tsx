import ApplicationLogoSmall from '@/components/ApplicationLogoSmall'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import ThemeSwitch from '@/components/ThemeSwitch'
import { Car, LogOut, MessageCircle, Navigation2, User } from 'lucide-react'
import { UserAvatar } from '@/components/Avatar'

const Navigation = () => {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const { logout, user } = useAuth()

    const initials = `${user?.firstname.substring(0, 1).toUpperCase()}${user?.lastname.substring(0, 1).toUpperCase()}`

    return (
        <nav className='bg-secondary'>
            {/* Primary Navigation Menu */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex'>
                        {/* Logo */}
                        <div className='flex-shrink-0 flex items-center'>
                            <Link href='/dashboard'>
                                <ApplicationLogoSmall
                                    className='block h-10 w-auto fill-current text-muted-foreground'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className='hidden sm:flex sm:items-center sm:ml-6'>
                        <Dropdown
                            trigger={
                                <button>
                                    <UserAvatar initials={initials} />
                                </button>
                            }
                        >
                            <DropdownMenuItem className='cursor-pointer' asChild={true}>
                                <Link href='/dashboard'>
                                    <User className='mr-2 h-4 w-4' />
                                    Map
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' asChild={true}>
                                <Link href='/trips'>
                                    <Navigation2 className='mr-2 h-4 w-4' />
                                    Trips
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' asChild={true}>
                                <Link href='/cars'>
                                    <Car className='mr-2 h-4 w-4' />
                                    Cars
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' asChild={true}>
                                <Link href='/support'>
                                    <MessageCircle className='mr-2 h-4 w-4' />
                                    Support
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                                <LogOut className='mr-2 h-4 w-4' />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </Dropdown>

                        <ThemeSwitch />
                    </div>

                    {/* Hamburger */}
                    <div className='-mr-2 flex items-center sm:hidden'>
                        <button
                            onClick={() => setOpen(open => !open)}
                            className='inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-primary transition duration-150 ease-in-out'
                        >
                            <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                                {open ? (
                                    <path
                                        className='inline-flex'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                ) : (
                                    <path
                                        className='inline-flex'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className='fixed sm:hidden bg-secondary w-full z-30'>
                    <div className='pt-2 pb-3 space-y-1'>
                        <ResponsiveNavLink href='/dashboard' active={router.pathname === '/dashboard'}>
                            Main
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/trips' active={router.pathname === '/trips'}>
                            Trips
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/cars' active={router.pathname === '/cars'}>
                            Vehicles
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/support' active={router.pathname === '/support'}>
                            Support
                        </ResponsiveNavLink>
                        <ResponsiveNavButton onClick={logout}>
                            Logout
                        </ResponsiveNavButton>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className='py-4 border-t border-primary'>
                        <div className='flex items-center px-4'>
                            <div className='flex-shrink-0'>
                                <svg
                                    className='h-10 w-10 fill-primary text-primary'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                    />
                                </svg>
                            </div>

                            <div className='ml-3'>
                                <div className='font-medium text-base text-primary'>
                                    {user?.firstname}
                                </div>
                                <div className='font-medium text-sm text-primary'>
                                    {user?.email}
                                </div>
                            </div>

                            <div className='ml-auto'>
                                <ThemeSwitch />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
