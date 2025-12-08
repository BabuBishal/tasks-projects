'use client'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useGetStudentsQuery } from '../students/_hooks'
import { useRef } from 'react'

const VirtualizerDemo = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { data } = useGetStudentsQuery({ params: { limit: 100 } })
  const studentData = data?.data || []

  const virtualizer = useVirtualizer({
    count: studentData.length,
    estimateSize: () => 80,
    getScrollElement: () => ref.current,
  })
  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  return (
    <div className="flex h-[90dvh] w-full items-center justify-center">
      <div className="m-auto h-96 w-[60dvw] overflow-auto rounded-lg bg-zinc-200 p-5" ref={ref}>
        <div className="relative" style={{ height: `${totalSize}px` }}>
          {virtualItems.map(virtualItem => {
            const student = studentData[virtualItem.index]
            return (
              <div
                key={virtualItem.key}
                className="absolute top-0 left-0 h-14 w-full p-4"
                style={{
                  transform: `translateY(${virtualItem.start}px)`,
                  height: `${virtualItem.size}px`,
                }}
                data-index={virtualItem.index}
              >
                <div className="flex justify-around rounded-md bg-gray-100 p-4">
                  <p className="w-full flex-1 text-nowrap">Name: {student.name}</p>
                  <p className="w-full flex-1 text-nowrap">Email: {student.email}</p>
                  {/* <p className="w-36 text-nowrap">Program: {student.program.name}</p>
                  <p className="w-28 text-nowrap">Semester: {student.semester}</p> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VirtualizerDemo
