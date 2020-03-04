---
layout:       post
title:        git merge 和 git rebase 的比较
subtitle:     git 学习笔记
date:         2020-03-04
catalog:      true
tags:
 - git
---

git merge 和 git rebase 都是用于合并分支的命令，但它们的工作方式却截然不同。

merge 合并分支后会图形有交叉，虽然不方便查看，但合并出现冲突时能够全部一次性解决。

rebase 会把本分支的 commits 放在分支的最顶部。合并后图形只有一条线，虽然清晰明了，但合并出现冲突时需要一个一个解决。

参考：https://www.jianshu.com/p/e9a84059b6f8