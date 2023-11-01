import { NextResponse } from 'next/server'
import { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const jwt = request.cookies.get('token');
    if (jwt || PUBLIC_FILE.test(pathname) || pathname === '/auth/register') {
        return NextResponse.next();
    }

    return NextResponse.rewrite(new URL('/auth/login', request.url)) // Redirect to login page
}
