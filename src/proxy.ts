import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // সেশন চেক করা
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // ১. প্রোটেক্টেড রুটগুলো (লগআউট অবস্থায় ঢুকতে গেলে সাইন-ইন পেজে পাঠাবে)
    // যেমন: /profile, /product/*, /catagory/* ইত্যাদি
    const isProtectedPath = pathname.startsWith('/profile') || pathname.startsWith('/product') || pathname.startsWith('/catagory');

    if (isProtectedPath && !session) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // ২. অথেন্টিকেশন রুটগুলো (লগইন করা থাকলে সাইন-ইন বা সাইন-আপ পেজে ঢুকতে দেবে না, হোম পেজে পাঠাবে)
    const isAuthPath = pathname.startsWith('/signin') || pathname.startsWith('/signup');

    if (isAuthPath && session) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/product/:path*", "/catagory/:path*", "/signin", "/signup"],
};