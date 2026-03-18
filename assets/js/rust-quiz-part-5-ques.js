const quiz5 = [
  { 
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let mut v = vec![1, 2, 3];
    v.insert(1, 10);
    println!("{:?}", v);
}</code></pre>
What does this code prints?`,
    options: ["[1,2,3,10]", "[1,10,2,3]", "[10,1,2,3]", "[1,2,10,3]"],
    answer: 1,
    explanation: "`insert(1,10)` inserts at index 1 and shifts later elements right."
  },
  {
    type: "mcq",
    question:
    `<pre><code>
fn main() {
    let mut v = vec![10, 20, 30];
    let x = v.remove(1);
    println!("{:?} {}", v, x);
}</code></pre>
What is the output of the code?`,
    options: ["[10, 30] 20", "[20, 30] 10", "[10, 20] 30", "[30] 20"],
    answer: 0,
    explanation: "`remove(1)` returns the element at index 1 and shifts remaining elements left."
  },
  {
    type: "mcq",
    question:
    `<pre><code>
fn main() {
    let mut v = vec![1,2,3];
    v.push(4);
    println!("{}", v.len());
}</code></pre>
Predict the output.`,
    options: ["3", "5", "compilation error", "4"],
    answer: 3,
    explanation: "`push(4)` adds a new element so the vector length becomes 4."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
use std::collections::HashMap;
fn main() {
    let mut map = HashMap::new();
    map.insert("a", 1);
    map.insert("a", 5);
    println!("{}", map["a"]);
}</code></pre>
What gets printed?`,
    options: ["5", "1", "Runtime panic", "Compilation error"],
    answer: 0,
    explanation: "Inserting the same key again replaces the previous value in a HashMap."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let arr = [1,3,5,7];
    println!("{}", arr.binary_search(&5).unwrap());
}</code></pre>
What is the output?`,
    options: ["3", "2", "panic", "5"],
    answer: 1,
    explanation: "`binary_search()` returns the index of the found element, not the value."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let v = vec![10,20,30];
    println!("{}", v[v.len()-1]);
}</code></pre>
What the code prints?`,
    options: ["20", "30", "10", "0"],
    answer: 1,
    explanation: "`len()` is 3 so len-1 gives index 2 which stores value 30."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let mut v = Vec::with_capacity(5);
    v.push(1);
    v.push(2);

    println!("{} {}", v.len(), v.capacity());
}</code></pre>
Predict the Output.`,
    options: ["2 5", "2 2", "5 5", "5 2"],
    answer: 0,
    explanation: "`with_capacity(5)` allocates space for 5 elements but the vector still contains only 2."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let v = [4,2,5,1,3];
    println!("{:?}", v.binary_search(&3).is_ok());
}</code></pre>
What happens?`,
    options: ["true", "panic", "false", "compilation error"],
    answer: 2,
    explanation: "`binary_search()` requires sorted data, so searching an unsorted array returns Err."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let mut v = Vec::with_capacity(1);
    v.push(1);
    v.push(2);

    println!("{}", v.capacity());
}</code></pre>
What does this prints?`,
    options: ["3", "4", "2", "0"],
    answer: 1,
    explanation: "Capacity grows exponentially when exceeded to reduce reallocations."
  },
  {
    type: "mcq",
    question: 
    `<pre><code>
fn main() {
    let v1 = vec![1,2,3];
    let v2 = v1.clone();

    println!("{}", v2.len());
}</code></pre>
What is the time complexity of clone()?`,
    options: ["O(1)", "O(log n)", "O(n²)", "O(n)"],
    answer: 3,
    explanation: "`clone()` copies every element of the vector so its time complexity is O(n)."
  },
  {
    type: "mcq",
    question: 
`Which operation is O(n log n)?`,
    options: ["v.last()", "v.sort()", "v.binary_search(&x)", "v.capacity()"],
    answer: 1,
    explanation: "Rust’s `sort()` uses an algorithm with average complexity O(n log n)."
  },
  {
    type: "mcq",
    question:
    `<pre><code>
fn main() {
    let mut v = vec![1,2,3,4,5];

    for i in 0..v.len() {
        v.remove(0);
    }
}</code></pre>
What is the time complexity of remove(0)?`,
    options: ["O(n²)", "O(1)", "O(n)", "O(n log n)"],
    answer: 0,
    explanation: "`remove(0)` shifts elements each time, repeated n times → O(n²)."
  },
  {
    type: "mcq",
    question:
    `<pre><code>
fn main() {
    let mut v = vec![1,2,3];
    v.resize(5,0);

    println!("{:?}", v);
}</code></pre>
What is the output?`,
    options: ["[0,0,1,2,3]", "[0,3,2,1,0]", "[1,0,0,2,3]", "[1,2,3,0,0]"],
    answer: 3,
    explanation: "`resize(5,0)` extends the vector to length 5 filling new positions with 0."
  },
  {
    type: "mcq",
    question:
    `<pre><code>
fn main() {
    let mut v = vec![1,2,3];
    v.reserve(10);

    println!("{}", v.capacity());
}</code></pre>
What does this prints?`,
    options: ["3", "10", "13", "≥13"],
    answer: 3,
    explanation: "`reserve(10)` ensures capacity is at least current length + 10, but may be higher."
  },
  {
    type: "mcq",
    question:
    `<pre><code>
fn main() {
    let mut v = vec![1,1,2,1,3];
    v.dedup();

    println!("{:?}", v);
}</code></pre>
What does this prints?`,
    options: ["[1,2,1,3]", "[1,2,3]", "[1,1,2,1,3]", "[1,3]"],
    answer: 0,
    explanation: "`dedup()` removes only consecutive duplicates, preserving non-adjacent ones."
  },  
];

renderQuiz(quiz5, quiz5sectionTitles, [5 , 7 , 3]);
setupStartOnInteraction();
