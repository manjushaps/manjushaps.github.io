const quiz4 = [

{
  
  type: "mcq",
  question: `Which Rust snippet prints:
  <pre>
  *
  **
  ***
  ****
  </pre>`,
  options: [
  `<pre><code>
  for i in 1..=4 {
    println!("{}", "*".repeat(i));
  }
  </code></pre>`,
  `<pre><code>
  for _ in 1..=4 {
    println!("{}", "*".repeat(4));
  }
  </code></pre>`,
  `<pre><code>
  for i in 1..=4 {
    println!("{}", std::iter::repeat("*").take(4).collect::<String>());
  }
  </code></pre>`,
  `<pre><code>
  println!("{:>4}", "*");
  </code></pre>`
  ],
  answer: 0,
  explanation: "repeat(i) prints increasing number of stars for each row."
},


{
  type: "mcq",
  question: `<pre><code>
  let s = "rust".to_string();
  </code></pre>
  Which snippet prints: tsur ?`,
  options: [
  `<pre><code>println!("{}", s);</code></pre>`,
  `<pre><code>println!("{}", s.chars().rev().collect::&lt;String&gt;());</code></pre>`,
  `<pre><code>println!("{}", s.len());</code></pre>`,
  `<pre><code>println!("{}", s.to_uppercase());</code></pre>`
  ],
  answer: 1,
  explanation: "chars().rev() reverses the string and collect() rebuilds it."
},


{ 
  type: "mcq",
  question: `<pre><code>
  let nums = vec![2, 4, 6];
  </code></pre>
  Which snippet prints the sum (12)?`,
  options: [
  `<pre><code>println!("{}", nums.len());</code></pre>`,
  `<pre><code>println!("{}", nums.iter().sum::&lt;i32&gt;());</code></pre>`,
  `<pre><code>println!("{}", nums[0]);</code></pre>`,
  `<pre><code>println!("{:?}", nums);</code></pre>`
  ],
  answer: 1,
  explanation: "iter().sum() adds all numbers inside the vector."
},


{ 
  type: "mcq",
  question: `Which Rust snippet prints:
  <pre>
  1
  12
  123
  1234
  </pre>`,
  options: [
  `<pre><code>
  for i in 1..=4 {
    for j in 1..=i {
      print!("{}", j);
    }
    println!();
  }
  </code></pre>`,
  `<pre><code>println!("1234");</code></pre>`,
  `<pre><code>
  for i in 1..=4 {
    println!("{}", i);
  }
  </code></pre>`,
  `<pre><code>println!("{:?}", i);</code></pre>`
  ],
  answer: 0,
  explanation: "Outer loop controls rows, inner loop prints numbers up to i."
},


{
  type: "mcq",
  question: `Given:
  <pre><code>
  let nums = vec![1,2,3,4,6];
  </code></pre>

  Which snippet prints the missing number (5)?`,
  options: [
  `<pre><code>
  println!("{}", nums.iter().sum::\<i32\>());
  </code></pre>`,
  `<pre><code>
  for i in 1..=6 {
    if !nums.contains(&i) {
      println!("{}", i);
    }
  }
  </code></pre>`,
  `<pre><code>
  println!("{}", nums.len());
  </code></pre>`,
  `<pre><code>nums.sort(); </code></pre>`
  ],
  answer: 1,
  explanation: "Checks each number and prints the one not present in the vector."
},

{
  
  type: "mcq",
  question: "Rust code can run directly inside browsers using:",
  options: ["JVM", "WebAssembly", "NodeJS", "Docker"],
  answer: 1,
  explanation: "Rust compiles to WebAssembly (WASM) for near-native browser performance."
},

{
  type: "mcq",
  question: "Amazon built its AWS Lambda microVM using Rust. What is it called?",
  options: ["Nitro", "Firecracker", "LambdaCore", "MiniVM"],
  answer: 1,
  explanation: "Firecracker is a Rust-based microVM powering AWS serverless infrastructure."
},

{ 
  type: "mcq",
  question: "Rust support was officially added to which major system recently?",
  options: ["Chrome browser", "Docker engine", "GitHub CLI", "Linux kernel"],
  answer: 3,
  explanation: "Rust modules are now accepted directly in the Linux kernel."
},

{
  type: "mcq",
  question: "Which blockchain ecosystem heavily uses Rust for smart contracts/programs?",
  options: ["Bitcoin", "Ethereum", "Solana", "Hyperledger"],
  answer: 2,
  explanation: "Solana programs are primarily written in Rust."
},

{
  type: "mcq",
  question: "Which popular developer search tool is written in Rust?",
  options: ["grep", "ack", "ripgrep", "sed"],
  answer: 2,
  explanation: "ripgrep (rg) is a very fast Rust-based search tool."
},

{
  type: "mcq",
  question: "Which high-performance Rust web framework is commonly used for APIs?",
  options: ["Rocket", "Actix Web", "Flask", "Laravel"],
  answer: 1,
  explanation: "Actix Web is known for extremely fast async performance."
},

{
  type: "mcq",
  question: "Rust is officially supported in which mobile OS system components?",
  options: ["iOS only", "Android (AOSP)", "Windows Phone", "None"],
  answer: 1,
  explanation: "Google uses Rust in Android system components for memory safety."
},

{
  type: "mcq",
  question: "Which open-source search engine is written in Rust?",
  options: ["Meilisearch", "Sphinx", "Lucene", "Solr"],
  answer: 0,
  explanation: "Meilisearch — a full-text search engine written in Rust."
},

{
  type: "mcq",
  question: "Which modern runtime/tool below is written largely in Rust?",
  options: ["NodeJS", "Deno", "Composer", "Gradle"],
  answer: 1,
  explanation: "Deno uses Rust (with V8) for its secure runtime implementation."
},

{
  type: "mcq",
  question: "Which Rust-native engine is gaining popularity for modern 2D/3D game development?",
  options: ["Unity", "Unreal", "Bevy", "Godot"],
  answer: 2,
  explanation: "Bevy is a fast-growing ECS-based game engine built entirely in Rust."
}

];

renderQuiz(quiz4, quiz4sectionTitles, [5 , 10]);
setupStartOnInteraction();