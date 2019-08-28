---
layout:       post
title:        makefile中的4种赋值方式
subtitle:     4 Assignment Methods in Makefile
date:         2019-07-24
header-img:   img/post/self-study-room.jpg
header-mask:  0.25
catalog:      true
tags:
    - Linux
    - Makefile
---

### 变量的定义与使用
Makefile中允许用户用等号自定义变量。
```sh
txt = Hello World
ALL:
    @echo $(txt)
```
使用变量时用 `$()` 将变量包住，以解析变量的值。
使用Shell变量时需要使用两个 `$$`。
```sh
ALL:
    @echo $$HOME
```

### 变量的4种赋值方式
makefile中有4种赋值符号：=、:=、?=、+=。
表格中记录了他们的性质。

符号|展开时机|展开方式|特性
-|-|-|-
=|执行时|动态展开|递归展开
:=|定义时|静态展开
?=|执行时|动态展开|仅赋初值
+=|执行时|动态展开|追加

这样描述可能比较抽象，不过没关系，下面我们用一个例子，把4种赋值都用上，让我们更好得理解它们。
```sh
STR1  = I Love
STR1 ?= I Hate   # STR1不为空，不赋值
STR2 ?= Linux    # STR2为空，赋值
STR1 += $(STR2)  # 将STR2追加在STR1之后
STR3 := $(STR1)  # 将STR1静态展开赋值给STR3
STR2  = Magic    # 修改STR2

# 观察STR1、STR3是否会改变
ALL:
    @echo $(STR1)
    @echo $(STR3)
```
make执行，输出如下：
```sh
I Love Magic
I Love Linux
```
将`STR2`追加在`STR1`之后，STR1的值变为 `I Love $(STR2)`。
随后当我们通过 `$(STR1)` 展开`STR1`时，会递归展开`STR2`。

最后，我们将`STR2`的值改变为`Magic`。
所以`$(STR3)`展开时，其中的`$(STR2)`也随之改变。

但由于`STR3`是在我们修改`STR2`之前通过静态展开赋值的，所以改变`STR2`并不影响`STR3`的值。