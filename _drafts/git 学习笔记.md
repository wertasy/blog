---
layout:       post
title:        git 学习笔记
date:         2020-03-05
catalog:      true
tags:
 - git
---

# 分支操作

## 查看分支：git branch

## 创建分支：git checkout -b

## 合并分支：git merge/rebase

# 后悔药
## 恢复历史版本：git reset
## 修改提交信息：git commit --amend
## 合并多次提交：git rebase -i


# 远程仓库操作

## 添加远程仓库：git remote add
## 克隆远程仓库：git clone
## 推送至远程仓库：git push
## 从远程仓库获取：git pull/git fetch

# 最佳实践
## 推荐流程

## <a id="commit-messages" />写出规范的 Commit Messages
> 在一个团队协作的项目中，开发人员需要经常提交一些代码去修复bug或者实现新的feature。而项目中的文件和实现什么功能、解决什么问题都会渐渐淡忘，最后需要浪费时间去阅读代码。但是好的日志规范commit messages编写有帮助到我们，它也反映了一个开发人员是否是良好的协作者。

**编写良好的 Commit messages 可以达到 3 个重要的目的：**
- 加快 code review 的流程
- 有助于编写良好的版本发布日志
- 让之后的维护者了解代码里出现特定变化或添加某些 feature 的原因

目前，社区有多种 Commit message 的写法规范，但是来自 Angular 的规范使用最为广泛，因为它更加合理和系统。具体格式为：
```txt
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中各部分的含义和功能如下：
- type：说明 commit 的类型
- scope：说明 commit 波及的范围
- subject：简要的阐述 commit 的主旨
- body：详细描述 commit，比如进行变更的动机等等
- footer：记录与之关联的 issue 或 break change

type 的取值见下表：

  类型  | 描述
--------|--------------------------------------------
feat    | 新增feature
fix     | 修复bug
docs    | 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
style   | 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
refactor| 代码重构，没有加新功能或者修复bug
perf    | 优化相关，比如提升性能、体验
test    | 测试用例，包括单元测试、集成测试等
chore   | 改变构建流程、或者增加依赖库、工具等
revert  | 回滚到上一个版本

对 subject 的要求：
1. 使用祈使句（body 也是）
2. 首字母不要大写
3. 结尾无需添加标点

body 中需要描述的信息包括:
1. 为什么这个变更是必须的? 比如说它可能是用来修复一个bug，增加一个feature，提升性能、可靠性或者稳定性等等。
2. 你是如何解决这个问题? 具体描述解决问题的步骤。
3. 是否存在副作用、风险? 

如果需要的话，可以在 footer 中添加一个指向 issue 或者其它文档的链接，也可以关闭某个 issue。

## 保证 rebase 后提交的顺序是正确的
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


# 参考资料
 
[^JJNile]: <https://www.jianshu.com/p/e9a84059b6f8>{:target="_blank"} 来源：简书