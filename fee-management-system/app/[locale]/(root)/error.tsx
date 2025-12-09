'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertCircle } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-warning-bg rounded-full p-4">
            <AlertCircle className="text-warning-text h-10 w-10" />
          </div>
        </div>

        <h1 className="text-secondary mb-3 text-2xl font-bold">Unable to load this page</h1>
        <p className="text-muted mb-6 max-w-md">
          There was a problem loading this section. This might be a temporary issue.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="border-border bg-card text-secondary hover:bg-accent inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 max-w-lg text-left">
            <summary className="text-muted hover:text-secondary cursor-pointer text-sm">
              Technical details
            </summary>
            <pre className="bg-accent text-danger-text mt-2 overflow-auto rounded-lg p-3 text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
