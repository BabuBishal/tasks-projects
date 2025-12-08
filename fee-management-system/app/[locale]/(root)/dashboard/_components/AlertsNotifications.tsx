'use client'

import { useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card/Card'
import { AlertTriangle, UserX, FileWarning } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/utils'
import Link from 'next/link'
import { Button } from '@/shared/ui/button/Button'
import Badge from '@/shared/ui/badges/Badges'
import { useGetOverdueFeesQuery } from '@/app/[locale]/(root)/_hooks/fees'
import { AlertSkeleton } from './skeletons/AlertSkeleton'

import { useTranslations } from 'next-intl'

export default function AlertsNotifications() {
  const { data, isLoading, isError } = useGetOverdueFeesQuery()
  const t = useTranslations('Dashboard.alerts')

  const alerts = useMemo(
    () =>
      data
        ?.filter(fee => fee.daysOverdue > 30 || fee.paidAmount === 0)
        .slice(0, 10)
        .map(fee => ({
          id: fee.id,
          type: fee.daysOverdue > 30 ? ('critical_overdue' as const) : ('zero_payment' as const),
          studentId: fee.studentId,
          studentName: fee.studentName,
          message:
            fee.daysOverdue > 30 ? t('criticalOverdue', { days: fee.daysOverdue }) : t('noPayment'),
          amount: fee.balance,
          daysOverdue: fee.daysOverdue,
        })),
    [data, t]
  )

  const getIcon = useCallback((type: string) => {
    switch (type) {
      case 'critical_overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case 'zero_payment':
        return <UserX className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      case 'scholarship_pending':
        return <FileWarning className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }, [])

  const getBackgroundColor = useCallback((type: string) => {
    switch (type) {
      case 'critical_overdue':
        return 'bg-red-100 dark:bg-red-950'
      case 'zero_payment':
        return 'bg-orange-100 dark:bg-orange-950'
      case 'scholarship_pending':
        return 'bg-yellow-100 dark:bg-yellow-950'
      default:
        return 'bg-gray-100 dark:bg-gray-950'
    }
  }, [])

  const getBadgeVariant = useCallback((type: string) => {
    switch (type) {
      case 'critical_overdue':
        return 'danger'
      case 'zero_payment':
        return 'warning'
      case 'scholarship_pending':
        return 'info'
      default:
        return 'info'
    }
  }, [])

  if (isLoading) {
    return <AlertSkeleton />
  }

  if (!data || isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts && alerts.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <AlertTriangle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-muted">{t('empty')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts &&
              alerts.slice(0, 5).map(alert => (
                <div
                  key={alert.id}
                  className="border-border hover:bg-accent flex items-start gap-3 rounded-lg border p-3 transition-colors"
                >
                  <div className={`rounded-lg p-2 ${getBackgroundColor(alert.type)}`}>
                    {getIcon(alert.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-primary text-sm font-semibold">{alert.studentName}</p>
                      {alert.daysOverdue && alert.daysOverdue > 30 && (
                        <Badge variant={getBadgeVariant(alert.type)} size="small">
                          {alert.daysOverdue} {t('daysOverdue')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted text-xs">{alert.message}</p>
                    {alert.amount && (
                      <p className="mt-1 text-sm font-semibold text-red-600 dark:text-red-400">
                        {formatCurrency(alert.amount)}
                      </p>
                    )}
                  </div>
                  <Link href={`/students/${alert.studentId}`}>
                    <Button variant="ghost" size="sm" className="shadow-sm">
                      {t('view')}
                    </Button>
                  </Link>
                </div>
              ))}
            {alerts && alerts.length > 5 && (
              <Link href="/payments/overdue" className="block">
                <Button variant="secondary" className="mt-2 w-full">
                  {t('viewAll')} ({alerts.length})
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
