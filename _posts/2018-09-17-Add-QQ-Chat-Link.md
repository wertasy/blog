---
layout:       post
title:        "网页跳转QQ聊天"
subtitle:     "Skip to QQ chat or friend adding interface"
date:         2018-9-17
header-img:   "img/post/BlackCuillin.jpg"
header-mask:  0.35
catalog:      true
tags:
    - html
    - QQ
    - link
---

## 1. 网页跳转QQ聊天界面和添加好友界面
```h
 http://wpa.qq.com/msgrd?v=3&uin=<QQ>&site=qq&menu=yes
```
## 2.网页跳转至QQ添加好友界面
```h
tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=<QQ>&fuin=2624802326&website=www.oicqzone.com
```
```h
tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=<QQ>&website=www.oicqzone.com
```

将以上的<QQ>替换为你自己的QQ号即可。