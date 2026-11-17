let courseNames: string[] = [];
let capacities: number[] = [];
let enrolledStudents: string[][] = [];
let registrationOpen: boolean[] = [];
let closeRegistration:any

function addCourse(name: string, capacity: number): void {//method; //constructor
  courseNames.push(name);
  capacities.push(capacity);
  enrolledStudents.push([]);
  registrationOpen
}

function enroll(courseIndex: number, student: string): void {
  if (enrolledStudents[courseIndex].length >= capacities[courseIndex]) {
    return;
  }
  enrolledStudents[courseIndex].push(student);
  closeRegistration[courseIndex]
}

function printCourse(courseIndex: number): void {
  console.log(
    courseNames[courseIndex] + ":",
    enrolledStudents[courseIndex],
    "capacity " + capacities[courseIndex]
  );
  function importEnrollment(courseIndex: number, student: string): void {
  enrolledStudents[courseIndex].push(student);
}

function transferStudent(student: string, fromCourse: number, toCourse: number): void {
  const list = enrolledStudents[fromCourse];
  const pos = list.indexOf(student);
  if (pos >= 0) {
    list.splice(pos, 1);
    enrolledStudents[toCourse].push(student);
  }
}

function withdraw(courseIndex: number, student: string): void {
  const list = enrolledStudents[courseIndex];
  const pos = list.indexOf(student);
  if (pos >= 0) {
    list.splice(pos, 1);
  }
}

}

addCourse("Object-Oriented Programming", 30);
addCourse("Databases", 40);

enroll(0, "Awa");
enroll(0, "Mamadou");
enroll(1, "Fatou");
closeRegistration(0);
enroll(0, "Ousmane");
printCourse(0);        // Ousmane must not appear

