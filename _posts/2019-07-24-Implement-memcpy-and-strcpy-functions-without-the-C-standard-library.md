---
layout:       post
title:        不通过C语言标准库实现memcpy和strcpy函数
subtitle:     Implement memcpy and strcpy functions without the C standard library
date:         2019-07-24
header-img:   img/post/self-study-room.jpg
header-mask:  0.25
catalog:      true
tags:
    - 算法
    - 字符串
    - C/C++
    - 面试
---

### 题目
> 不通过C语言标准库实现memcpy和strcpy函数

### 审题
这样的题目并不算难，但是往往简单的题目里面暗藏玄机。稍不谨慎就会掉入陷阱，而往往自己却还全然不知，沾沾自喜。从面试官的角度来看，越简单的问题，他越希望面试者能够回答得更加全面。因此，越是简单的问题就越要小心地处理。

大多数人拿到这个题目就能立刻写出这样的代码。
```c++
void *mymemcpy(void *to, const void *from, size_t size)
{
    assert(from && to);
    const char *tmp_from = from;
    char *tmp_to = to;
    while (size--)
        *tmp_to++ = *tmp_from++;
    return to;
}

char *mystrcpy(char *dst, const char *src)
{
    assert(dst && src);
    char *tmp = dst;
    while ((*dst++ = *src++) != '\0');
    return tmp;
}
```
乍一看很不错，首先判断输入合法性，然后从源地址向目的地址依次拷贝值，中间指针处理也没有瑕疵。一切都看似很完美。但是，他忽略了一个重要的问题——内存重叠。没有内存重叠则已，一旦发生内存重叠，这样的代码就会出大问题！

### 深入思考
比如说，我们在一个足够大的字符数组中，将字符串 "love cplusplus" 从其开始处向后偏移5个字符开始拷贝。

![图1 内存布局](/img/post/lovecpp0.png)

如你所见，源地址所指的内存空间和目的地址所指的内存空间是有重叠的。

我们希望能够的到这样的结果：

![图2 希望的结果](/img/post/lovecpp1.png)

但是却犯下了一个大错误，我们把原字符串中重叠部分给的内容给覆盖了，最糟糕的是结束符 `\0` 也被覆盖了。

![图3 实际结果](/img/post/lovecpp2.png)

而这在 strcpy 中是致命的，会发生严重的数组越界，拷贝将无休止地执行下去，最终导致段错误。

可见，只想到从前往后依次拷贝，思维还不够严谨。这种方法只适用于拷贝区域没有重叠或者拷贝区域有重叠且目的地址在源地址前的特殊情况。一旦源地址在目的地址前，且拷贝区域有重叠的话，源地址中重叠部分会被当做拷贝目的地而直接被覆盖。这样一来，即便是声明了 const，源地址所指的数据依然被修改了。

所以处理拷贝问题时，请一定要记得考虑内存重叠问题。就如我们在写 c++ 时经常会遇到的设计拷贝构造函数和拷贝赋值运算符重载时，要先判断是否为自我赋值一样，处理拷贝问题时，请一定要记得考虑内存重叠问题。

于是，我们总结一下就可以得到发生内存重叠时的两种情况：
 - 目的地址在源地址前
 - 目的地址在原地址后

特别要注意目的地在源后时，此时应该从后往前拷贝，这种情况很容易被遗漏。

### 拓展延伸

还有一个需要关注的点就是 memcpy 和 strcpy 的关系。
它们有三个区别：
 1. 复制的内容不同。strcpy 只用来复制字符串，memcpy 可以用来复制任何内容。
 2. 复制方法不同。strcpy 预先不知道需要复制的长度，以 '\0' 作为结束标志，而 memcpy 需要指定复制的长度。
 3. 用途不同。通常复制字符串使用 strcpy， 复制其他类型的数据用 memcpy。

事实上我们也可以利用 memcpy 和 strlen 来实现 strcpy。

搞清楚了这些，代码就很好写了。

### 解题

```c++
#include <stdio.h>
#include <assert.h>

char *mymemcpy(void *to, const void *from, size_t size)
{
    assert(from && to);
    const char *tmp_from = from;
    char *tmp_to = to;
    if (from > to)
        while (size--)
            *tmp_to++ = *tmp_from++;
    else if (from < to)
    {
        tmp_from += size;
        tmp_to += size;
        while (size--)
            *--tmp_to = *--tmp_from;
    }
    return to;
}

size_t mystrlen(const char *str)
{
    const char *p = str;
    while (*p++ != '\0');
    return (size_t)(p - str);
}

char *mystrcpy(char *dst, const char *src)
{
    assert(dst && src);
    return mymemcpy(dst, src, mystrlen(src) + 1);
}

int main(int argc, char const *argv[])
{
    //              "love love cplusplus"
    char name[20] = "love cplusplus";
    mystrcpy(name + 5, name);
    printf("%s", name);
    return 0;
}
```
