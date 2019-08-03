---
layout:       post
title:        使用nc命令传输文件和文件夹
subtitle:     Transfer files & folders using the nc command
date:         2019-07-10
header-img:   img/post/self-study-room.jpg
header-mask:  0.25
catalog:      true
tags:
    - Linux
    - nc
    - ncat
    - 命令
---

相比较于 scp，使用 nc 命令传文件更加轻便灵活，因为它不需要建立 ssh 连接。

### 传文件：

先在接收方执行命令监听某个端口

```sh
$ nc -l [监听端口] > file.tar.gz
```

然后在源机器执行如下命令

```sh
$ nc [接收方IP] [接收方监听端口] < file.tar.gz
```


### 传文件夹：

传文件和文件的原理是一样的，只不过多了利用管道在发送时先把文件夹归档，接受后再解开的步骤。

```sh
$ nc -l [监听端口] | tar -zxvf -
```

然后在源机器执行命令

```sh
$ tar -zcvf - [文件夹] | nc [接收方IP] [接收方监听端口]
```

*注意：这样传输文件夹每次都会进行一次压缩，所以如果需要传到多个机器建议先压缩后再按传文件的方式操作*