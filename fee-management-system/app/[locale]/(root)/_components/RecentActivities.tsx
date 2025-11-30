'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import { Activity, UserPlus, DollarSign, Award } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils/utils'

interface RecentActivity {
  id: string
  type: 'enrollment' | 'payment' | 'scholarship'
  message: string
  timestamp: string
  amount?: number
}

interface RecentActivitiesProps {
  activities?: RecentActivity[]
}

export default function RecentActivities({ activities = [] }: RecentActivitiesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'scholarship':
        return <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'enrollment':
        return 'bg-blue-100 dark:bg-blue-950'
      case 'payment':
        return 'bg-green-100 dark:bg-green-950'
      case 'scholarship':
        return 'bg-purple-100 dark:bg-purple-950'
      default:
        return 'bg-gray-100 dark:bg-gray-950'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-muted py-8 text-center">No recent activities</p>
        ) : (
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${getBackgroundColor(activity.type)}`}>
                  {getIcon(activity.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-primary text-sm font-medium">{activity.message}</p>
                  <p className="text-muted mt-1 text-xs">{formatDate(activity.timestamp)}</p>
                </div>
                {activity.amount && (
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(activity.amount)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
