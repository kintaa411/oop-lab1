Answers
#Part 1: Procedural is sufficient
Question 1:
Would you create a class for this program ?

Absolutly not, it will make it complex.

#Part2: The system grows, and cracks appear
Question 2:
What happens when you run this — an error before execution, an error during execution, wrong output, or silent success?

I had an error during execution.

Question 3:
What actually happened, and on which line? Did anything warn you before the program ran?
line 51, nothing warned me before running. This problem is about synchronisation; capacities and enrolledStudents were forgotten

let courseNames: string[] = [];
let capacities: number[] = [];
let enrolledStudents: string[][] = [];

function addCourse(name: string, capacity: number): void {//method; //constructor
  courseNames.push(name);
  capacities.push(capacity);
  enrolledStudents.push([]);
}

function enroll(courseIndex: number, student: string): void {
  if (enrolledStudents[courseIndex].length >= capacities[courseIndex]) {
    return;
  }
  enrolledStudents[courseIndex].push(student);
}

function printCourse(courseIndex: number): void {
  console.log(
    courseNames[courseIndex] + ":",
    enrolledStudents[courseIndex],
    "capacity " + capacities[courseIndex]
  );
}

addCourse("Object-Oriented Programming", 30);
addCourse("Databases", 40);

enroll(0, "Awa");
enroll(0, "Mamadou");
enroll(1, "Fatou");

printCourse(0);
printCourse(1);
courseNames.push("Computer Networks");   // capacities and enrolledStudents were forgotten
enroll(2, "Ibrahima");
printCourse(2);

#Part2.2
Question 4:
After this line, what does enroll(0, "Ibrahima") do? Will there be any error? Write your answer down, then run the program and try enrolling several students into course 0.
 
 Node.js v24.14.1
192:oop-lab1 macbookpro$ node registration.ts
Object-Oriented Programming: [ 'Awa', 'Mamadou' ] capacity 30
Databases: [ 'Fatou' ] capacity 40
/Users/macbookpro/Desktop/Junior 1/OOP/oop-lab1/registration.ts:12
  if (enrolledStudents[courseIndex].length >= capacities[courseIndex]) {
                                    ^

TypeError: Cannot read properties of undefined (reading 'length'). I have this as an answer. 
#Part 3: The Shotgun Change, Measured
Question 4. importEnrollment and transferStudent can both overfill a course. Which invariant from the lecture do they violate?

Everything going from enrollStudents
#Part 4 : Class build step by step
Question 5
Can enrolling into oop ever change databases? Why or why not? Write your answer down, then run and confirm.

No, anything into oop can change database, they are two different objects shariing methods but nothing more.
   192:oop-lab1 macbookpro$ node course.ts
   30 30
   [ 'Awa', 'Mamadou' ]
   [ 'Fatou' ]
   192:oop-lab1 macbookpro$ 

Question 7. 
Total number of methods you edited this time: ______ Compare with Question 5. Same requirement, same rules — explain the difference in one sentence.

the changes made for question 5 were greater than what we nade on question 7 because on question 5 we were still on procedural, and there you have one of problem called shortgun change, really it cost while here as a class you just change the concerned aspect.