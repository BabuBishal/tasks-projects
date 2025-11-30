export default function StudentLayout({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) {
  return (
    <>
      {children}
      {sheet}
    </>
  );
}
