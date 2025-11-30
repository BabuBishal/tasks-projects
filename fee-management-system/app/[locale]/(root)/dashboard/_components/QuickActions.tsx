import { Receipt, Users, WalletCardsIcon } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'

const QuickActions = () => {
  return (
    <div className="border-border flex w-full flex-col gap-4 rounded-lg border p-4">
      <div>
        <h5 className="text-secondary text-md font-semibold">Quick Actions</h5>
        <h6 className="text-muted text-sm font-normal">Frequently used actions</h6>{' '}
      </div>
      <div className="flex flex-col gap-5 pb-4">
        <Link
          href={'/payments/add'}
          className="border-border hover:bg-accent flex cursor-pointer
          items-center 
          justify-start gap-2 rounded-md border p-1.5 transition duration-200"
        >
          <WalletCardsIcon className="h-4 w-4" />
          <span className="text-secondary text-sm">Make Payment</span>
        </Link>
        <Link
          href="/reports"
          className="border-border hover:bg-accent flex cursor-pointer items-center justify-start gap-2 rounded-md border p-1.5 transition duration-200"
        >
          <Receipt className="h-4 w-4" />
          <span className="text-secondary text-sm">Generate Report</span>
        </Link>
        <Link
          href="/students"
          className="border-border hover:bg-accent flex cursor-pointer items-center justify-start gap-2 rounded-md border p-1.5 transition duration-200"
        >
          <Users className="h-4 w-4" />
          <span className="text-secondary text-sm">View all Students</span>
        </Link>
        {/* <Link
          href="/payments/overdue"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-secondary text-sm ">View Overdue Payments</span>
        </Link> */}
        {/* <Link
          href="/programs"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-secondary text-sm ">Manage Programs</span>
        </Link> */}
      </div>
    </div>
  )
}

export default memo(QuickActions)
