---
layout:       post
title:        "关于在CentOS7上搭建Web服务器的一些总结"
subtitle:     "Web Server on CentOS 7"
date:         2017-10-06
header-img:   "img/post/LVM.jpg"
header-mask:  0.35
catalog:      true
tags:
    - Linux 
    - CentOS
    - WebServer
---
## 介绍
选择哪个Linux发行版是一个老生常谈的话题，我在这首先要推荐的一款就是CentOS，因为它兼顾了RedHat和Ubuntu两者的优势，在软件的安装和更新方面比RedHat方便，同时在安全性和稳定性上优于Ubuntu。关于Linux发行版的故事这里就不多讲了。

现在Linux上搭建Web服务器一般都是用Apache(Nginx)，MySQL(MariaDB)和PHP这三者的组合。它们三个就像三根“柱子”支撑着服务器的运行。Apache用于提供http服务，将网页呈现给访问者。MySQL用于后台的数据管理。PHP能用数据库中的数据产生网页。

##　安装CentOS
CentOS是一个可以免费获得的Linux发行版，我们可以很轻松的从CentOS中文网之类的网站上获得它的任何一个版本，我这次安装的是CentOS7。之前我也试过Ubuntu，redhat和Deepin，最后觉得做服务器还是CentOS比较好用。这里为Deepin Linux打Call，如果你看腻了Windows想要用Linux做桌面系统的完全可以试试Deepin，多的不说了，它真的很棒。关于如何安装详细的教程可以看这里[【转】U盘安装CentOS7的最终解决方案](https://www.cnblogs.com/hfyfpga/p/5789681.html)，里面讲得非常详细。

## 安装服务器软件
在安装CentOS时可以选择安装软件，此时就可以把我们需要的软件都选上，然后开始安装，这样它们就会跟随系统一起安装，当然也可以之后用yum指令来安装。比如：
```sh
yum list | grep httpd
yum install httpd -y
```