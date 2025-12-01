import Link from 'next/link'
import { Button } from '@/components/ui/button/Button'
import { ChevronDown, Download, Plus, Upload } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'
import { DropdownMenu } from '@/components/ui/dropdown-menu/DropdownMenu'
import StudentStats from './_components/StudentStats'
import StudentList from '@/app/[locale]/(root)/students/_components/StudentList'

const Students = () => {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Students', href: '/students' }]} />

      <div className="flex items-end justify-between gap-5">
        <div>
          <h1 className="text-primary text-2xl font-bold">Students</h1>
          <h4 className="text-muted text-sm">Manage students, fees, and academic records</h4>
        </div>
        <div className="flex gap-2">
          <DropdownMenu
            trigger={
              <Button variant="outline" size="sm">
                Actions
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            }
          >
            <DropdownMenu.Item
              href="/students/bulk?tab=import"
              icon={<Upload className="h-4 w-4" />}
            >
              Import Students
            </DropdownMenu.Item>
            <DropdownMenu.Item
              href="/students/bulk?tab=export"
              icon={<Download className="h-4 w-4" />}
            >
              Export Students
            </DropdownMenu.Item>
          </DropdownMenu>
          <Link href="/students/add">
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4" /> Add Student
            </Button>
          </Link>
        </div>
      </div>

      <StudentStats />
      <StudentList />
    </div>
  )
}

export default Students
