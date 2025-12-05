'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet/sheet'
import { useRouter } from 'next/navigation'
import StudentFormPage from '../../[id]/_components/StudentFormPage'

export default function AddStudentSheet() {
  const router = useRouter()

  return (
    <Sheet defaultOpen onOpenChange={open => !open && router.back()}>
      <SheetContent side="right" className="max-w-xl">
        <SheetHeader>
          <SheetTitle>Add Student</SheetTitle>
          <SheetDescription>Add new students here</SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <StudentFormPage />
        </div>
      </SheetContent>
    </Sheet>
  )
}
