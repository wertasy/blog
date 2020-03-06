---
layout:       post
title:        git 学习笔记
date:         2020-03-05
catalog:      true
tags:
 - git
---

# 基本操作

## 初始化仓库：git init
想要使用 git 管理一个项目，首先在项目根目录下执行 `git init` 进行初始化。

```shell
$ git init
Initialized empty Git repository in /path/to/working/directory/.git/
```

这个命令成功执行会在当前工作目录下创建一个 .git 目录，这个 .git 目录里存储放着用于版本控制的数据。我们通常把 .git 目录称作“仓库”，而把执行 `git init` 操作时所在的目录称作“附属于该仓库的工作树”，或直接简称为“工作树”。

文件的创建、删除、修改等操作都在工作树中进行，然后记录到仓库中。仓库中保存着它所管理的文件的每个历史版本，以便开发者能够在未来的某个时候重新获得它们。

## 查看仓库状态：git status
只要我们对工作树或仓库进行操作，它们的状态就会不断发生变化。`git status` 命令用于显示仓库当前的状态。它是最常用的 git 命令之一。

```shell
$ git status
# On branch master
#
# Initial commit
#
nothing to commit (create/copy files and use "git add" to track)
```

上面输出的结果显示了我们目前正位于 master 分支，分支刚刚初始化，还没有内容可以提交。提示我们可以创建或拷贝文件，并使用“git add”命令来跟踪它们的版本变迁。

也就是说目前仓库空空如也，接下来我们可以创建一些文件来让仓库管理。

```shell
$ touch README.md
$ git status
# On branch master
#
# Initial commit
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       README.md
nothing added to commit but untracked files present (use "git add" to track)
```

创建 README.md 文件之后输出的结果发生了变化。其中显示 README.md 文件尚未进行跟踪，提示我们使用 `git add` 来添加。

## 添加文件到暂存区：git add
可见，在工作树中创建的新文件并不会自动成为仓库管理的对象。你必须使用 `git add` 命令手动添加。但是，文件会被添加到了那里呢？这里有一个重要的概念叫做暂存区。暂存区（stage/index）是指提交之前的一个临时区域。

```shell
$ git add README.md
$ git status
# On branch master
#
# Initial commit
#
# Changes to be committed:
#   (use "git rm --cached <file>..." to unstage)
#
#       new file:   README.md
#
```

将文件添加到暂存区之后，再次打印仓库的状态，发现 README.md 文件已经成为了要提交的更改。

## 提交暂存区到仓库：git commit
`git commit` 用于将暂存区中的文件实际地保存到仓库中，并产生一条历史记录。我们通常把这样的一条历史记录称为一次“提交”。加上 `-m` 参数允许我们在提交的同时提供一个简短的提交信息，一般出超过 50 个字母。不加 `-m` 参数则会启动默认的编辑器来提供详细的提交信息。提交信息的格式见后文。

```shell
$ git commit -m "add README.md"
[master (root-commit) 96ead18] add README.md
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 README.md
```

## 查看提交日志：git log
`git log` 命令用于查看仓库提交的日志。日志内容包括何人何时进行了提交或合并，以及操作前后的差别。

```shell
$ git log
commit 96ead186704720954060ee13bc5a14eb4fade1f2
Author: wertasy <wertasy@qq.com>
Date:   Fri Mar 6 11:28:06 2020 +0800

    add README.md
```
### 只显示第一行提交信息
`git log --pretty=short`

### 显示指定目录/文件的日志
`git log <file>|<directory>`

### 显示提交前后文件的改动
`git log -p`

## 对比差异：git diff

# 分支操作

## 查看分支：git branch

## 创建分支：git checkout -b

## 合并分支：git merge/rebase

### 保证 rebase 后提交的顺序是正确的
分支在进行操作之前先 rebase 一下它的目标分支，操作结束之后，汇入目标分支之前，
再 rebase 一次目标分支，最后才将该分支 rebase 到目标分支。

```shell
git rebase master
···
git rebase master
git rebase master dev
```

feature 分支用完即删。

git merge 和 git rebase 都是用于合并分支的命令，但它们的工作方式却截然不同。
merge 合并分支后会图形有交叉，虽然不方便查看，但合并出现冲突时能够全部一次性解决。
rebase 会把本分支的 commits 放在分支的最顶部。合并后图形只有一条线，虽然清晰明了，但合并出现冲突时需要一个一个解决。[^JJNile]

# 后悔药
## 恢复历史版本：git reset
## 修改提交信息：git commit --amend
## 合并多次提交：git rebase -i


# 远程仓库操作

## 添加远程仓库：git remoteadd
## 克隆远程仓库：git clone
## 推送至远程仓库：git push
## 从远程仓库获取：git pull/git fetch

# 最佳实践
## 推荐流程
## 如何填写 Commit 信息

# 参考资料
 
[^JJNile]: <https://www.jianshu.com/p/e9a84059b6f8>{:target="_blank"} 来源：简书