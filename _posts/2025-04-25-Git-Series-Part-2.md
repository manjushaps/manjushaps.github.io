---
layout: default
title: "Git Series: Part 2 - Remote repository - GitHub"
date: 2025-04-25
author: manjushaps
categories: Git 
tags: [Git Series, Git, GitHub, Remote Repository, Workflow]
---

## 🔗 Missed Part-1 ?
👉 Checkout **[Git Series: Part1 - Local Version Control]({{ site.baseurl}}/git/2025/04/25/Git-Series-Part-1)** to get familiar with the basics of Git and how local version control works

---

# 🗺️ Remote Repository
## 🔄 Connecting Your Local Repository to GitHub
Once you've committed your changes locally, the next step is to upload (push) your code to GitHub so it's safely stored online and ready to share or collaborate

## 🆕 Creating a new repository on GitHub
- Go to **https://github.com**
- Click on ➕ New repository
- Fill in:
  - Repository name (e.g., my-demo-project)
  - Choose Public or Private
  - DO NOT check "Initialize this repository with a README" (since you already have local files)
- Click Create repository

## 💻 Link Repo to GitHub and pushing to remote repository

- Before pushing to GitHub, use **`git branch -M main`** command - to rename Git's default branch **master to main**
  - Git defaults to master, but GitHub uses main, so renaming it helps avoid conflicts when pushing to GitHub.
- **`git remote add origin https://github.com/your-username/my-demo-project.git`** command- Git adds a new connection to the remote repo
  -  *Replace URL with your actual repository URL*
- **`git push -u origin main`** command - the changes that are committed locally are sent to the *main branch* of your GiHub's repository
  - -u or --set upstream is used only for initial push
  - Next time when you want to push to same branch just use *git push*

🥇**Now your code is live on GitHub! You can visit your repository URL to confirm**

---

# 🖋️ Remote repository workflow

After setting up your project with LVC,the remote repository workflow connects it to a remote server like GitHub for collaboration and version control

<img src="{{ site.baseurl }}/assets/images/Remote_workflow.png" alt="Remote Workflow" width="500" height="auto">

---

# 💡Example Snapshot: Pushing Git project to GitHub

The first snapshot is from **Part-1**, given just for reference

![LVC_example]({{ site.baseurl }}/assets/images/LVC_snapshot.png) 

continues below, complementing the remote repository snapshot for a complete view of the Git workflow.

![GitHub_example]({{ site.baseurl }}/assets/images/Push_file_to_GitHub.png)

The above snapshot visualizes the workflow involved in linking your local repository with a remote platform like GitHub, enabling version control beyond your machine.

## ✅ Result
🏆***Go to your GitHub repo and you’ll see hello.txt uploaded — success!***

---

# 📑 Full Git Journey Summary

| **Step** | **Action**                    | **Command**                   | **Stage**             |
|----------|-------------------------------|-------------------------------|-----------------------|
|    1     | Initialize Git                | git init                      | Working Directory     |
|    2     | Create/edit files             | echo, touch, nano, etc.       | Working Directory     |
|    3     | Stage changes                 | git add                       | Staging Area          |
|    4     | Commit changes                | git commit -m "..."           | Local Repository      |
|    5     | Create GitHub repo            | (via web browser)             | —                     |
|    6     | Link local repo to GitHub     | git remote add origin URL     | Remote Setup          |
|    7     | Push to GitHub                | git push -u origin main       | Remote Repository     |

---

# 🔎 Git Quick Fixes- What it says vs What it means

| **Git Says**                          | **What It Means**                                   | **What You Can Do**                                          |
|---------------------------------------+-----------------------------------------------------+---------------------------------------------------------------+
| nothing to commit, working tree clean | You've staged and committed everything already      | You're up to date! Keep working                                 | 
| fatal: not a git repository           | You're in a folder that isn’t initialized           | Run *`git init`* or go to the right folder                      | 
| no changes added to commit            | You changed files but didn’t stage them yet         | Run *`git add filename`*                                        | 
| Your branch is ahead of 'origin/main' | You have local commits not pushed to GitHub         | Run *`git push`*                                                | 
| error: failed to push some refs       | Usually a mismatch with GitHub (e.g., branch name)  | Run *`git pull origin main --rebase`*, then *`git push`*        |
| merge conflict in filename            | Git found conflicting changes between branches      | Open the file, resolve conflicts, then *`git add + git commit`*|
| rejected - non-fast-forward           | Remote repo changed and your local copy is outdated | Run *`git pull`* first, resolve conflicts, then push again      |
| fatal: remote origin already exists   | You’ve already added a remote                       | Run *`git remote set-url origin <url>`* to change it            |

---

# 📃 Conclusion

Understanding the Git workflow — from your working directory to the remote repository — is the foundation of effective version control.In this post we saw  how files move through Local version control to online using real commands, visuals, and hands-on examples.
Whether you're working solo or collaborating with others, mastering these Git basics will help you track changes, avoid mistakes, and push your projects confidently to GitHub

---
## 💡 TechNuggetz - Did you Know?

> 📇 GitHub isn’t a centralized VCS — it's a remote platform where teams collaborate using Git. The version control stays distributed, even when using GitHub.
>
> ⭐ The name GitHub comes from **Git** (the version control tool) + **Hub** (a central place where developers collaborate). It’s literally a hub for Git repositories!
>
> 💭 Always run **`git pull`** before **`git push`** to avoid merge surprises when working in teams!

---

## 🔜  Next on Techn0tz..

*Git - Branching and Merging* 















