import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import axios from '@/lib/axios'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type NextRequest = IncomingMessage & {
    cookies: NextApiRequestCookies
}

export function authorize(req: NextRequest) {
    const { token } = req.cookies

    if(!token) {
        return
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
