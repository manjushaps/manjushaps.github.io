---
layout: default
title: "Rust Basics Explained: Smarter Code with Control Flow and Functions"
date: 2025-07-14
author: manjushaps
categories: [Rust, Programming]
tags: [rust, rustlang, vscode, for, if, while, functions, match, systems-programming]
---

# 📄 Introduction
**Learn how Rust makes decisions, repeats logic smartly, and keeps your code clean using control flow and reusable functions**.

In [Rust Foundations](https://manjushaps.github.io/Rust-Series-Foundations/), we explored Rust's core data tools — **variables, mutability, shadowing, and data types**.

But real programs do more than store data — they make decisions, repeat logic, and organize behavior. That’s where **control flow and functions** come in.

In this post, you'll learn how to:
- Make choices with **if** and **match**
- Repeat tasks using **loop**, **while**, and **for**
- Build reusable blocks with the **fn** keyword

Each section includes:
- Real-world examples
- “Try It Yourself” mini challenges
- Key Rust features explained

Let’s begin with one of Rust’s simplest yet most powerful tools: **Conditional branching with if**.

---
## **if** Expressions – Make Decisions with Conditions
### 📁 Create a new project to explore *if*
Let’s start with a fresh Rust project to practice conditional branching using `if` expressions:
```
cargo new if_elseif_eg
cd if_elseif_eg
```

This creates a new folder with a basic Rust project and a starter **main.rs** file under the **src** directory. We'll use this file to explore how Rust handles decision-making using `if`, step by step.

***Screenshot :*** A new Rust project named **if_elseif_eg** has been successfully created.
<div style="text-align: center;">
<a href="/assets/images/if_elseif_new.png" target="_blank">
  <img src="/assets/images/if_elseif_new.png" alt="ifnew" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### ⁉️ Why *if* Matters in Rust
In any real-world program, we need logic to decide what happens next—whether it's a yes or no, a range check, or reacting to user input. In Rust, the `if` expression helps your program take decisions based on conditions.

Rust enforces that every condition must return a `bool`— no implicit 0 or 1 like in C/C++.

Let’s warm up with a practical example.

### 🔖 Keywords & Concepts Used in This Program
Here’s a quick breakdown of the key Rust elements used in this program:

| **Keyword**                    | **Concept**                                      |
| ------------------------------ | ------------------------------------------------ |
| `use std::io`                  | Imports Rust's input/output library              |
| `let mut temp = String::new()` | Declares a mutable string variable               |
| `read_line()`                  | Reads input from the terminal                    |
| `expect()`                     | Handles possible input errors (panics if failed) |
| `trim()`                       | Removes trailing newline from input string       |
| `if`, `else if`, `else`        | Controls branching logic based on condition      |
| `println!()`                   | Prints formatted output to the console           |

### Example: if Expression – Temperature Categorizer
Let’s now write a simple program that takes user input and tells if the day is **Hot, Warm, Cool, or Cold**.

***Screenshot :*** **`main.rs`** with code to categorize temperature
<div style="text-align: center;">
<a href="/assets/images/if_code.png" target="_blank">
  <img src="/assets/images/if_code.png" alt="ifcode" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

***Screenshot :*** VS code terminal output of temperature categorizer
<div style="text-align: center;">
<a href="/assets/images/if_output.png" target="_blank">
  <img src="/assets/images/if_output.png" alt="ifoutput" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 💭 Try it yourself
Let’s reinforce your learning with two small challenges using conditional branching `if`

{% include try_if.html %}

> In the next section, let’s look at how Rust keeps repeating tasks smartly — using `loop`, `while`, and `for`.

---

## **Loop** Forever? Not Without a break
### 📁 Create a new project to explore *loop*
> ⚠️ We repeat the project creation in each section to reinforce best practice — always start with a clean project when testing individual concepts in Rust.

Let’s create a new Rust project to explore how to repeat tasks using the `loop` expression — Rust’s way of writing infinite loops.
```
cargo new loop_eg
cd loop_eg
```

This creates a new folder with a basic Rust project and a starter **main.rs** file under the **src** directory. We'll use this file to explore how Rust handles **infinite looping** using **loop**, step by step.

***Screenshot :*** A new Rust project named **loop_eg** has been successfully created.
<div style="text-align: center;">
<a href="/assets/images/loop_new.png" target="_blank">
  <img src="/assets/images/loop_new.png" alt="loopnew" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### ⁉️ Why *loop* Matters
In Rust, **loop** is an infinite loop—it runs forever unless you **break** it manually.

This is useful when:
- You want to keep retrying (e.g., password prompts, login)
- You’re building games or input handlers
- When the number of repetitions isn’t known beforehand

Let’s build a fun logic game using **loop and break**.

### 🔖 Keywords & Concepts Used in This Program
Here’s a quick breakdown of the key Rust elements used in this program:

| **Keyword**                | **Concept**                                 |
| -------------------------- | ------------------------------------------- |
| `loop`                     | Starts an infinite loop                     |
| `break`                    | Stops the loop when condition is met        |
| `rand::Rng`, `gen_range()` | Generates random numbers                    |
| `let mut`                  | Declares a mutable score and input          |
| `read_line()` + `parse()`  | Reads and converts user input               |
| `match`                    | Handles input validation and error fallback |
| `if` / `else`              | Controls score increment or feedback logic  |
| `println!()`               | Prints messages and feedback to the user    |

### Example: Math Quiz – Break After 3 Correct Answers
To see `loop and break` in action, let’s build a small **Math Quiz** game. The program will:
- Keep asking random math questions
- Break the loop when the user answers 3 correctly

***Screenshot :*** **`main.rs`** with code for Math Quiz
<div style="text-align: center;">
<a href="/assets/images/loop_code.png" target="_blank">
  <img src="/assets/images/loop_code.png" alt="loopcode" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

***Screenshot :*** Terminal output of Math Quiz in VS Code
<div style="text-align: center;">
<a href="/assets/images/loop_output.png" target="_blank">
  <img src="/assets/images/loop_output.png" alt="loopoutput" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

> **Add the rand crate to *Cargo.toml***
>
> To generate random numbers, we need the `rand` crate. Open your **Cargo.toml** and add:

```toml
[dependencies]
rand = "0.8.5"  # Use the latest version

You can find the latest version from crates.io/crates/rand
```

***Screenshot :*** **`cargo.toml`** with **rand** dependency
<div style="text-align: center;">
<a href="/assets/images/toml_file.png" target="_blank">
  <img src="/assets/images/toml_file.png" alt="toml_file" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 💭 Try It Yourself
Let’s reinforce your learning with two small challenges using infinite `loop` and `break`.

{% include try_loop.html %}

> What if you don’t want to loop forever — but only as long as a condition holds true?

---

## **while** Loops – Repeat Based on a Condition
### 📁 Create a new project to explore *while*
Let’s start with a fresh Rust project to explore how to repeat a task while a condition holds true using `while` expressions:
```
cargo new while_eg
cd while_eg
```

This creates a new folder with a basic Rust project and a starter **main.rs** file under the **src** directory. We'll use this file to explore how Rust handles **repeat a task based on a condition** using **while**, step by step.

***Screenshot :*** A new Rust project named **while_eg** has been successfully created.
<div style="text-align: center;">
<a href="/assets/images/while_new.png" target="_blank">
  <img src="/assets/images/while_new.png" alt="toml_file" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### ⁉️ Why *while* Matters
Unlike loop, which repeats forever until you break, a while loop keeps running only as long as a condition is true.

It’s great when:
- You don’t know how many times to repeat
- You stop based on some dynamic or external condition
- You want cleaner and safer loops that won’t go infinite accidentally

Let’s build something meaningful with it.

### 🔖 Keywords & Concepts Used in This Program
Here’s a quick breakdown of the key Rust elements used in this program:

| **Keyword**                    | **Concept**                                              |
| -------------------------      | ---------------------------------------------------      |
| `use std::io`                  | Imports Rust's input/output library                      |
| `let mut n = String::new()` | Declares a mutable string variable                       |
| `read_line()`                  | Reads input from the terminal                            |
| `expect()`                     | Handles possible input errors (panics if failed)         |
| `trim()`                       | Removes trailing newline from input string               |
| `let mut a = 0/let mut b = 1`  | Declares mutable variables for sequence tracking         |
| `while condition`              | Repeats as long as `a` is less than or equal to n    |
| `print!()`                     | Prints the sequence on the same line                     |
| `a = b; b = a + b`             | Updates variables to get the next number in the sequence |

### Example: Fibonacci Series Generator
Generate the Fibonacci sequence until user limit using a `while` loop.

***Screenshot :***  **`main.rs`** with code for Fibonacci generator
<div style="text-align: center;">
<a href="/assets/images/while_code.png" target="_blank">
  <img src="/assets/images/while_code.png" alt="whilecode" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

***Screenshot :*** Terminal output of Fibonacci generator
<div style="text-align: center;">
<a href="/assets/images/while_output.png" target="_blank">
  <img src="/assets/images/while_output.png" alt="whileop" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 💭 Try it Yourself
Let’s reinforce your learning with two small challenges using repetitive task `while`.

{% include try_while.html %}

---

## **for** Loops – Iterate Over Ranges and Collections
### 📁 Create a new project to explore *for*
Let’s start with a fresh Rust project to practice iterative tasks using `for` over ranges and collections
```
cargo new for_eg
cd for_eg
```

This creates a new folder with a basic Rust project and a starter **main.rs** file under the **src** directory. We'll use this file to explore how Rust **iterates over ranges and collections** using the **for** loop, step by step.

***Screenshot :*** A new Rust project named **for_eg** has been successfully created.
<div style="text-align: center;">
<a href="/assets/images/for_new.png" target="_blank">
  <img src="/assets/images/for_new.png" alt="fornew" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### ⁉️ Why *for* Matters
Rust’s for loop is the cleanest way to repeat a task a specific number of times or iterate over a collection.

Use it when:
- You know exactly how many times to loop
- You want to loop over a list, range, or array
- You prefer concise and readable syntax

Let’s use it to display some cool number patterns.

### 🔖 Keywords & Concepts Used in This Program
Here’s a quick breakdown of the key Rust elements used in this program:

| **Keyword**                    | **Purpose**                                      |
| -----------------------        | --------------------------------------------     |
| `use std::io`                  | Imports Rust's input/output library              |
| `let mut n = String::new()`    | Declares a mutable string variable               |
| `read_line()`                  | Reads input from the terminal                    |
| `expect()`                     | Handles possible input errors (panics if failed) |
| `trim()`                       | Removes trailing newline from input string       |
| `for i in 1..=count`           | Loops from 1 to N (inclusive)                    |
| `let mut`                      | Mutable string for user input                    |
| `parse()`                      | Converts input string to number                  |
| `println!()` formatting        | Displays numbers with spacing and formatting     |

### Example: Display Cube and Square of N Numbers
Calculate cube and square of numbers specified by user using `for` loop.

***Screenshot :***  **`main.rs`** with code to calculate cube and square of numbers
<div style="text-align: center;">
<a href="/assets/images/for_code.png" target="_blank">
  <img src="/assets/images/for_code.png" alt="forcode" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

***Screenshot :*** Terminal output of cube and square in VS code
<div style="text-align: center;">
<a href="/assets/images/for_output.png" target="_blank">
  <img src="/assets/images/for_output.png" alt="forop" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 💭 Try it Yourself
Let’s reinforce your learning with two small challenges using **for** loop to perform repetitive tasks over ranges and values.

{% include try_for.html %}

---

## **match** – Pattern Matching the Rust Way
### 📁 Create a new project to explore *match*
Let’s start with a fresh Rust project to practice pattern matching using `match`
```
cargo new match_eg
cd match_eg
```

This creates a new folder with a basic Rust project and a starter **main.rs** file under the **src** directory. We'll use this file to explore how Rust matches patterns using the **match** expression, step by step.

***Screenshot :*** A new Rust project named **match_eg** has been successfully created.
<div style="text-align: center;">
<a href="/assets/images/match_new.png" target="_blank">
  <img src="/assets/images/match_new.png" alt="forop" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### ⁉️ Why *match* Matters
Rust’s `match` is a superpower. It's like a switch case in other languages — but safer, exhaustive, and more expressive.

Use it when:
- You want to compare a value against different patterns
- You want clean alternatives to messy if-else chains
- You’re handling user choices, enums, error types, or menu-driven programs

Let’s explore pattern matching with a fun example!

### 🔖 Keywords & Concepts Used in This Program
Here’s a quick breakdown of the key Rust elements used in this program:

| **Keyword**                    | **Concept**                                      |
| ------------------------------ | --------------------------------------------     |
| `use std::io`                  | Imports Rust's input/output library              |
| `let mut p = String::new()`    | Declares a mutable string variable               |
| `read_line()`                  | Reads input from the terminal                    |
| `expect()`                     | Handles possible input errors (panics if failed) |
| `trim()`                       | Removes trailing newline from input string       |
| `rand::Rng`, `gen_range(0..3)` | Randomly selects computer's choice               |
| `match (p, c)`                 | Matches tuple of player and computer choices     |
| `as_str()` and `trim()`        | Normalizes user input for comparison             |

### Example: Rock, Paper and Scissors - You vs Computer!
Let’s see how **match** can be used to compare multiple possibilities at once. We’ll build a fun game of Rock, Paper, Scissors — where you play against the computer!

***Screenshot :***  **`main.rs`** with code to play Rock, Paper and Scissors
<div style="text-align: center;">
<a href="/assets/images/match_code.png" target="_blank">
  <img src="/assets/images/match_code.png" alt="matchcode" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

***Screenshot :*** Terminal output of match expression game
<div style="text-align: center;">
<a href="/assets/images/match_output.png" target="_blank">
  <img src="/assets/images/match_output.png" alt="matchop" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

> **Add the rand crate to *Cargo.toml***
>
> To generate random numbers, we need the `rand` crate. Open your **Cargo.toml** and add:

```toml
[dependencies]
rand = "0.8.5"  # Use the latest version

You can find the latest version from crates.io/crates/rand
```

***Screenshot :*** **`cargo.toml`** with **rand** dependency
<div style="text-align: center;">
<a href="/assets/images/match_toml.png" target="_blank">
  <img src="/assets/images/match_toml.png" alt="toml_file" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 💭 Try it Yourself
Let’s reinforce your learning with two small challenges using `match` .

{% include try_match.html %}

---

## **Functions** – Reusable Building Blocks in Rust
### 📁 Create a New Project to Explore *fn* Functions
Let’s start with a fresh Rust project to practice writing and calling functions using the `fn` keyword.
```
cargo new func_eg
cd func_eg
```

This creates a new folder with a basic Rust project and a starter **main.rs** file under the **src** directory. We'll use this file to explore how Rust lets you define modular, reusable blocks of logic using functions, step by step — with and without return values.

***Screenshot :*** A new Rust project named **func_eg** has been successfully created.
<div style="text-align: center;">
<a href="/assets/images/func_new.png" target="_blank">
  <img src="/assets/images/func_new.png" alt="funcnew" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### ⁉️ Why *fn* Matters
Functions let you:
- Group code into named, reusable blocks
- Keep logic clean and modular
- Pass data (parameters) and get results (return values)

Rust uses `fn` to declare functions. Let’s build one with inputs, returns, and logic!

### 🔖 Keywords & Concepts Used in This Program
Here’s a quick breakdown of the key Rust elements used in this program:

| **Keyword**                     | **Concept**                                      |
| ---------------------------     | -------------------------------------------      |
| `use std::io`                   | Imports Rust's input/output library              |
| `let mut shape = String::new()` | Declares a mutable string variable               |
| `read_line()`                   | Reads input from the terminal                    |
| `expect()`                      | Handles possible input errors (panics if failed) |
| `trim()`                        | Removes trailing newline from input string       |
| `fn function_name()`            | Declares a named function                        |
| `-> f32`                        | Return type of the function                      |
| `match` with function calls     | Calls specific area function based on shape      |
| `String::new()`                 | Mutable input variable                           |
| `parse::<f32>()`                | Convert input string to floating point           |

### Example: Area Calculator – Square, Rectangle, Triangle
Let’s see how `fn` can be used to reuse logic cleanly. We’ll build an area calculator that asks for a shape and uses a function for each shape to compute the area

***Screenshot :***  **`main.rs`** with code to calculate area of square, rectangle and triangle
<div style="text-align: center;">
<a href="/assets/images/func_code.png" target="_blank">
  <img src="/assets/images/func_code.png" alt="funccode" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

***Screenshot :*** Terminal output of area of different shapes
<div style="text-align: center;">
<a href="/assets/images/func_output.png" target="_blank">
  <img src="/assets/images/func_output.png" alt="funcop" width="400" />
</a>
<p><em>Click the image to view full size</em></p></div>

### 💭 Try it Yourself
Let’s reinforce your learning with two small challenges using reusable logic `fn`

{% include try_fn.html %}

---

# 🎯 Conclusion – You've Built the Core!
You've just completed one of the most empowering stages of your Rust journey!

In this post, you didn't just learn control flow and functions — you actually used them to build mini tools, games, and interactive apps. From branching logic with `if` and `match`, to loops that think (`loop`, `while`, `for`), and clean, reusable `fn` functions — you now hold the real levers of Rust’s logic engine.

Each section you've explored lays another brick in your foundational wall:
- Logic with **if-else**, power with **loop / while / for**
- Elegance through **match**
- Reusability via **functions**
- Real interaction with **user input**

> Try revisiting any section or challenge if you want to deepen your understanding — and feel free to share your favorite mini project or a new twist of your own!

***Next on Techn0tz*** - <br>
**Rust Foundations – Part 3: Bringing It All Together**,
we’ll bring all your new Rust skills together to build a complete, meaningful project — from input to output, decision to display.

> **Stay tuned — your first full Rust program awaits!**
