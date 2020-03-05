---
layout:       post
title:        git 学习笔记
date:         2020-03-05
catalog:      true
tags:
 - git
---

记录一下我学习和使用 git 过程中遇到的问题和解决方法。

# 基本操作

## 初始化仓库：git init
想要使用 git 管理一个项目，首先在项目根目录下执行 `git init` 进行初始化。

```shell
$ git init
Initialized empty Git repository in /path/to/working/directory/.git/
```

这个命令成功执行会在当前工作目录下创建一个 .git 目录，这个 .git 目录里存储放着用于版本管理的数据。我们通常把 .git 目录称作“仓库”，而把执行 `git init` 操作时所在的项目根目录称作“附属于该仓库的工作树”，或直接简称为“工作树”。

文件的创建、删除、修改等操作都在工作树中进行，然后记录到仓库中。仓库会管理被记录的对象的每个历史版本，以便开发者能够在未来的某个时候重新获得它们。

## 查看仓库状态：git status
在被操作过程中，工作树和仓库的状态会不断发生变化。`git status` 命令可以显示仓库当前的状态。它是使用最频繁的一个命令之一。

```shell
$ git status
# On branch master
#
# Initial commit
#
nothing to commit (create/copy files and use "git add" to track)
```

## 添加文件到暂存区：git add

## 提交暂存区到仓库：git commit

## 查看提交日志：git log

## 对比差异：git diff

# 分支操作

## 查看分支：git branch

## 创建分支：git checkout -b

## 合并分支：git merge/git rebase

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


# 参考资料
 
[^JJNile]: <https://www.jianshu.com/p/e9a84059b6f8>{:target="_blank"} 来源：简书