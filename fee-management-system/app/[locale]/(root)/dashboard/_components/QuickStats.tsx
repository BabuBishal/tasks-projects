'use client'

import Piechart from '@/app/[locale]/(root)/dashboard/_components/piechart/piechart'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card/Card'
import { COLORS } from '@/lib/constants/constants'
import { ProgramDistribution } from '@/lib/types/api'
import { TrendingUp, Users, Calendar, PieChart as PieChartIcon } from 'lucide-react'

interface QuickStatsProps {
  collectionRate?: number | string
  studentsPending?: number
  upcomingDeadlines?: number
  programDistribution?: ProgramDistribution[]
}

export default function QuickStats({
  collectionRate = 0,
  studentsPending = 0,
  upcomingDeadlines = 0,
  programDistribution = [],
}: QuickStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Quick Stats Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {/* Collection Rate */}
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-green-100 p-3 dark:bg-green-950">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted text-sm">Collection Rate (This Month)</p>
                <p className="text-primary text-2xl font-bold">{collectionRate}%</p>
              </div>
            </div>

            {/* Students with Pending Fees */}
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-950">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-muted text-sm">Students with Pending Fees</p>
                <p className="text-primary text-2xl font-bold">{studentsPending}</p>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-950">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-muted text-sm">Upcoming Deadlines (7 days)</p>
                <p className="text-primary text-2xl font-bold">{upcomingDeadlines}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950">
                <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-muted text-sm font-medium">Program Distribution</p>
            </div>
            <div className="h-[200px] w-full">
              {programDistribution.length > 0 ? (
                <Piechart programDistribution={programDistribution} />
              ) : (
                <div className="text-muted flex h-full items-center justify-center text-xs">
                  No data
                </div>
              )}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 text-xs">
              {programDistribution.slice(0, 4).map((prog, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-muted max-w-[80px] truncate" title={prog.name}>
                    {prog.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
