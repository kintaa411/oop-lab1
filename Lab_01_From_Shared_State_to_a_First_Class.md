# Object-Oriented Programming — DAUST Fall 2026

# Lab 1 — From Shared State to a First Class

In Lecture 1 you watched procedural code fail at scale. In this lab you reproduce that failure yourself, measure the cost of a requirement change, and rebuild the system around a class.

Working method for this lab:

1. **Type the code yourself.** Do not copy-paste.
2. **Predict before you run.** Each **Prediction** asks you to write down the expected outcome before executing.
3. **Note as you go.** Keep your predictions and answers somewhere you can refer back to them.

**Running your code.** Node 22+ runs TypeScript directly; this is the only command needed in this lab:

```bash
node file.ts
```

---

## Part 0 — Setup Check

```bash
mkdir oop-lab1
cd oop-lab1
node --version        # v22.x or later
```

Create `hello.ts`:

```typescript
const message: string = "Lab 1";
console.log(message);
```

Run it:

```bash
node hello.ts
```

**Checkpoint 0** — the message prints. If it does not, ask for help before continuing; the rest of the lab depends on a working setup.

---

## Part 1 — Day 1: Procedural Is Sufficient

DAUST opens registration for one course. Build the day-1 system in `registration.ts`:

```typescript
let enrolledStudents: string[] = [];

function enroll(student: string): void {
  enrolledStudents.push(student);
}

function printStudents(): void {
  console.log(enrolledStudents);
}

enroll("Awa");
enroll("Mamadou");
printStudents();
```

```bash
node registration.ts
```

**Checkpoint 1** — output is `[ 'Awa', 'Mamadou' ]`.

**Question 1.** Would you create a class for this program? One sentence why or why not.

This code is appropriate as written. Everything that goes wrong from here on is caused by growth, not by procedural style itself.

---

## Part 2 — The System Grows, and Cracks Appear

Six months later: many courses, capacities, rules. Replace the contents of `registration.ts`:

```typescript
let courseNames: string[] = [];
let capacities: number[] = [];
let enrolledStudents: string[][] = [];

function addCourse(name: string, capacity: number): void {
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
```

**Checkpoint 2a** — both courses print correctly.

### 2.1 Activity — The Forgotten Push

A colleague adds a third course but updates only one of the three arrays. Add exactly this at the bottom of the file:

```typescript
courseNames.push("Computer Networks");   // capacities and enrolledStudents were forgotten
enroll(2, "Ibrahima");
printCourse(2);
```

**Prediction 1.** What happens when you run this — an error before execution, an error during execution, wrong output, or silent success? Write your answer down, then run the program.

**Question 2.** What actually happened, and on which line? Did anything warn you before the program ran?

The three arrays must stay synchronized, but nothing in the program enforces it. The defect was found only by running the program. Remove the three lines before continuing.

### 2.2 Activity — Silent Corruption

Add one line anywhere after the courses are created:

```typescript
capacities[0] = -100;
```

**Prediction 2.** After this line, what does `enroll(0, "Ibrahima")` do? Will there be any error? Write your answer down, then run the program and try enrolling several students into course 0.

**Question 3.** Registration for this course is now completely broken, yet there is no error and no crash. Suppose this line were buried in a 100,000-line codebase maintained by ten developers. In two sentences: how would you locate it?

**Checkpoint 2b** — remove the corruption line and verify the output is healthy again.

---

## Part 3 — The Shotgun Change, Measured

Real systems have more functions. Add these three, written rule-free, as three different developers might write them:

```typescript
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
```

**Question 4.** `importEnrollment` and `transferStudent` can both overfill a course. Which invariant from the lecture do they violate?

### 3.1 The New Requirement

The university announces:

> **Courses can be closed to registration.**

Implement it in the procedural version. You will need:

```typescript
let registrationOpen: boolean[] = [];
```

**Task.** Go through every function and decide whether it needs to change. Update `addCourse` to maintain the new array, add the check where it belongs, and add a `closeRegistration(courseIndex)` function.

