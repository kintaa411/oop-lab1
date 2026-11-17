class Course {
  capacity = 30;
  enrolledStudents: string[] = [];
  registration:string[]=[];

 registrationOpen(student: string): boolean {
    if (this.enrolledStudents.length >= this.capacity) {
      return false;
    }
    this.enrolledStudents.push(student);
    return true;
 }
   enroll(student: string): boolean {
    if (this.enrolledStudents.length >= this.capacity) {
      return false;
    }
    this.enrolledStudents.push(student);
    return true;
  }
closeRegistration():void{
    if (this.enrolledStudents.length >= this.capacity) {
      console.log `not possible`
    }
    
}

}

const oop = new Course();
const databases = new Course();

console.log(oop.capacity, databases.capacity);
oop.enroll("Awa");
oop.enroll("Mamadou");
databases.enroll("Fatou");

console.log(oop.enrolledStudents);        // [ 'Awa', 'Mamadou' ]
console.log(databases.enrolledStudents);  // [ 'Fatou' ]
console.log(oop.enroll("Awa"));   // false — already enrolled
oop.closeRegistration();
console.log(oop.enroll("Ousmane"));   // false
