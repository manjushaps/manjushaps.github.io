---
layout: default
title: "Git Series: Part 3 - Branching and Merging"
date: 2025-05-02
author: manjushaps
categories: Git 
tags: [Git, Git Series, Branching, Merging, Workflow]
---

# 📁How Git stores Data?
Before diving into branching, it's important to understand how Git stores your project.
Unlike some older version control systems, Git doesn’t store data as a series of changesets or differences. Instead, it stores your project as a series of snapshots.

Each time you commit, Git captures the full state of your project — like taking a photo of all your files at that moment.

But a commit does more than just save a message. It also records the complete snapshot, links to its parent commit, and silently builds the structure that makes branching possible.

This creates a chain — each commit pointing to the one before it — forming a structure called a **Directed Acyclic Graph (DAG)**.

For example.. **`[C0]<--[C1]<--[C2]....`** (C - commits, C0 is the initial commit, C1 is the next and so on)

---

# 📌Commit internals
With that foundation, it’s time to explore what actually makes up a Git commit.

Behind every commit is a compact data structure that stores your project’s snapshot, tracks changes over time, and links everything together. Understanding this internal structure helps you see how branching — and Git’s powerful history tracking — works under the hood.

When you run **git commit**, Git creates a commit object that includes:
- *A pointer to a tree* - The tree object represents the snapshot of your project directory.It also maps file names to blobs (file contents) and subfolders to other trees.
- *Parent commit* - The parent commit is just a pointer (a SHA-1 hash) to the previous commit(s).Each commit (except the first) points back to at least one parent and a merge commit has multiple parents.
- *Metadata* - Author name, email, timestamp and committer info (can be different)
- *Commit message* - The message  for the commit given in **git commit -M message**

*For example if you commit three files, the Git repository contains five objects:*
- **Three Blobs:** These blobs represent the contents of each file.
- **One tree:** This tree object holds the folder structure and file names.
- **One commit:** The commit object points to the tree and stores metadata like the author, commit message, and timestamp.

<img src="{{ site.baseurl }}/assets/images/commit_internals.png" alt="commit_internals" width="500" height="auto">

## 🔃 Subsequent Commit with Changes

When you modify one of the files and commit again, Git handles the changes efficiently:

- *New Blob for the modified file:* A new blob is created for the modified file, containing only the changes.
- *Reused Blobs for unchanged files:* Git reuses the blobs for the files that haven't been modified, saving space and processing time.
- *New Tree:* A new tree object is created that points to the correct mix of old and new blobs. This ensures the updated file structure reflects the changes.
- *New Commit Object:* A new commit object is created, pointing to the new tree. It also points to the previous commit as its parent, preserving the commit history.

## 🗒️ Branching and the Role of HEAD
The **main branch (and HEAD)** points to the latest commit, effectively continuing the chain of commits. This structure — consisting of snapshots (blobs), directories (trees), and commit objects — is what makes Git branching so fast and powerful. Each new commit doesn’t duplicate data but rather builds upon the existing objects, making the entire process efficient and scalable.

---

# 🔗 Git Branching and Merging
Git branching is a powerful feature that allows you to develop features, fix bugs, or experiment with new ideas in isolation — without affecting the main codebase.

A **branch in Git** is essentially a lightweight pointer to a specific commit. When you create a new branch, you're starting a separate line of development, allowing you to make changes independently of the default branch (often called main or master).

Each time you commit on a branch, the branch pointer (e.g., main or feature-xyz) automatically advances to point to the latest commit. This way, Git tracks the evolution of that branch as development continues.

**Merging in Git** combines the changes from one branch (like feature) into another (like main) by creating a merge commit that links the histories of both branches.

The diagram below illustrates how Git handles branching and merging, starting from a common base commit and progressing through independent development on a feature branch:

<img src="{{ site.baseurl }}/assets/images/Git_branching_eg.png" alt="Branching_eg" width="500" height="auto">

The table below shows a typical workflow and commit relationships

| **Commit** | **Branch**  | **Parent(s)**        | **Explanation**                                            |
|------------|-------------|----------------------|-----------------------------------------------------------|
| A          | main        | initial commit       | First commit in the repo                                                       |
| B          | main        | A                    | B is the next commit after A                                                          |
| C          | main        | B                    | C follows B; the point where feature branch is created                                                    |
| D          | feature     | C                    | First commit on `feature`, created from `main` at C                                                          |
| E          | feature     | D                    | Continues work in `feature` branch                                                     |
| F          | main        | C, E                 | Merge commit: merges `feature` back into `main`                                                     |

---

# 📜 Git Branching and Merging commands

| **Command**                     | **Description**                                 |
|---------------------------------+-------------------------------------------------|
| `git branch`                    | Lists all local branches in the repository      |
| `git branch <branch-name>`      | Creates a new branch                            |
| `git checkout <branch-name>`    | Switches to the specified branch                |
| `git switch <branch-name>`      | Alternative to checkout (modern & safer)        |
| `git checkout -b <branch-name>` | Creates and switches to a new branch            |
| `git switch -c <branch-name>`   | Equivalent to the above (more readable syntax)  |
| `git branch -d <branch-name>`   | Deletes a local branch (only if it's merged)    |
| `git branch -D <branch-name>`   | Force-deletes a local branch (even if unmerged) |

| **Command**                       | **Description**                                           |
|-----------------------------------+-----------------------------------------------------------|
| `git merge <branch-name>`         | Merges the given branch into the current branch           |
| `git merge --no-ff <branch-name>` | Creates a merge commit even if a fast-forward is possible |
| `git log --graph --oneline`       | Shows a visual history of commits with branches/merges    |

---

# 💡Branching and Merging in Action: A Snapshot Example
Below is a snapshot demonstrating how branching and merging work using Git commands.

![branching_eg2]({{ site.baseurl}}/assets/images/branching_eg2.png)
![branching_eg1]({{ site.baseurl}}/assets/images/branching_eg1.png)

## ✅ Result
You can use the **`start index.html`** command (on Windows) to open the developed HTML page in your default browser and check if the merged content displays correctly.

---

# 📃 Conclusion
Branching and merging are powerful features of Git that help you work on different tasks without affecting the main code. By creating branches, you can develop features safely, and by merging, you bring everything back together. With regular practice, these commands will become second nature and make your workflow smoother and more organized.

---

## 🧠 TechNuggetz - Did you know?
>
> 🔧 A **hotfix branch** is a special-purpose Git branch used to quickly patch a bug in production without waiting for ongoing development to finish.
>
> 🔍 Clean up merged branches using **`git branch -d branch_name (or -D to force)`**.
>
> ⛓️‍💥 Use **merge** for team work, **rebase** for cleaner individual history.
>
> 💭 **`git log --oneline --decorate`** can also be used to view branches and merges
>
> 🧭 **`git switch`** is a newer and clearer alternative to **`git checkout`** for switching branches.

---

## 🔜 Next on Techn0tz
*Developing a GitHub page using Jekyll on windows*
