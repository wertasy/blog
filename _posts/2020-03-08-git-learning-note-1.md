---
layout:       post
title:        Git 学习笔记——基础操作
date:         2020-03-08
catalog:      true
tags:
 - git
 - 学习笔记
---

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
可见，在工作树中创建的新文件并不会自动成为仓库管理的对象。必须使用 `git add` 命令手动添加。但是，文件会被添加到了那里呢？这里有一个重要的概念叫做暂存区。暂存区（stage/index）是指提交之前的一个临时区域。

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
`git commit` 用于将暂存区中的文件实际地保存到仓库中，并产生一条历史记录。我们通常把这样的一条历史记录称为一次“提交”。每次提交都要求我们提供提交信息。在提交的同时加上 `-m` 参数允许在其后提供一个简短的提交信息，一般不超过 50 个字符。

```shell
$ git commit -m "add README.md"
[master (root-commit) 96ead18] add README.md
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 README.md
```

如果不加参数 `-m` 则会启动默认的编辑器来提供更为详细的提交信息。如何撰写提交信息参见后文[写出规范的提交信息](#commit-messages)。


接下来我们向 README.md 中写入 "this is a README"，这个操作也会改变仓库和工作树的状态。
```shell
$ echo "this is a README" > README.md
$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   README.md
#
no changes added to commit (use "git add" and/or "git commit -a")
```

然后我们将这个更改加入到暂存区中，然后再次打印仓库和工作树的状态。
```shell
$ git add README.md
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   README.md
#
```

最后提交这个更改，再看看仓库和工作树的状态。
```shell
$ git commit -m "write README.md"
[master 819b9cd] write README.md
 1 file changed, 1 insertion(+)
$ git status
# On branch master
nothing to commit, working directory clean
```

## 查看提交日志：git log
`git log` 命令用于查看仓库提交的日志。日志内容包括何人何时进行了提交或合并，以及操作前后的差别。

```shell
$ git log
commit 819b9cd849d8d4ff242f1dc5d2d6ba7248e18964
Author: wertasy <wertasy@qq.com>
Date:   Sat Mar 7 16:47:16 2020 +0800

    write README.md

commit 96ead186704720954060ee13bc5a14eb4fade1f2
Author: wertasy <wertasy@qq.com>
Date:   Fri Mar 6 11:28:06 2020 +0800

    add README.md
```
### 只显示第一行提交信息
`git log --pretty=short` 可以显示较为简短的日志信息，让开发者一次查看更多的提交日志。
```shell
$ git log --pretty=short
commit 819b9cd849d8d4ff242f1dc5d2d6ba7248e18964
Author: wertasy <wertasy@qq.com>

    write README.md

commit 96ead186704720954060ee13bc5a14eb4fade1f2
Author: wertasy <wertasy@qq.com>

    add README.md
```

### 显示指定目录/文件的日志
`git log <file>|<directory>` 用于显示指定目录或文件的提交日志。
```shell
$ git log README.md
commit 819b9cd849d8d4ff242f1dc5d2d6ba7248e18964
Author: wertasy <wertasy@qq.com>
Date:   Sat Mar 7 16:47:16 2020 +0800

    write README.md

commit 96ead186704720954060ee13bc5a14eb4fade1f2
Author: wertasy <wertasy@qq.com>
Date:   Fri Mar 6 11:28:06 2020 +0800

    add README.md
```


### 显示提交前后文件的改动
`git log -p` 能够显示提交前后文件的改动情况，方便开发者对比。
```shell
$ git log -p
commit 819b9cd849d8d4ff242f1dc5d2d6ba7248e18964
Author: wertasy <wertasy@qq.com>
Date:   Sat Mar 7 16:47:16 2020 +0800

    write README.md

diff --git a/README.md b/README.md
index e69de29..06b5df9 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1 @@
+this is a README

commit 96ead186704720954060ee13bc5a14eb4fade1f2
Author: wertasy <wertasy@qq.com>
Date:   Fri Mar 6 11:28:06 2020 +0800

    add README.md

diff --git a/README.md b/README.md
new file mode 100644
index 0000000..e69de29
```

输出看不懂也没关系，马上就会讲解。

## 对比差异：git diff
`git diff` 命令可以查看工作树、暂存区和最新提交之间的差别。我们现在修改文件 README.md 来产生差别。在第一行前加上一个 '#'，使之成为 Markdown 语法的标题。
```md
# this is README
```

### 查看工作树和暂存区的差别
直接执行 `git diff` 即可查看工作树和暂存区之间的差别。
```shell
$ git diff
diff --git a/README.md b/README.md
index 06b5df9..eca4d68 100644
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-this is a README
+# this is a README
```

上面的输出中，“@@ -1 +1 @@”表示其后的内容从文件第 1 行起，显示了更改前的 1 行和更改后的 1 行。“-”起头的表示更改前的行，“+”起头的表示更改后的行。一般格式是“@@ -num,len +num,len @@”，num 表示行号，len 表示行数。1,1 直接简写为 1。

### 查看工作树和最新提交的差别
我们通过 `git diff HEAD` 来查看工作树和最新一次提交之间的差别。这里的 HEAD 是一个指针，它指向当前分支中最新的一次提交。
```shell
$ git diff HEAD
diff --git a/README.md b/README.md
index 06b5df9..eca4d68 100644
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-this is a README
+# this is a README
```

至此，git 常用的基本操作就学完了。Practice makes perfect. 只有在实践中反复练习才能真正地掌握。希望在别人被你的技艺所折服的时候，你能够平淡地说出一句“唯手熟尔”。