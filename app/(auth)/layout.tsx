import Image from "next/image"
import Link from "next/link"
import React from "react"
import logo from '../../public/assets/icons/logo.svg'
import startRate from '../../public/assets/icons/star.svg'
import dashboard from '../../public/assets/images/dashboard.png'
import { headers } from "next/headers"
import { auth } from "@/lib/better-auth/auth"
import { redirect } from "next/navigation"

const Layout = async ({ children } : { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) redirect('/');

  return (
    <main className="auth-layout">
        <section className="auth-left-section scrollbar-hide-default">
            <Link href="/" className="auth-logo">
                <Image src={logo} className="h-8 w-auto" width={140} height={32} alt="Signalist Logo" />
            </Link>
            <div className="pb-6 lg:pb-8 flex-1">{children}</div>
        </section>

        <section className="auth-right-section">
            <div className="z-10 relative lg:mt-4 lg:mb-16">
                <blockquote className="auth-blockquote">
                    Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market.
                </blockquote>
                <div className="flex items-center justify-between">
                    <div>
                        <cite className="auth-testimonial-author">- Radha Krishnan</cite>
                        <p className="max-md:text-xs text-gray-500">Retail Investor</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((star) => (
                            <Image src={startRate} className="w-5 h-8" key={star} width={20} alt="star" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 relative">
                <Image src={dashboard} className="auth-dashboard-preview absolute top-0" width={1140} height={1150} alt="Dashboard-preview" />
            </div>
        </section>
    </main>
  )
}



export default Layout