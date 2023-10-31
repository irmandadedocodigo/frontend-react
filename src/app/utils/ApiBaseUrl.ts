import axios from "axios"

const API_BASE_URL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})


export default API_BASE_URL;