'use client'

import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import StudentFormPage from '../[id]/_components/StudentFormPage'

export default function AddStudentPage() {
  return (
    <div className="mx-auto mt-10 w-full">
      <Breadcrumb
        items={[
          { label: 'Students', href: '/students' },
          { label: 'Add Student', href: '/students/add' },
        ]}
      />

      <StudentFormPage />
    </div>
  )
}
