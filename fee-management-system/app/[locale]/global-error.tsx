'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#0a0a0a',
          color: '#f4f4f5',
          padding: '2rem',
          textAlign: 'center',
          margin: 0,
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
          Critical Error
        </h1>
        <p
          style={{
            color: '#a1a1aa',
            marginBottom: '2rem',
            maxWidth: '400px',
            lineHeight: '1.6',
          }}
        >
          A critical error occurred and the application couldn&apos;t recover. Please try refreshing
          the page.
        </p>

        <button
          onClick={reset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.875rem 1.75rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          ↻ Try Again
        </button>

        {error.digest && (
          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#71717a' }}>
            Error ID:{' '}
            <code
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
              }}
            >
              {error.digest}
            </code>
          </p>
        )}
      </body>
    </html>
  )
}
