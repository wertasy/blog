---
layout:       post
title:        "使FTP正常连接的SELinux设置"
subtitle:     "SELinux settings that make FTP normally connected"
date:         2017-10-07
header-img:   "img/post/LVM.jpg"
header-mask:  0.35
catalog:      true
tags:
    - Linux 
    - CentOS
    - rpm
---

SELinux是个非常强大的安全子系统。可是它在初学者心中可能不会有什么好印象，原因就在于它强大的安全性，可能会与很多网络软件的设置产生冲突，这就为初学者增加了许多困难。对于初学者而言解决这个难题的方法一般有两种：
## 关闭SELinux
要关闭SELinux可以使用下面的命令
```sh
setenforce 0
```
它的好处的不用重启计算机，需要再次开启SELinux的话，把0换成1就可以了
## 开启与Ftp有关的SELinux策略
```sh
# 查看有关ftp的SELinux策略
getsebool -a | grep ftp
# -P是永久开启的意思
setsebool -P ftpd_full_access on 
setsebool -P tftp_home_dir on
```
最后，总结一下，以上的方法都只是临时方案。这么强大的安全系统一定是要好好学习好好利用的。