---
layout: default
title: "Git Series: Part 1 - Local Version Control"
date: 2025-04-25
author: manjushaps
categories: Git 
tags: [Git, Git Series, Version Control, Local Repository, Beginners]
---

# 🚀 From VCS to Git

In the last post, we explored Version Control System and their types — CVCS and DVCS. Now, let’s zoom into the most popular DVCS tool in the world: **Git** — and see how it powers modern development.

---

# 📜 What is Git?

Git is open source Distributed Version Control Sytem which allows developers
- Track changes in code over time
- Collaborate seamlessly with teammates
- Create branches for experimental study
- Roll back to previous versions when things goes wrong

> ⌛Think of Git as your **projects time machine** - but smarter, faster and made for team work

---

# 🎯 Core Components Git and LVC worflow

The Git workflow is a step-by-step process that defines how changes in a project move from your local machine to a shared, remote repository like GitHub. Mastering this flow helps you collaborate smoothly and  manage versions efficiently.

**This post explains about Git basics and how the files are committed locally**

The core components of LVC worflow are: **Working Directory, Staging Area, Local Repository**. Understanding how files move through these stages are essential.


<img src="{{ site.baseurl }}/assets/images/LVC_workflow.png" alt="LVC Workflow" width="500" height="auto">


The diagram above outlines the LVC process. Now, let’s explore each stage and see how your local project files eventually become committed, shared history.

## 📂 Working Directory

This is the local folder on your computer where you edit and work on your project files 

- **`git init`** command - Intializes a Git repository
  - The Git starts tracking the specified folder as a Git project- in other words, your plain folder(working directory) is converted into .Git project
  - Creates a hidden **.git.** folder in the working directory
  - This .git/  folder contains everything that Git needs to track your project (eg. commit, branch, logs etc)
  - Your **working directory stays the same**, but now Git is watching for changes
  
## 🗃️ Staging Area

The staging area (index) is like a holding zone- where Git gathers all the changes that you want to commit

- **`git add`** command - moves the changes from working directory to the staging area
  - **`git add filename`** - Adds a specific file to the staging area
  - **`git add .`** - Adds all the modified files in the folder

## 📁 Local Repository 

The local repository is the **.git directory**- which is the Git's repository storage

- `git commit` command - the changes from the staging area are permanently stored in the repository
  - The repository is located inside the hidden **.git/** folder- the one created by **`git init`**
  - The .git directory contains all the commits, project history, branches, logs etc

# 💡Example Snapshot: From init to commit in LVC

The snapshot below provides a practical example of how to create a new directory, initialize a Git repository, and set up local version control. It will walk you through the essential steps, including adding files to the staging area, committing changes, and managing version history on your local machine. By following along, you'll gain hands-on experience in using Git for efficient source code management.


![LVC_example]({{ site.baseurl }}/assets/images/LVC_snapshot.png)

---

## 🧠 TechNuggetz - Did you Know?

> ⌛ **Git** was built by **Linus Torvalds - Founder of Linus** in just 2 weeks in 2005 - Iconic!
>
> ☑️ **Git** knows everything locally, it dosen't need internet to track changes - from version history, staging and committing - everithing happens in your local machine.
>
> ❌ Made a mistake? **`git checkout -- filename`** - restores a file to its last committed state
>
> 🗂️ Track only what matters! Use a **`.gitignore`** file to prevent sensitive data (like passwords, logs, or config files) from slipping into your commits. A cleaner repo is a safer repo!
>
> 🪄 Autosave magic! Use **`git stash`** to save your work-in-progress without a commit. Come back later with **`git stash pop`** and pick up right where you left off!

Continue.. **👉 To push your Git project to Remote repository like GitHub [Part-2:Remote-repository]({{ site.baseurl }}/git/2025/04/25/Git-Series-Part-2)**

***Happy Learning!***