While you work, complete this table:

| Function | Edited? | Are you certain it needed (or did not need) the check? |
|---|---|---|
| `addCourse` | | |
| `enroll` | | |
| `importEnrollment` | | |
| `transferStudent` | | |
| `withdraw` | | |
| `printCourse` | | |

**Question 5.** Total number of functions you edited for this one sentence of requirements: ______
Keep this number; it is compared against Part 4.

**Question 6.** For `transferStudent`, is a transfer *into* a closed course allowed? You had to make a policy decision the requirement did not state. Where is that decision recorded for the next developer?

Test:

```typescript
closeRegistration(0);
enroll(0, "Ousmane");
printCourse(0);        // Ousmane must not appear
```

**Checkpoint 3** — closed courses reject students, and the table is complete.

---

## Part 4 — The Class, Built Step by Step

New file: `course.ts`. Keep `registration.ts`; the two versions will be compared.

Proceed in small steps, exactly as in the lecture. Run after every step.

### Step 1 — Represent the idea

```typescript
class Course {
  capacity = 30;
  enrolledStudents: string[] = [];
}

const oop = new Course();
const databases = new Course();

console.log(oop.capacity, databases.capacity);
```

### Step 2 — Give it behaviour

Add inside the class:

```typescript
  enroll(student: string): void {
    this.enrolledStudents.push(student);
  }
```

And at the bottom:

```typescript
oop.enroll("Awa");
oop.enroll("Mamadou");
databases.enroll("Fatou");

console.log(oop.enrolledStudents);        // [ 'Awa', 'Mamadou' ]
console.log(databases.enrolledStudents);  // [ 'Fatou' ]
```

**Prediction 3.** Can enrolling into `oop` ever change `databases`? Why or why not? Write your answer down, then run and confirm.

### Step 3 — The first rule moves in

```typescript
  enroll(student: string): boolean {
    if (this.enrolledStudents.length >= this.capacity) {
      return false;
    }
    this.enrolledStudents.push(student);
    return true;
  }
```

### Step 4 — The second rule

**Task.** Add the no-duplicate rule to `enroll`. Test:

```typescript
console.log(oop.enroll("Awa"));   // false — already enrolled
```

### Step 5 — The same requirement as Part 3

Implement "courses can be closed to registration" in the class version:

- a field `registrationOpen = true;`
- the check at the top of `enroll`
- a method `closeRegistration(): void`

Test:

```typescript
oop.closeRegistration();
console.log(oop.enroll("Ousmane"));   // false
```

**Question 7.** Total number of methods you edited this time: ______
Compare with Question 5. Same requirement, same rules — explain the difference in one sentence.

### Step 6 — Withdraw

**Task.** Add a `withdraw(student: string): boolean` method. Its invariant: a student who is not enrolled cannot withdraw (return `false`). The caller checks nothing; the course decides.

```typescript
console.log(oop.withdraw("Mamadou"));  // true
console.log(oop.withdraw("Mamadou"));  // false — already withdrawn
```

**Checkpoint 4** — all six steps run as expected.

---

## Part 5 — The Open Door

The class now owns three rules. One problem remains. At the bottom of `course.ts`, add:

```typescript
oop.capacity = -100;
```

Run the program.

**Question 8.** The line executed without complaint, and the rules in `enroll` are now meaningless — the object is responsible for its state, yet outside code can still bypass its behaviour. What is missing from the class? (You saw the answer's name at the end of Lecture 1; Lecture 2 develops it.)

Remove the line. This question is where Lab 2 begins.

---


## Summary

| You experienced | The name for it |
|---|---|
| The forgotten `push` | State synchronized only by convention |
| `capacities[0] = -100`, no error anywhere | Silent corruption of shared state |
| One requirement, N functions edited | Shotgun change |
| The same requirement, one method edited | Rules localized with their data |
| `oop.capacity = -100` still executed | The open door — Lab 2 begins here |

One number to retain: Question 5 versus Question 7.
