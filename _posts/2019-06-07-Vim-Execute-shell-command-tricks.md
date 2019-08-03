---
layout:       post
title:        vim 执行shell命令技巧
subtitle:     Vim Execute shell command tricks
date:         2019-06-07
header-img:   img/home-bg-bookshelf.jpg
header-mask:  0.25
catalog:      true
tags:
    - Linux
    - vim
    - shell
---

下面分享四个实用的小技巧在vim中去执行shell命令：

1. `:!cmd` 不退出vim执行命令cmd。
2. `:r !cmd` 不退出vim执行命令cmd，并将cmd的输出内容插入当前文本中。
3. `:shell` 切换到shell里（此时并没有退出vim，可以理解成开了一个新的shell，然后vim转入后台），执行exit后，会切换回原来的vim中
4. `:w !sudo tee %` 使用root权限保存修改后的文件，前提是运行vim的用户有sudo权限。

PS：第4条的原理如下：
> The output of write (vim :w) command is redirected using tee. The % is nothing but current file name i.e. /etc/httpd.conf. In other words tee command is run as root and it takes standard input and write it to a file represented by %. However, this will prompt to reload file again (hit L to load changes in vim itself).

