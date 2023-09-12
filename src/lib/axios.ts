import Axios from 'axios'
import { getCookie } from 'cookies-next'

const headers = {
    'Accept': 'application/json',
}

if (typeof window !== 'undefined' && getCookie('token')) {
    headers['Authorization'] = 'Bearer ' + getCookie('token')
}

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
    withCredentials: true,
})

export default axios
