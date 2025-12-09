'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-danger-bg rounded-full p-4">
            <AlertTriangle className="text-danger-text h-12 w-12" />
          </div>
        </div>

        <h1 className="text-secondary mb-3 text-3xl font-bold">Something went wrong!</h1>
        <p className="text-muted mb-2 max-w-md text-lg">
          An unexpected error occurred. We&apos;ve been notified and are working to fix it.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 max-w-lg text-left">
            <summary className="text-muted hover:text-secondary cursor-pointer text-sm">
              Error details
            </summary>
            <pre className="bg-accent text-danger-text mt-2 overflow-auto rounded-lg p-4 text-xs">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="border-border bg-card text-secondary hover:bg-accent inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>

        {error.digest && (
          <p className="text-muted mt-6 text-xs">
            Error ID: <code className="bg-accent rounded px-1 py-0.5">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  )
}
