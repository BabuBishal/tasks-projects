import fetchStudentData from "./fetchStudentData.js";

const showStudents = async () => {
  const studentData = await fetchStudentData();
  const tbody = document.querySelector("#student-table tbody");
  studentData.map((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.email}</td>
        <td>${student.major}</td>
        <td class="${
          student.grade === "A"
            ? "excellent"
            : student.grade === "F"
            ? "fail"
            : "normal"
        }">
          ${student.grade}
        </td>
      `;

    tbody.appendChild(tr);
  });

  const overview = document.getElementById("content");

  const totalStudents = studentData.length;
  const totalAge = studentData.reduce((sum, student) => sum + student.age, 0);
  const averageAge = Math.floor(totalAge / totalStudents);

  const totalFailed = studentData.filter(
    (student) => student.grade.toLowerCase() === "f"
  ).length;
  const totalPassed = totalStudents - totalFailed;
  const date = new Date();
  const year = date.getFullYear();
  const areAllGenz = studentData.every((student) => student.age < year - 1997);

  overview.innerHTML = `
<div> Total Students: ${totalStudents}</div>
<div> Total Passed: ${totalPassed}</div>
 <div> Total Failed: ${totalFailed}
</div>
<div> Average Age: ${averageAge}
</div>
<div> Is every student GenZ: ${areAllGenz}
</div>
`;
};

showStudents();
