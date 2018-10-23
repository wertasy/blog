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
- 使用 Windows 的 `共享文件夹`
- 使用 Git 内建的 daemon 功能

### 1.1. 把 Windows “共享文件夹”作为远程 Git 仓库

如果 Git Server 是在局域网内运行，而且每一位参与项目的开发者都能够使用 Windows 的共享文件夹，那么最简单的做法就是直接创建一个“共享文件夹”，用它来存储远程 Git 仓库。具体步骤如下：

在作为 Git Server 的计算机上安装 Git 程序。

新建一个文件夹作为远程 Git 仓库，将其命名为 `GitRemoteRepo` 或是别的你喜欢的名字。 

在 Windows 的文件资源管理器中，将这个文件夹设置为共享文件夹。我们也可以详细设置用户的读写权限等。
启动 Git Bash，切换到这个文件夹下，执行以下命令，创建一个远程 Git 仓库。

```sh
git init --bare <项目名称>
```

在局域网内别的电脑上启动 Git Bash 切换到存储项目的文件夹下。
执行以下命令即可从刚刚创建好的仓库复制项目。

```sh
git clone //<服务器名>/<仓库名>/<项目名>
```

修改复制来的托管项目，并把修改添加到 Git 本地仓库中。
如果需要将已经跟新的本地仓库推送到远程 Git 仓库，可以执行以下指令。

```sh
git push -u origin master
```

如果有多个项目，而且每个项目的用户和读写权限各不相同，
我们可以为每一个项目创建一个专用的“共享文件夹”，
独立管理每一个项目的用户和权限。

### 1.2. 使用 Git Daemon 创建 Git Server

git daemon 是 git 内建的网络访问服务，我们无需安装其他程序，只需要使用相应的 git 命令即可使用。但是缺点是它没有用户授权管理和控制机制，也就是说，只要你知道项目的 URL，你就可以自由访问。不过，我们依然可以设置哪些项目开放给外部网络，哪些不开放。

Git Daemon 使用专用的应用层协议，被称作 Git protocol。默认情况下，它使用 9418 作为端口号，我们也可以指定其他端口号。

假设现在你在 `D:\\GitRemoteRepo` 下创建了一个 git 仓库，并它里面托管了 3 个项目，这 3 个项目可以是普通的 git 项目，即包含 `.git` 文件夹的项目，也可以是一个通过 `--bare` 创建的仓库。

如果你需要开放这 3 个项目给你的同伴，你需要启动 Git Bash，切换到 `D:\GitRemoteRepo` 下。然后执行下面指令，开启 Git Daemon 守护进程：

```sh
git daemon --export-all # 开放当前文件夹下的所有项目
```
成功后，同伴只需要执行以下的指令即可获得我们刚刚开放的项目：

```sh
git clone git://<运行 Git Daemon 主机的域名或IP>/<仓库名>/<项目名>
```

如果你希望独立控制每个项目是否开放，那么需要在希望开放的项目的 `.git` 文件夹下创建一个名为 `git-deamon-export-ok` 的空文件。对于 bare 类型的仓库，直接放在仓库的根目录就行了。

出于安全考虑，Git Daemon 默认情况下只能读取，也就是说，你的同伴无法执行 `git push` 来为项目锦上添花。因为，Git Daemon 没有用户验证机制，一旦开放写入，任何人都能随意修改项目。但是，你也不是完全没有办法的让你的同伴通过 Git Deamon 参与到项目中来。我们，可以在启动 Git Daemon 的时候加上 `--enable=receive-pack` 选项。
## 使用 HTTP/HTTPS 访问 Git Server



## 使用 SSH 认证和加密 Git Server