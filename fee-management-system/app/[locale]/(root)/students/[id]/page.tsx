import StudentDetails from './_components/StudentDetails'

type Props = {
  params: Promise<{ id: string }>
}

const StudentDetailsPage = async ({ params }: Props) => {
  const { id } = await params
  return <StudentDetails id={id} />
}

export default StudentDetailsPage
