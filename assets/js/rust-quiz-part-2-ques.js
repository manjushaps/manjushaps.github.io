const questions = [
// We'll fill these in together next: each item will include
// { question: "", options: [], answer: "", explanation: "" }
//----------------SECTION C: Control Flow – Clever Twists(Q11–15)-----------------
  {
    question: `Output Puzzle  
<pre><code>rust
fn main(){
    for i in 1..=2 {
        for j in 1..=i {
            print!("{}", j);
        }
    }
}
</code></pre>
What is the output?`,
    options: ["121", "112", "123", "11"],
    answer: "112",
    explanation: "`The outer loop runs i from 1 to 2.\n\nWhen i = 1: inner loop runs once → prints 1.\n\nWhen i = 2: inner loop runs j = 1, 2 → prints 12.\n\nCombined output: 1 + 12 = 112`",
    type: "mcq"
  },
  {
    question: `Error Spotting  
<pre><code>rust
fn main(){
    let mut x = 0;
    loop {
        x += 1;
        break;
        println!("{}", x);
    }
}
</code></pre>  
Why does this cause a warning?`,
    options: [
      "println! is incorrect",
      "x is never used",
      "loop requires return",
      "Line after break is unreachable"
    ],
    answer: "Line after break is unreachable",
    explanation: "The \`println!\` is placed after \`break\`, so it will never execute. Rust warns that the line is unreachable.",
    type: "mcq"
  },
  {
    question: `Predict the Output  
<pre><code>rust
fn main(){
    for i in 0..=10 {
        if i % 2 == 0 {
            println!("{}", i);
        }
    }
}
</code></pre>`,
    options: [
      "1 2 3 4 5 6 7 8 9",
      "0 2 4 6 8",
      "1 3 5 7 9",
      "0 2 4 6 8 10"
    ],
    answer: "0 2 4 6 8 10",
    explanation: "The range is 0..=10, which includes 10. Only even numbers are printed → 0, 2, 4, 6, 8, 10.",
    type: "mcq"
  },
  {
    question: `Find the Output  
<pre><code>rust
fn main(){
    let day = 5;
    let kind = match day {
        1..=5 => "Workday",
        5..=7 => "Late Week",
        _ => "Unknown",
    };
    println!("{}", kind);
}
</code></pre>`,
    options: [
      "prints \"Workday\" with a overlap warning",
      "prints \"Late Week\" with a overlap warning",
      "prints \"Workday\" with no warnings",
      "prints \"Late Week\" with no warnings"
    ],
    answer: "prints \"Workday\" with a overlap warning",
    explanation: "Since 5 is in both 1..=5 and 5..=7, Rust matches the first arm and prints `Workday`, but warns about overlapping match ranges.",
    type: "mcq"
  },
  {
    question: `What is the value of result?  
<pre><code>rust
fn main(){
    let result = loop {
        let x = 5;
        if x > 0 {
            break x * 2;
        }
    };
}
</code></pre>`,
    options: ["15", "5", "10", "0"],
    answer: "10",
    explanation: "The loop breaks immediately with \`x * 2 = 10\`, and assigns it to result.",
    type: "mcq"
  },
  //-----------------SECTION D: Functions – Reasoning & Recursion (Q16–20)---------------
  {
  question: `Predict the Return  
<pre><code>rust
fn double(x: i32) -> i32 {
    x * 2
}
fn triple(x: i32) -> i32 {
    return x * 3;
}
</code></pre>
Which function ends with an explicit return?`,
  options: ["double", "triple", "Both", "Neither"],
  answer: "triple",
  explanation: "In Rust, the absence of a ; means an implicit return.\n\ndouble uses an implicit return (x * 2).\n\ntriple uses an explicit return with the return keyword.\n\nThe question specifically asks for an explicit return.",
  type: "mcq"
  },
  {
  question: `Fill in the Function Header  
<pre><code>rust
fn greet(______) {
    println!("Hi {}", name);
}
</code></pre>
What goes in the blank to accept a name?`,
  options: ["&name: str", "name: str", "name: &str", "name: String"],
  answer: "name: &str",
  explanation: "The function wants to borrow a string slice, not take ownership.\n\n`&str` is a common and efficient way to pass read-only string data.\n\nSo, the complete header becomes: \`fn greet(name: &str)\`.",
  type: "mcq"
  },
  {
  question: `Find the Bug  
<pre><code>rust
fn factorial(n: u32) -> u32 {
    if n == 0 {
        1
    } else {
        n * factorial(n - 1)
    }
}
</code></pre>  
What happens if \`factorial(-1)\` is called?`,
  options: ["Returns 1", "Panics at compile time", "Returns 0", "Compile-time error – mismatched types"],
  answer: "Compile-time error – mismatched types",
  explanation: "`-1` is an `i32`, while the function expects `u32`. The compiler throws a type mismatch error.",
  type: "mcq"
  },
  {
  question: `Predict Output  
<pre><code>rust
fn value() -> i32 {
    let x = 5;
    if x > 3 {
        return 10;
    }
    20
}
</code></pre>
What will be printed?`,
  options: ["10", "20", "5", "Error"],
  answer: "10",
  explanation: "The `if` condition is true, so `return 10;` is executed, and `20` is below `if`, it's never reached.",
  type: "mcq"
  },
  {
  question: `Short Answer – Use of \`->\`  
What does the arrow \`->\` mean in a function signature?`,
  options: ["Function type", "Reference", "Ownership", "Return type"],
  answer: "Return type",
  explanation: "In Rust, `->` specifies the return type of a function.\n\nExample: \`fn square(n: i32) -> i32\` says the function returns an i32.",
  type: "mcq"
  },
  //--------------------SECTION E: GUI with eframe + egui (Q21–25)-----------------
  {
  question: `Behavior Logic  
<pre><code>rust
if ui.button("Add").clicked() {
    self.total += 1;
}
</code></pre>
If \`.clicked()\` is removed, what happens?`,
  options: ["Button disappears", "Nothing happens", "Code runs every frame", "App closes"],
  answer: "Code runs every frame",
  explanation: "Without `.clicked()`, the button creation itself becomes an immediate expression, and the block executes on every frame.",
  type: "mcq"
  },
  {
  question: `Predict UI Result  
<pre><code>rust
ui.text_edit_singleline(&mut self.name);
if self.name.is_empty() {
    ui.label("Please enter your name");
}
</code></pre> 
What happens when the user clears the text field?`,
  options: ["App crashes", "Nothing happens", "A warning label is shown", "Button is disabled"],
  answer: "A warning label is shown",
  explanation: "When `self.name` is empty, the condition is true, and `ui.label()` shows the message.",
  type: "mcq"
  },
  {
  question: `Fill the Code  
<pre><code>rust
ui.____(&mut self.age);
</code></pre>  
Which widget fits to accept numeric input?`,
  options: ["checkbox", "add(DragValue::new(&mut self.age))", "text_edit_multiline", "button"],
  answer: "add(DragValue::new(&mut self.age))",
  explanation: "`DragValue` is used in `egui` to input or increment numbers with a slider/spinner.",
  type: "mcq"
  },
  {
  question: `Concept Logic  
In eframe, the \`update()\` function runs:`,
  options: ["Every frame / tick", "Only on user input", "Once at start", "Only after clear()"],
  answer: "Every frame / tick",
  explanation: "`update()` is the heart of the eframe app and runs continuously every frame to redraw the UI.",
  type: "mcq"
  },
  {
  question: `Debugging GUI State  
<pre><code>rust
if ui.button("Show").clicked() {
    println!("{}", self.name);
}
</code></pre>  
Why might \`self.name\` print an empty string?`,
  options: ["ui.label is not used", "Rust doesn't support printing", "self.name was never modified", "name is a reserved word"],
  answer: "self.name was never modified",
  explanation: "If the user didn't type anything or `text_edit_singleline()` was missing, `self.name` remains empty.",
  type: "mcq"
  }
];

renderQuiz(2);
setupStartOnInteraction();