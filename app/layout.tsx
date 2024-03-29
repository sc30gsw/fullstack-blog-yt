import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fullstack Blog',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
          <h1 className="text-slate-200 text-center text-2xl font-extrabold">
            <Link href="/" className="cursor-pointer">
              Full Stack Blog 📝
            </Link>
          </h1>
        </div>
        {children}
      </body>
    </html>
  )
}
