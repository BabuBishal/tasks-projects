'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet/sheet'
import { useRouter } from 'next/navigation'
import EditStudentPage from '@/app/[locale]/(root)/students/[id]/_components/EditStudentPage'

export default function AddStudentSheet() {
  const router = useRouter()

  return (
    <Sheet defaultOpen onOpenChange={open => !open && router.back()}>
      <SheetContent side="right" className="max-w-lg">
        <SheetHeader>
          <SheetTitle>Edit Student</SheetTitle>
          <SheetDescription>Edit student details here</SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <EditStudentPage />
        </div>
      </SheetContent>
    </Sheet>
  )
}
