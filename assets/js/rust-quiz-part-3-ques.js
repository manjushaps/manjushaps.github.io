const quiz3 = [
  { 
    type: "mcq",
    question: `<pre><code>rust
    let s = String::from("Rust");
    let s = s.len();

    println!("{}", s);
    </code></pre>
    What does it print? `,
    options: ["Rust", "4", "Compile error", "0"],
    answer: 1,
    explanation: "Second 's' shadows the first and stores the length (usize). So it prints 4."
  },

  { 
    type: "mcq",
    question: `<pre><code>rust
    let s = String::from("Hello");
    {
        let r = &s;
    }

    println!("{}", s);
    </code></pre>
    What is the result? `,
    options: ["Hello", "Compile error", "Nothing", "Panic"],
    answer: 0,
    explanation: "The borrow ends when the inner scope ends, so 's' is usable again."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    let s1 = String::from("Hi");
    let s2 = s1.clone();

    println!("{} {}", s2.len(), s1);
    </code></pre>
    What is the output? `,
    options: ["Hi 2", "Hi Hi", "2 Hi", "2 2"],
    answer: 2,
    explanation: "clone() creates a copy. s1 prints string, s2.len() prints the number."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    let mut s = String::from("A");
    {
        let r = &mut s;
        r.push('B');
    }

    println!("{}", s);
    </code></pre>
    Predict the Output. `,
    options: ["A", "AB", "Compile error", "Panic"],
    answer: 1,
    explanation: "Mutable borrow modifies the original string. Borrow ends → safe to print."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    let s = String::from("Rust");
    let t = s;
    let s = "New";
    println!("{}", s);
    </code></pre>
    What does it print? `,
    options: ["Rust", "New", "Compile error", "Panic"],
    answer: 1,
    explanation: "The original 's' moved to 't'. Then new ‘s’ shadows with &str. Old move irrelevant."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    fn show(s: &String) {
        println!("{}", s);
    }

    let s = String::from("Rust");
    show(&s);

    println!("{}", s);
    </code></pre>
    What is the output? `,
    options: ["Panic", "Compile error", "Only one Rust", "Rust Rust"],
    answer: 3,
    explanation: "Function borrows the string. Ownership is not moved."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    struct A(&'static str);

    impl Drop for A {
        fn drop(&mut self) {
            println!("{}", self.0);
        }
    }

    let a = A("first");
    let b = A("second");
    </code></pre>
    What prints when the scope ends? `,
    options: ["first second", "second first", "nothing", "random"],
    answer: 1,
    explanation: "Rust drops variables in reverse order of creation (stack order)."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    struct User {
        name: String,
        age: u8,
    }

    let u = User {
        name: String::from("Sam"),
        age: 20,
    };

    let name = u.name;

    println!("{}", u.age);
    </code></pre>
    What is the result? `,
    options: ["Sam", "Compile error", "20", "Panic"],
    answer: 2,
    explanation: "Only the 'name' field is moved. Other fields remain accessible (partial move)."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    let result;

    {
        let s = String::from("Hi");
        result = &s;
    }

    println!("{}", result);
    </code></pre>
    Predict the output? `,
    options: ["Hi", "Compile error", "empty", "Panic"],
    answer: 1,
    explanation: "Reference would outlive 's'. Borrow checker prevents dangling reference."
  },

  {
    type: "mcq",
    question: `<pre><code>rust
    fn pick<'a>(a: &'a str, b: &'a str) -> &'a str {
        a
    }

    let s1 = String::from("long");
    let result;

    {
        let s2 = String::from("short");
        result = pick(&s1, &s2);
    }

    println!("{}", result);
    </code></pre>
    Which value survives? `,
    options: ["short", "Compile error", "long", "Panic"],
    answer: 2,
    explanation: " Even though both lifetimes are 'a, the function always returns a (s1).  So, result never references s2. It’s safe and prints \"long\"."
  }
];

renderQuiz(quiz3, quiz3sectionTitles, [5]);
setupStartOnInteraction();

