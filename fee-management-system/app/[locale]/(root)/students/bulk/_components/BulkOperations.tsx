'use client'

import React, { useState, useEffect } from 'react'
import { Upload, Download } from 'lucide-react'
import { Button } from '@/shared/ui/button/Button'
import { useToast } from '@/shared/ui/toast'
import { generateCSVTemplate, parseCSV, exportToCSV, ParseResult } from '@/lib/utils/csv-parser'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useBulkImportStudentsMutation,
  useGetStudentsQuery,
} from '@/app/[locale]/(root)/students/_hooks'
import { BulkImportResult } from '@/lib/types/api'

export default function BulkOperations() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState<'import' | 'export'>(
    tabParam === 'export' ? 'export' : 'import'
  )
  const [csvContent, setCsvContent] = useState('')
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<BulkImportResult | null>(null)
  const { notify } = useToast()
  const router = useRouter()

  const bulkImportMutation = useBulkImportStudentsMutation()
  const { data: allStudents } = useGetStudentsQuery()

  useEffect(() => {
    if (tabParam === 'export') {
      setActiveTab('export')
    } else if (tabParam === 'import') {
      setActiveTab('import')
    }
  }, [tabParam])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = event => {
        const content = event.target?.result as string
        setCsvContent(content)
        const result = parseCSV(content)
        setParseResult(result)
      }
      reader.readAsText(selectedFile)
    }
  }

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate()
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'student-import-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async () => {
    if (!csvContent || !parseResult?.valid) {
      notify({
        title: 'Error',
        description: 'Please upload a valid CSV file',
        type: 'error',
      })
      return
    }

    setImporting(true)
    try {
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const file = new File([blob], 'import.csv', { type: 'text/csv' })

      const data = await bulkImportMutation.mutateAsync(file)

      setImportResult(data)
      notify({
        title: 'Import Complete',
        description: `Successfully imported ${data.success.length} students`,
        type: 'success',
      })

      setTimeout(() => {
        router.push('/students')
      }, 3000)
    } catch (error: unknown) {
      notify({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'Import failed',
        type: 'error',
      })
    } finally {
      setImporting(false)
    }
  }

  const handleExport = async () => {
    try {
      if (!allStudents) {
        throw new Error('No students data available to export')
      }

      const csv = exportToCSV(allStudents)

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `students-export-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)

      notify({
        title: 'Export Complete',
        description: `Exported ${allStudents.length} students`,
        type: 'success',
      })
    } catch (error: unknown) {
      notify({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Export failed',
        type: 'error',
      })
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="border-border flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('import')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'import'
              ? 'text-primary border-primary border-b-2'
              : 'text-muted hover:text-secondary'
          }`}
        >
          <Upload className="mr-2 inline h-4 w-4" />
          Import Students
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'export'
              ? 'text-primary border-primary border-b-2'
              : 'text-muted hover:text-secondary'
          }`}
        >
          <Download className="mr-2 inline h-4 w-4" />
          Export Students
        </button>
      </div>

      <div className="flex-1">
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div className="bg-background border-border rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-semibold">Import Students from CSV</h2>

              <div className="space-y-4">
                <div>
                  <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV Template
                  </Button>
                  <p className="text-muted mt-2 text-sm">
                    Download the template to see the required format
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Upload CSV File</label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="text-muted file:bg-primary hover:file:bg-primary/90 block w-full text-sm file:mr-4 file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  />
                </div>

                {parseResult && (
                  <div className="mt-4">
                    {parseResult.valid ? (
                      <div className="rounded border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                        <p className="font-medium text-green-800 dark:text-green-200">
                          ✓ CSV is valid - {parseResult.data.length} rows found
                        </p>
                      </div>
                    ) : (
                      <div className="rounded border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                        <p className="mb-2 font-medium text-red-800 dark:text-red-200">
                          ✗ CSV has errors:
                        </p>
                        <ul className="list-inside list-disc text-sm text-red-700 dark:text-red-300">
                          {parseResult.errors.slice(0, 5).map((err, i) => (
                            <li key={i}>
                              Row {err.row}: {err.message}
                            </li>
                          ))}
                          {parseResult.errors.length > 5 && (
                            <li>... and {parseResult.errors.length - 5} more errors</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {parseResult?.valid && (
                  <Button variant="primary" onClick={handleImport} disabled={importing}>
                    {importing ? 'Importing...' : 'Import Students'}
                  </Button>
                )}
              </div>
            </div>

            {importResult && (
              <div className="bg-background border-border rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-semibold">Import Results</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded bg-blue-50 p-4 dark:bg-blue-900/20">
                      <p className="text-muted text-sm">Total</p>
                      <p className="text-2xl font-bold text-blue-600">{importResult.total}</p>
                    </div>
                    <div className="rounded bg-green-50 p-4 dark:bg-green-900/20">
                      <p className="text-muted text-sm">Success</p>
                      <p className="text-2xl font-bold text-green-600">
                        {importResult.success.length}
                      </p>
                    </div>
                    <div className="rounded bg-red-50 p-4 dark:bg-red-900/20">
                      <p className="text-muted text-sm">Failed</p>
                      <p className="text-2xl font-bold text-red-600">
                        {importResult.failed.length}
                      </p>
                    </div>
                  </div>

                  {importResult.failed.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-medium">Failed Rows:</h4>
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="p-2 text-left">Row</th>
                              <th className="p-2 text-left">Name</th>
                              <th className="p-2 text-left">Error</th>
                            </tr>
                          </thead>
                          <tbody>
                            {importResult.failed.map((item, i) => (
                              <tr key={i} className="border-b">
                                <td className="p-2">{item.row}</td>
                                <td className="p-2">{item.data['name'] || '-'}</td>
                                <td className="p-2 text-red-600">{item.error}</td>
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

        {activeTab === 'export' && (
          <div className="bg-background border-border rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Export Students to CSV</h2>
            <p className="text-muted mb-6">
              Export all student data including fees and payment information to a CSV file.
            </p>
            <Button variant="primary" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export All Students
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
