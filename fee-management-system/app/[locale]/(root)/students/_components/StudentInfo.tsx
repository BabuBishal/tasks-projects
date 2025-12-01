import { StudentWithComputedTotals } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils/utils'
import { Award, BookOpen, Calendar, Mail, MapPin, Phone } from 'lucide-react'

const StudentInfo = ({ student }: { student: StudentWithComputedTotals }) => {
  return (
    <>
      {/* Student Information */}
      <div className="lg:col-span-1">
        <div className="bg-card rounded-lg p-6 shadow">
          <h2 className="text-primary mb-4 text-xl font-bold">Student Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="text-muted mt-0.5 h-5 w-5" />
              <div>
                <p className="text-secondary text-sm">Email</p>
                <p className="text-secondary text-xs">{student.email}</p>
              </div>
            </div>
            {student.phone && (
              <div className="flex items-start gap-3">
                <Phone className="text-muted mt-0.5 h-5 w-5" />
                <div>
                  <p className="text-secondary text-sm">Phone</p>
                  <p className="text-secondary text-xs">{student.phone}</p>
                </div>
              </div>
            )}
            {student.address && (
              <div className="flex items-start gap-3">
                <MapPin className="text-muted mt-0.5 h-5 w-5" />
                <div>
                  <p className="text-secondary text-sm">Address</p>
                  <p className="text-secondary text-xs">{student.address}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <BookOpen className="text-muted mt-0.5 h-5 w-5" />
              <div>
                <p className="text-secondary text-sm">Program</p>
                <p className="text-secondary text-xs">
                  {typeof student?.program === 'object' ? student.program.name : student?.program}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="text-muted mt-0.5 h-5 w-5" />
              <div>
                <p className="text-secondary text-sm">Semester</p>
                <p className="text-secondary text-xs">{student.semester}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="text-muted mt-0.5 h-5 w-5" />
              <div>
                <p className="text-secondary text-sm">Enrolled On</p>
                <p className="text-secondary text-xs">{formatDate(String(student?.joinedYear))}</p>
              </div>
            </div>
            {student.status && (
              <div className="flex items-start gap-3">
                <Award className="text-muted mt-0.5 h-5 w-5" />
                <div>
                  <p className="text-secondary text-sm">Status</p>
                  <p className="text-secondary text-xs font-semibold">{student.status}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scholarships */}
        {student && student.scholarships && student?.scholarships?.length > 0 && (
          <div className="bg-card mt-6 rounded-lg p-6 shadow">
            <h2 className="text-primary mb-4 text-xl font-bold">Scholarships</h2>
            <div className="space-y-3">
              {student?.scholarships?.map(scholarship => (
                <div
                  key={scholarship.id}
                  className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/30"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-secondary text-xs font-semibold">
                      {scholarship.scholarship.name}
                    </h3>
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  {/* <p className="text-sm text-secondary mb-2">
                      {scholarship.scholarship.type === "fixed"
                        ? "Fixed Amount"
                        : `${scholarship.scholarship.value}% of Total Fee`}
                    </p> */}
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(scholarship.actualAmount || 0)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default StudentInfo
