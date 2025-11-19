"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
import { useRouter } from "next/navigation";
import AddStudentPage from "../../add/page";

export default function AddStudentSheet() {
  const router = useRouter();

  return (
    <Sheet defaultOpen onOpenChange={(open) => !open && router.back()}>
      <SheetContent side="right" className="max-w-lg">
        <SheetHeader>
          <SheetTitle>Add Student</SheetTitle>
          <SheetDescription>Add new students here</SheetDescription>
        </SheetHeader>

        {/* Reuse the same page content */}
        <div className="mt-4">
          <AddStudentPage />
        </div>
      </SheetContent>
    </Sheet>
  );
}
