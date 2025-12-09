'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-[10rem] leading-none font-bold text-transparent">
            404
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl" />
        </div>

        {/* Message */}
        <h1 className="text-secondary mb-3 text-3xl font-bold">Page Not Found</h1>
        <p className="text-muted mb-8 max-w-md text-lg">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => window.history.back()}
            className="border-border bg-card text-secondary hover:bg-accent inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl" />
        <div className="absolute -right-1/2 -bottom-1/2 h-full w-full rounded-full bg-gradient-to-tl from-purple-500/10 to-transparent blur-3xl" />
      </div>
    </div>
  )
}
