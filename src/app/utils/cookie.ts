'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

class Cookies {
    static async set(name: string, value: string, options: Partial<ResponseCookie>) {
        cookies().set(name, value, options)
    }

    static async get(name: string) {
        cookies().get(name)
    }
}

export default Cookies;

