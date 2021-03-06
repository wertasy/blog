---
layout:       post
title:        "Ruby in Linux"
subtitle:     " \"Hello Ruby\""
date:         2018-04-01
author:       "wertasy"
header-img:   "img/post-bg-2015.jpg"
multilingual: false
catalog:      true
tags:
    - Linux
    - Ruby
---


## 步骤1.安装RVM

使用以下命令在系统上安装最新稳定版本的RVM。
此命令将自动下载所有所需的文件并在系统上安装。

```bash
curl -sSL https://rvm.io/mpapis.asc | gpg --import -
curl -L get.rvm.io | bash -s stable
```

此外，运行以下命令加载rvm环境。

```bash
source ~/.rvm/scripts/rvm
rvm reload
```

## 步骤2.验证依赖关系

现在使用以下命令验证所有依赖项是否已正确安装。

```bash
rvm requirements run
Checking requirements for centos.
Requirements installation successful.
```

## 步骤5.使用淘宝源

修改 RVM ，改用淘宝镜像作为下载源, 提高安装速度。

```bash
sed -i -E 's!https?://cache.ruby-lang.org/pub/ruby!https://ruby.taobao.org/mirrors/ruby!' $rvm_path/config/db
```

## 步骤4.安装Ruby 2.4

完成RVM环境设置后，可以使用以下命令安装Ruby语言。

```bash
rvm list known
rvm install 2.4.1
```

## 步骤5.切换到Ruby 2.4

```bash
rvm use 2.4.0 --default
rvm list  #查看已安装的ruby版本
```

## Q&A

提示错误：

```bash
You need to change your terminal emulator preferences to allow login shell.
```

解决方法：

```bash
echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"' >>~/.bashrc
source ~/.bashrc
ruby -v
```

### ps:

- /etc/profile:此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行. 并从/etc/profile.d目录的配置文件中搜集shell的设置.
- /etc/bashrc:为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取.
- ~/.bash_profile:每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.
- ~/.bashrc:该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时该文件被读取.
- ~/.bash_logout:当每次退出系统(退出bash shell)时,执行该文件.

