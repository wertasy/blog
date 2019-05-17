---
layout: post
title: OpenWRT总结整理
subtitle: About OpenWrt
date: 2019-05-17
header-img: "img/home-bg-bookshelf.jpg"
catalog: true
tags:
    - Linux
    - 屏幕分辨率
    - 黑边
---

今天给装了 Linux 的笔记本外接了个分辨率是 1080x1920 的显示器，打开显示设置发现显示器分辨率最高却只有 1024x768。
于是使用 cvt + xrandr 产生一个 1080p 分辨率，可是最后发现显示器左侧还是有一块黑边。于是在使用 cvt 产生配置时加上 -r 选项，黑边就乖乖消失了。
命令如下：
```sh
$ cvt -r 1920 1080 60
# 1920x1080 59.93 Hz (CVT 2.07M9-R) hsync: 66.59 kHz; pclk: 138.50 MHz
Modeline "1920x1080R"  138.50  1920 1968 2000 2080  1080 1083 1088 1111 +hsync -vsync
$ xrandr --newmode 1920x1080R  138.50  1920 1968 2000 2080  1080 1083 1088 1111 +hsync -vsync
$ xrandr --addmode VGA1 1920x1080R
$ xrandr --output VGA1 --mode 1920x1080R
```
