'use client'
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex h-full min-h-[80vh] items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <ShieldAlert className="h-16 w-16 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Access Denied</h1>

        {/* Description */}
        <p className="mb-2 text-gray-600">{"You don't have permission to access this page."}</p>
        <p className="mb-8 text-sm text-gray-500">
          {`This area is restricted to administrators only. If you believe this is an error, please
          contact your system administrator.`}
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500">Error Code: 403 - Forbidden</p>
        </div>
      </div>
    </div>
  )
}
