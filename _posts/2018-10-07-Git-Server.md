---
layout:       post
title:        "架设 Git Server"
subtitle:     "Set up Git Server"
date:         "2018-10-07"
header-img:   "img/post/git.gif"
catalog:      true
header-mask:  0.40
tags:
    - git
    - server
---

## 1. 使用 Windows 共享文件夹或 Git Daemon 作为 Git Server

本文首先介绍两种最简单的创建远程 Git 仓库的方法，这两种方法都不需要安装任何别的软件。它们分别是：
- 使用 Windows 的“共享文件夹”
- 使用 Git 内建的 daemon 功能

### 1.1 把 Windows “共享文件夹”作为远程 Git 仓库
如果 Git Server 是在局域网内运行，而且每一位参与项目的开发者都能够使用 Windows 的共享文件夹，那么最简单的做法就是直接创建一个“共享文件夹”，用它来存储远程 Git 仓库。具体步骤如下：
1. 在作为 Git Server 的计算机上安装 Git 程序。
2. 新建一个文件夹作为远程 Git 仓库，将其命名为 GitRemoteRepo 或是别的你喜欢的名字。 
3. 在 Windows 的文件资源管理器中，将这个文件夹设置为共享文件夹。我们也可以详细设置用户的读写权限等。
4. 启动 Git Bash，切换到这个文件夹下，执行以下命令，创建一个远程 Git 仓库。
```sh
git init --bare (欲托管的项目名称)
```
5. 在局域网内别的电脑上启动 Git Bash 切换到存储项目的文件夹下。执行以下命令，从刚刚创建好的仓库复制托管项目。
```sh
git clone //服务器名/GitRemoteRepo/托管项目名
```
6. 修改复制来的托管项目，并把修改添加到 Git 本地仓库中
。如果需要将已经跟新的本地仓库推送到远程 Git 仓库，可以执行以下指令。
```sh
git push -u origin master
```

如果有多个项目，而且每个项目的用户和读写权限各不相同，我们可以为每一个项目创建一个专用的“共享文件夹”，独立管理每一个项目的用户和权限。

## 使用 HTTP/HTTPS 访问 Git Server

## 使用 SSH 认证和加密 Git Server
