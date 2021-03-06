---
layout:       post
title:        "umask 详解"
date:         2018-04-16
header-img:   "img/post/Castle_bastion.jpg"
header-mask:  0.35
catalog:      true
tags:
    - Linux 
    - umask
---

## 一、权限掩码umask

 `umask` 是 `chmod` 配套的，总共为4位（gid/uid，属主，组权，其它用户的权限），不过通常用到的是后 3 个，例如你用如下命令
```vim
chmod 755 filename
```
*此时这文件的权限是属主 读(4) + 写(2) + 执行(1)，同组的和其它用户有读写权限*

## 二、umask的作用

默认情况下 `umask` 的值是 `022` (可以用 `umask` 命令查看），此时你建立的文件默认权限是 `644 (6-0,6-2,6-2)`，建立的目录的默认 权限是 `755 (7-0,7-2,7-2)`，可以用 `ls -l` 验证一下哦、现在应该知道 `umask` 的用途了吧，它是为了控制默认权限，不要使默认的文件和目录具有全权而设的

## 三、修改umask值

知道了 `umask` 的作用后，你可以修改 `umask` 的值了，例如: `umask 024` 则以后建立的文件和目录的默认权限就为642，753了

## 四、将umask值保存到环境文件

若要长期修改 `umask` 的值，可以把它写进`/etc/profile`或`~/.profile`或`~/.bash_profile`中，大家应该知道这几个文件是干什么用的吧。

您知道当你建立一个新的档案或目录时，他的预设属性会是什么吗？那就与 `umask` 有关了。那么 `umask` 是在搞什么呢？基本上， `umask` 就是指定『目前使用者在建立档案或目录时候的属性默认值』，那么如何得知或设定 `umask` 呢？他的指定条件以底下的方式来指定：语法：
```vim 
[root@localhost test]# umask
0022
[root@localhost test]# umask 002
[root@localhost test]# umask
0002
```
## 说明
想要查看 `umask` 的数值，直接输入 `umask` 即可。而设置就是在 `umask` 之后接三个数字。这三个数字是什么意思呢？主要还是跟 Linux 的档案属性（那九个属性，r, w, x）有关的，而且是以数的那一个关系为例的，而有底下的规则为辅：

若用户创建一个『文件』，则默认是没有可执行权限 `x` 的，即只有 `rw` 这两个权限，所以最大为 666 

> `-rw-rw-rw-`

若使用者建立为『目录』，则由于 x 与是否可以进入此目录有关，因此预设为所有权限均开放，亦即为 777 

> `drwxrwxrwx`

那么 `umask` 指定的是『该默认值需要减掉的权限。』因为 r、w、x 别是 4、2、1 ，所以。也就是说，当要拿掉能写的权限，就是输入 2 ，而如果要拿掉能读的权限，也就是 4 ，那么要拿掉读与写的权限，也就是 6 ，而要拿掉执行与写入的权限，也就是 3 ，这样了解吗？请问您， 5 是什么？就是读与执行的权限啦。如果以上面的例子来说明的话，因为 `umask` 为 002 ，所以 user, group 并没有被拿掉属性，不过 others 的属性被拿掉了 2 (也就是 w 这个属性)，那么由于当使用者：

建立文件时：
> 默认： `-rw-rw-rw-`  
> 减去： `--------w-`  
> 得到： `-rw-rw-r--`

```vim
[root@localhost test]# umask 003
[root@localhost test]# touch test3
[root@localhost test]# mkdir test4
[root@localhost test]# ll
```

建立目录时：
> `drwxrwxrwx`  
> `--------w-`  
> `drwxrwxr-x`

不相信吗？你只要使用 touch test 然后看看这个 test 的档案属性，就可以知道了。那么如何看你这个使用者目前的 `umask` 呢？直接下达 `umask` 即可。实作看看先：
```vim
[root@localhost test]# umask 002
[root@localhost test]# touch test1
[root@localhost test]# mkdir test2
[root@localhost test]# ls -l
-rw-rw-r-- 1 root root 0 Oct 22 00:00 test1
drwxrwxr-x 2 root root 4096 Oct 22 00:00 test2/
```
发现了什么？Test1 的属性为 666 - 002 = 664，正确吗？是的，正确。而 test2 这个目录呢？就是 777-002 = 775，也正确。
```vim
[root@localhost test]# umask 003
[root@localhost test]# touch test3
[root@localhost test]# mkdir test4
[root@localhost test]# ll
-rw-rw-r-- 1 root root 0 Oct 22 00:03 test3
drwxrwxr-- 2 root root 4096 Oct 22 00:03 test4/
```
诶，属性又跟刚刚的不一样，仔细推敲一下为什么。
test3 666 - 003 = 663
这是怎么一回事？663 应该是 -rw-rw--wx 才对啊，怎么会是上面的属性。

这里就要特别的给他强调了。**尽量不要以数字相加减啦。**容易造成类似上面的问题。你应该要这样想 

> `-rw-rw-rw-`  
> `--------wx`  
> `-rw-rw-r--`

这样就对啦。了解了吗？不要用十进制的数来计算，要用二进制来算，或者干脆用 rwx 来算。

由上面的例子您应该很轻易的就可以发现 `umask` 的用途。而这个 `umask` 可以在 `/etc/bashrc` 里面进行修改。预设的情况之下，root 的 `umask` 为 022 而一般使用者则为 002 ，因为可写的权限蛮严重的，因此预设都会拿掉这个权限。此外，因为 root 比较重要。所以为了安全的需求，其同群组的写入属性就被拿掉了。这东西对于安全性也有一定程度的贡献。

例如，对于 `umask` 值 002，相应的文件和目录缺省创建权限是什么呢？
1. 我们首先写下具有全部权限的模式，即 777 (所有用户都具有读、写和执行权限)。
2. 在下面一行按照 `umask` 值写下相应的位，在本例中是 002。
3. 在接下来的一行中记下上面两行中没有匹配的位。这就是目录的缺省创建权限。稍加练习就能够记住这种方法。
4. 对于文件来说，在创建时不能具有文件权限，只要拿掉相应的执行权限比特即可。

这就是上面的例子，其中 `umask` 值为 `002`：
1. 文件的最大权限 `-rwxrwxrwx (777)`
2.  `umask` 值为 002 `--------w-`
3. 目录权限 `drwxrwxr-x (775)` 这就是目录创建缺省权限
4. 文件权限 `-rw-rw-r-- (664)` 这就是文件创建缺省权限

下面是另外一个例子，假设这次 `umask` 值为 `022`：
1. 文件的最大权限 `-rwxrwxrwx (777)`
2.  `umask` 值为 `022 -----w--w-`
3. 目录权限 `drwxr-xr-x (755)` 这就是目录创建缺省权限
4. 文件权限 `-rw-r--r-- (644)` 这就是文件创建缺省权限