"use client";

import { Card, CardContent } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { Edit, Trash2, GraduationCap, BookOpen, Users } from "lucide-react";

interface Program {
  id: string;
  name: string;
  duration: number;
  _count?: {
    students: number;
  };
}

interface ProgramListProps {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: (id: string) => void;
}

export default function ProgramList({
  programs,
  onEdit,
  onDelete,
}: ProgramListProps) {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No programs found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first academic program.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <Card
          key={program.id}
          className="group hover:shadow-md transition-all duration-300"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(program);
                  }}
                >
                  <Edit className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${program.name}? This action cannot be undone.`
                      )
                    ) {
                      onDelete(program.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>

            <Link href={`/programs/${program.id}`} className="block">
              <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                {program.name}
              </h3>
            </Link>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{program.duration} Semesters</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{program._count?.students || 0} Students</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Link href={`/programs/${program.id}`}>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View Fee Structure
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
