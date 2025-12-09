import Link from 'next/link'

export default function RootNotFound() {
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
          background: '#f4f4f5',
          color: '#18181b',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '8rem',
            fontWeight: 'bold',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: '#71717a', marginBottom: '2rem', maxWidth: '400px' }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
          doesn&apos;t exist.
        </p>
        <Link
          href="/en/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#18181b',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
        >
          ← Go to Dashboard
        </Link>
      </body>
    </html>
  )
}
