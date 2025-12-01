export default function StudentPageLayout({
  children,
  sheet,
}: {
  children: React.ReactNode
  sheet: React.ReactNode
}) {
  return (
    <>
      {children}
      {sheet}
    </>
  )
}
