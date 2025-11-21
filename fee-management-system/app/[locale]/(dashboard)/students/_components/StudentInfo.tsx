import { Student } from "@/lib/@types/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Award, BookOpen, Calendar, Mail, MapPin, Phone } from "lucide-react";

const StudentInfo = ({ student }: { student: Partial<Student> }) => {
  return (
    <>
      {/* Student Information */}
      <div className="lg:col-span-1">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-bold  text-primary mb-4">
            Student Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-muted mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Email</p>
                <p className="text-xs text-secondary">{student.email}</p>
              </div>
            </div>
            {student.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted mt-0.5" />
                <div>
                  <p className="text-sm text-secondary">Phone</p>
                  <p className="text-xs text-secondary">{student.phone}</p>
                </div>
              </div>
            )}
            {student.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted mt-0.5" />
                <div>
                  <p className="text-sm text-secondary">Address</p>
                  <p className="text-xs text-secondary">{student.address}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-muted mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Program</p>
                <p className="text-xs text-secondary">
                  {typeof student?.program === "object"
                    ? student.program.name
                    : student?.program}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Semester</p>
                <p className="text-xs text-secondary">{student.semester}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Enrolled On</p>
                <p className="text-xs text-secondary">
                  {formatDate(String(student?.joinedYear))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        {student &&
          student.scholarships &&
          student?.scholarships?.length > 0 && (
            <div className="bg-card rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                Scholarships
              </h2>
              <div className="space-y-3">
                {student?.scholarships?.map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className="p-4 bg-purple-50 dark:bg-purple-900/30  rounded-lg border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-xs text-secondary">
                        {scholarship.scholarship.name}
                      </h3>
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    {/* <p className="text-sm text-secondary mb-2">
                      {scholarship.scholarship.type === "fixed"
                        ? "Fixed Amount"
                        : `${scholarship.scholarship.value}% of Total Fee`}
                    </p> */}
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(scholarship.actualAmount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default StudentInfo;
