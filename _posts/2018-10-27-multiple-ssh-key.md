---
layout:       post
title:        "如何同时使用多个 SSH KEY"
subtitle:     "How does manage multiple SSH KEY"
date:         "2018-10-21"
header-img:   "img/post/city.jpeg"
header-mask:  0.20
catalog:      true
tags:
    - ssh
---

问题
--
有时候，我们需要使用多个不同 ssh-key 来登录相同或不同服务器上的不同的账户。
比如说，我同时生成了 3 个 key 来分别免密码登录 github、coding 和一台远程主机。这种情况下，我同时在本地主机中存放三个 key。如果不配置 config 管理它们，那么每次可用的秘钥只有一个。 
通常，不知道怎么解决的朋友每次切换账户，都会重新生成一份秘钥，或是将对应的秘钥改名为默认秘钥，很麻烦。下面就介绍一下如何彻底解决这个问题。

解决方法
--
### 1. 生成密钥对
首先，我们分别为上述三个账户生成 rsa 密钥对
```sh
# 将 $your_email 替换为你的 email
rsa-keygen -t rsa -C "$your_email" -f ~/.ssh/github_rsa
rsa-keygen -t rsa -C "$your_email" -f ~/.ssh/coding_rsa
rsa-keygen -t rsa -N "" -f ~/.ssh/username_rsa
```

接着我们就可以在 `~/.ssh` 目录下看到我们刚刚生成的三个密钥对

### 2. 提交公钥
登录 github 和 coding 的 ssh 管理页面，把对应的公钥提交保存到代码管理服务器 (公钥以 `.pub` 结尾)  
对于远程主机，我们执行以下命令将公钥复制到授权文件
```sh
ssh-copy-id -i ~/.ssh/username_rsa username@example.com
```
然后输入 username 的密码即可

### 3. 创建配置文件
在 `~/.ssh` 下创建一个配置文件 `config`
```sh
vim ~/.ssh/config
```
输入如下配置信息
```sh
# github settings
Host github
    HostName git.github.com
    User git
    IdentityFile ~/.ssh/github_rsa

# coding settings
Host coding
    HostName git.coding.net
    User git
    IdentityFile ~/.ssh/coding_rsa

# remote settings
Host username
    HostName example.com
    User username
    IdentityFile ~/.ssh/username_rsa
```
### 4. 测试
我们用刚刚设置的别名 github 做测试
```sh
ssh -T github
```
ssh 会自动将别名 `Host` 替换为 `User@HostName`，并指定使用 `IdentityFile` 作为私钥  
成功之后就可以使用别名来克隆项目了，以 github 为例
```sh
git clone github:userName/projectName.git
```