const quiz1 = [
  {
    question: `Predict the Output
<pre><code>rust
fn main(){
    let mut x = 8;
    x = 5 + (10 - x) * 2;
    println!("{}", x);
}
</code></pre>`,
    options: ["3", "6", "9", "13"],
    answer: 2,
    explanation: `Substitute x = 8 into the expression:\n\nx = 5 + (10 - 8) * 2 = 5 + 2 * 2 = 5 + 4 = 9`,
    type: "mcq"
  },
  {
    question: `Fill in the Blank
<pre><code>rust
fn main(){
    let name = "Rust";
    let name = name.len();
}
</code></pre>
What Rust feature allows reusing the same variable name?`,
    options: ["Overloading", "Inheritance", "Shadowing", "Type casting"],
    answer: 2,
    explanation: "Rust allows the same variable name to be reused by redefining it — this is called shadowing. The original name was a &str, and it's now redefined as a usize after .len().",
    type: "mcq"
  },
  {
    question: `Error Finder
<pre><code>rust
fn main(){
    let mut x = 5;
    x = "five";
}
</code></pre>
What’s wrong with this code?`,
    options: ["mut is missing", "Type mismatch", "println! is missing", "No semicolon"],
    answer: 1,
    explanation: "You cannot assign a &str to a variable originally bound to an i32. Rust is strongly typed, and mutability doesn't allow type change — only value change of the same type.",
    type: "mcq"
  },
  {
    question: `MCQ
Which variable declaration is immutable?`,
    options: ["let a = 1;", "let mut b = 1;", "let mut c: i32 = 5;", "let mut a = \"hi\";"],
    answer: 0,
    explanation: "All `let` declarations are immutable by default unless declared with `mut`.",
    type: "mcq"
  },
  {
    question: `Can you reassign a value to a variable declared with let without mut?`,
    options: ["Yes", "No"],
    answer: 1,
    explanation: "No, unless you're using shadowing, which rebinds the name rather than changing the existing variable.",
    type: "mcq"
  },
  {
    question: `Predict the Output
<pre><code>rust
fn main() {
    let x: f64 = 5.75;
    let y: i8 = x as i8;
    let z = y.wrapping_add(127);

    println!("{}", z);
}
</code></pre>`,
    options: ["132", "-124", "Overflow Error", "5"],
    answer: 1,
    explanation: "`x is 5.75 → cast to i8 becomes 5 (fractional part is discarded).\n\ny = 5, then 5 + 127 = 132\n\nBut i8 can only hold values from -128 to 127, so 132 overflows.\n\n.wrapping_add(127) wraps the value: 132 as i8 = -124`",
    type: "mcq"
  },
  {
    question: `Fill in the Blank
<pre><code>rust
let pi = 3.14; // Inferred as ____
</code></pre>`,
    options: ["f64", "f32", "i32", "usize"],
    answer: 0,
    explanation: "In Rust, floating-point literals without suffixes default to `f64`, not `f32`. So 3.14 is inferred as a 64-bit float.",
    type: "mcq"
  },
  {
    question: `True or False
A variable declared as \`let x: char = 'R';\` is valid.`,
    options: ["True", "False"],
    answer: 0,
    explanation: "Rust’s char type represents a Unicode scalar value, written with single quotes. 'R' is a valid char.",
    type: "mcq"
  },
  {
    question: `Predict the Output
<pre><code>rust
fn main(){
    let logged_in = true;
    let has_permission = false;

    if logged_in && has_permission {
        println!("Access granted");
    } else {
        println!("Access denied");
    }
}
</code></pre>`,
    options: ["Access granted", "Access denied", "true", "Compile error"],
    answer: 1,
    explanation: "Both conditions in the && (logical AND) must be true. Here, has_permission is false, so the if condition fails, and it prints `Access denied`.",
    type: "mcq"
  },
  {
    question: `Which of the following type and value pairs are correct?
(Choose one)`,
    options: [
      'let flag: bool = "true";',
      "let n: i8 = 150;",
      "let letter: char = 'A';",
      "let temp: f32 = 98.6f64;"
    ],
    answer: 2,
    explanation: `'A' is a valid char.\n\nflag assigns a &str to a bool → wrong.\n\ni8 max is 127, so 150 overflows.\n\nf64 value can't be assigned to f32 without casting.`,
    type: "mcq"
  }
];

renderQuiz(quiz1, quiz1sectionTitles, [5]);
setupStartOnInteraction();