"use client";

import React, { useState } from "react";
import { Upload, Download, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast";
import { generateCSVTemplate, parseCSV, exportToCSV } from "@/lib/csv-parser";
import { useRouter } from "next/navigation";

export default function BulkOperationsPage() {
  const [activeTab, setActiveTab] = useState<"import" | "export" | "promote">(
    "import"
  );
  const [file, setFile] = useState<File | null>(null);
  const [csvContent, setCsvContent] = useState("");
  const [parseResult, setParseResult] = useState<any>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const { notify } = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCsvContent(content);
        const result = parseCSV(content);
        setParseResult(result);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student-import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    if (!csvContent || !parseResult?.valid) {
      notify({
        title: "Error",
        description: "Please upload a valid CSV file",
        type: "error",
      });
      return;
    }

    setImporting(true);
    try {
      const res = await fetch("/api/students/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Import failed");
      }

      setImportResult(data.results);
      notify({
        title: "Import Complete",
        description: `Successfully imported ${data.results.success.length} students`,
        type: "success",
      });

      // Reset form after successful import
      setTimeout(() => {
        router.push("/students");
      }, 3000);
    } catch (error: any) {
      notify({
        title: "Import Failed",
        description: error.message,
        type: "error",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");

      const students = await res.json();
      const csv = exportToCSV(students);

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      a.click();
      URL.revokeObjectURL(url);

      notify({
        title: "Export Complete",
        description: `Exported ${students.length} students`,
        type: "success",
      });
    } catch (error: any) {
      notify({
        title: "Export Failed",
        description: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-primary text-2xl font-bold">Bulk Operations</h1>
        <p className="text-muted text-sm">
          Import, export, and manage students in bulk
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("import")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "import"
              ? "text-primary border-b-2 border-primary"
              : "text-muted hover:text-secondary"
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Import Students
        </button>
        <button
          onClick={() => setActiveTab("export")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "export"
              ? "text-primary border-b-2 border-primary"
              : "text-muted hover:text-secondary"
          }`}
        >
          <Download className="w-4 h-4 inline mr-2" />
          Export Students
        </button>
        <button
          onClick={() => setActiveTab("promote")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "promote"
              ? "text-primary border-b-2 border-primary"
              : "text-muted hover:text-secondary"
          }`}
        >
          <ArrowRight className="w-4 h-4 inline mr-2" />
          Promote Semester
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeTab === "import" && (
          <div className="space-y-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Import Students from CSV
              </h2>

              <div className="space-y-4">
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadTemplate}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV Template
                  </Button>
                  <p className="text-sm text-muted mt-2">
                    Download the template to see the required format
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                </div>

                {parseResult && (
                  <div className="mt-4">
                    {parseResult.valid ? (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                        <p className="text-green-800 dark:text-green-200 font-medium">
                          ✓ CSV is valid - {parseResult.data.length} rows found
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
                        <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                          ✗ CSV has errors:
                        </p>
                        <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                          {parseResult.errors
                            .slice(0, 5)
                            .map((err: any, i: number) => (
                              <li key={i}>
                                Row {err.row}: {err.message}
                              </li>
                            ))}
                          {parseResult.errors.length > 5 && (
                            <li>
                              ... and {parseResult.errors.length - 5} more
                              errors
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {parseResult?.valid && (
                  <Button
                    variant="primary"
                    onClick={handleImport}
                    disabled={importing}
                  >
                    {importing ? "Importing..." : "Import Students"}
                  </Button>
                )}
              </div>
            </div>

            {importResult && (
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Import Results</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                      <p className="text-sm text-muted">Total</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {importResult.total}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                      <p className="text-sm text-muted">Success</p>
                      <p className="text-2xl font-bold text-green-600">
                        {importResult.success.length}
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                      <p className="text-sm text-muted">Failed</p>
                      <p className="text-2xl font-bold text-red-600">
                        {importResult.failed.length}
                      </p>
                    </div>
                  </div>

                  {importResult.failed.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Failed Rows:</h4>
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Row</th>
                              <th className="text-left p-2">Name</th>
                              <th className="text-left p-2">Error</th>
                            </tr>
                          </thead>
                          <tbody>
                            {importResult.failed.map((item: any, i: number) => (
                              <tr key={i} className="border-b">
                                <td className="p-2">{item.row}</td>
                                <td className="p-2">
                                  {item.data?.name || "-"}
                                </td>
                                <td className="p-2 text-red-600">
                                  {item.error}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "export" && (
          <div className="bg-background border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Export Students to CSV
            </h2>
            <p className="text-muted mb-6">
              Export all student data including fees and payment information to
              a CSV file.
            </p>
            <Button variant="primary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export All Students
            </Button>
          </div>
        )}

        {activeTab === "promote" && (
          <div className="bg-background border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Promote Students to Next Semester
            </h2>
            <p className="text-muted mb-6">
              Use the student list page to select students and promote them to
              the next semester. This will automatically assign fees for the new
              semester.
            </p>
            <Button variant="primary" onClick={() => router.push("/students")}>
              <Users className="w-4 h-4 mr-2" />
              Go to Student List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
