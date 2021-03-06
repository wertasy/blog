---
layout:       post
title:        "Linux 中的古老缩略语"
subtitle:     "Ancient Abbreviations in Linux"
date:         2018-05-30
header-img:   "img/post/Castle_bastion.jpg"
header-mask:  0.35
catalog:      true
tags:
    - Linux
---

Unix已经有35年历史了。许多人认为它开始于“中世纪”，这个“中世纪”是相对于计算机技术的产生和发展来说的。在过去的时间里，Unix和它的子分支Linux收集有许多的历史和一些完全古老的语言。在这篇技巧文章中，我们将介绍一少部分古老的语言和它们的目的和作用，以及它们真正的来源。

### rc
在Linux中，最为常用的缩略语也许是“rc”，它是“runcomm”的缩写――即名词“run command”(运行命令)的简写。今天，“rc”是任何脚本类文件的后缀，这些脚本通常在程序的启动阶段被调用，通常是Linux系统启动时。如/etc/rc是Linux启动的主脚本，而.bashrc是当Linux的bash shell启动后所运行的脚本。.bashrc的前缀“.”是一个命名标准，它被设计用来在用户文件中隐藏那些用户指定的特殊文件;“ls”命令默认情况下不会列出此类文件，“rm”默认情况下也不会删除它们。许多程序在启动时，都需要“rc”后缀的初始文件或配置文件，这对于Unix的文件系统视图来说，没有什么神秘的。

###  etc
在“etc/bin”中的“etc”真正代表的是“etcetera”(附加物)。在早期的Unix系统中，最为重要的目录是“bin”目录(“bin”是“binaries”二进制文件――编译后的程序的缩写)，“etc”中则包含琐碎的程序，如启动、关机和管理。运行一个Linux必须的东西的列表是：一个二进制程序，etcetera，etcetera――换句话说，是一个底层的重要项目，通常添加一些次等重要的零碎事物。今天，“etc”包含了广泛的系统配置文件，这些配置文件几乎包含了系统配置的方方面面，同样非常重要。

### bin
今天，许多在Linux上运行的大型子系统，如GNOME或Oracle，所编译成的程序使用它们自己的“bin”目录(或者是/usr/bin，或者是/usr/local/bin)作为标准的存放地。同样，现在也能够在这些目录看到脚本文件，因为“bin”目录通常添加到用户的PATH路径中，这样他们才能够正常的使用程序。因此运行脚本通常在bin中运行良好。

### tty
在Linux中，TTY也许是跟终端有关系的最为混乱的术语。TTY是TeleTYpe的一个老缩写。Teletypes，或者teletypewriters，原来指的是电传打字机，是通过串行线用打印机键盘通过阅读和发送信息的东西，和古老的电报机区别并不是很大。之后，当计算机只能以批处理方式运行时(当时穿孔卡片阅读器是唯一一种使程序载入运行的方式)，电传打字机成为唯一能够被使用的“实时”输入/输出设备。最终，电传打字机被键盘和显示器终端所取代，但在终端或TTY接插的地方，操作系统仍然需要一个程序来监视串行端口。一个getty“Get TTY”的处理过程是:一个程序监视物理的TTY/终端接口。对一个虚拟网络沮丧服务器(VNC)来说，一个伪装的TTY(Pseudo-TTY，即家猫的TTY，也叫做“PTY”)是等价的终端。当你运行一个xterm(终端仿真程序)或GNOME终端程序时，PTY对虚拟的用户或者如xterm一样的伪终端来说，就像是一个TTY在运行。“Pseudo”的意思是“duplicating in a fake way”(用伪造的方法复制)，它相比“virtual”或“emulated”更能真实的说明问题。而在现在的计算中，它却处于被放弃的阶段。

### dev
从TTY留下的命令有“stty”，是“set tty”(设置TTY)的缩写，它能够生成一个配置文件/etc/initab(“initialization table”，初始表)，以配置gettys使用哪一个串口。在现代，直接附加在Linux窗口上的唯一终端通常是控制台，由于它是特殊的TTY，因此被命名为“console”。当然，一旦你启动X11，“console”TTY就会消失，再也不能使用串口协议。所有的TTY都被储存在“/dev”目录，它是“[physical] devices”([物理]设备)的缩写。以前，你必须在电脑后面的串口中接入一个新的终端时，手工修改和配置每一个设备文件。现在，Linux(和Unix)在安装过程中就在此目录中创建了它所能向导的每一个设备的文件。这就是说，你很少需要自己创建它。

随着硬件在电脑中的移出移进，这些名字将变得更加模糊不清。幸运的是，今天在Linux上的高等级软件块对历史和硬件使用容易理解的名字。举例来说，嗯，[Pango](http://www.pango.org/) 就是其中之一。

如果你对这些内容很感兴趣，那么我建议你阅读宏大的，但有些以美国英语历史为中心的，由 Eric S. Raymond 撰写的 Jargon File。它并没有解释所有在Unix中使用的术语，但是它给出了这些形成的大致情况。