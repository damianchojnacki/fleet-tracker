import Axios from 'axios'

let token;

if (typeof window !== 'undefined') {
    token = localStorage?.getItem('token');
}

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + token,
    },
    withCredentials: true,
})

export default axios
