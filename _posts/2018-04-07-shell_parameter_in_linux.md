---
layout:       post
title:        "shell里的特殊变量"
subtitle:     "linux中shell变量$#,$@,$0,$1,$2的含义解释"
date:         2018-4-6 15:48:39
header-img:   "img/post/ubuntu-016.jpg"
tags:
    - Linux 
    - Shell 
    - Bash
---

##  变量说明: 

变量|说明
---|---
$$ | Shell本身的PID（ProcessID）   
$! | Shell最后运行的后台Process的PID 
$?|最后运行的命令的结束代码（返回值） 
$- | 使用Set命令设定的Flag一览 
$* |所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数 
$@ |所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数
$# |添加到Shell的参数个数 
$0 |Shell本身的文件名 
$1 ~ $n|添加到Shell的各参数值。$1是第1参数、$2是第2参数…

## 演示

```bash
#!/bin/bash
printf "The complete list is %s\n" "$$" 
printf "The complete list is %s\n" "$!"
printf "The complete list is %s\n" "$?"
printf "The complete list is %s\n" "$*"
printf "The complete list is %s\n" "$@"
printf "The complete list is %s\n" "$#"
printf "The complete list is %s\n" "$0"
printf "The complete list is %s\n" "$1"
printf "The complete list is %s\n" "$2"
```
## 输出

```bash
[Wert@localhost ~]$ bash params.sh 123456 QQ
The complete list is 24249
The complete list is
The complete list is 0
The complete list is 123456 QQ
The complete list is 123456
The complete list is QQ
The complete list is 2
The complete list is params.sh
The complete list is 123456
The complete list is QQ
```