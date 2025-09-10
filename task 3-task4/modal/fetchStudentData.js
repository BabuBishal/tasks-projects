export default async function fetchStudentData() {
  const response = await fetch("./students.json");
  return await response.json();
}
