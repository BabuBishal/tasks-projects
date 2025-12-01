import { COLORS } from '@/lib/constants/constants'
import { ProgramDistribution } from '@/lib/types/api'
import { memo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

type TooltipFormatterFn = (value: number, name?: string) => [number, string]

const tooltipFormatter: TooltipFormatterFn = (value: number, name?: string) => {
  return [value, name ?? '']
}

const Piechart = ({ programDistribution }: { programDistribution: ProgramDistribution[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={programDistribution}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {programDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={TOOLTIP_CONTENT_STYLE}
                      itemStyle={TOOLTIP_ITEM_STYLE}
                    /> */}
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(Piechart)
