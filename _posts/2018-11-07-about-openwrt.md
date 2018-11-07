---
layout:       post
title:            "OpenWRT总结整理"
subtitle:     "About OpenWrt"
date:         2018-11-06
header-img:   "img/home-bg-bookshelf.jpg"
catalog:      true
tags:
    - 转载
    - OpenWrt
---

## 一、OpenWrt介绍
OpenWrt社区聚集了一大批纯正的Linux各个方向的死忠级专家,从而使OpenWrt具备了如下与传统NorFlash嵌入式Linux截然不同的高级特征：

### 1、SquashFS与JFFS2文件系统的整合形成的overlayfs机制

对用户而言,OpenWrt的整个文件系统是完全动态可读写的,而其中的固件部分是用SquashFS实施的只读压缩文件系统,而用户所有的对文件系统的增删改都是用类似“差值”的形态存储在JFFS2文件系统中的,二者用overlayfs机制黏合,对用户完全透明。因此我们可以在文件系统中肆意发挥、随便折腾,出现任何问题则可像手机一样恢复出厂设置,并提供fail-safe模式帮助用户修复系统。

而在传统的嵌入式Linux里,固件是静态的,对系统做任何一点与可运行程序相关的变动,比如增加一个模块,删除一个应用程序,都要重新编译全部固件,并重新刷写,就好比你一个Android手机要升级微信就要重新刷机。这种反人类的传统文件系统完全阻挡了非专业爱好者进入嵌入式Linux这一领域。

### 2、UCI（Unified Configuration Interface）

帮助用户在任何平台的OpenWrt上用同样的方法配置系统、网络和应用。在Boardcom的平台上,在Atheros的平台上,甚至x86的平台上,修改系统配置均为同样的命令。而UCI的机制并不是二进制硬件虚拟层实现的,是由Linux shell脚本实现的。这毫无疑问是一种别致的创新,比Android来的轻巧得多。OpenWrt里的Linux shell脚本用得很帅很高端,那种感觉怎么形容呢？就好像精通十八般武艺的高手有一天特别复古地拿起铅笔刀在硬盘上刻出来了系统,就是这种感觉。

### 3、Opkg包管理系统与丰富的软件源

是一个与桌面级Linux使用的apt-get、yum等同级别的包管理系统,使用形如：opkg install xxxx-app的命令从互联网软件源中安装大约3000余种各种软件。3000款软件,数量没法跟手机的应用市场比,但是要知道,这里头的任何一个软件都来头不小,是经过Linux社区千锤百炼的东西,一个应用折腾一个月都玩不够。类型覆盖网络、音频、视频、编程开发、Linux系统管理等。当然,如果是专业比较偏的东西OpenWrt的软件源里还是不够完善,比如笔者团队用到的OpenCV的东西,源里就没有,就靠自己交叉编译了。

### 4、Luci WEB界面系统

除CLI命令行终端界面外,不同于桌面级Linux使用屏幕GUI作为交互界面,OpenWrt使用WEB界面交互。而不同于传统路由器web管理界面的是,luci是用户可订制的,安装了支持luci的软件后,WEB界面系统就中出现了新的模块,而opkg本身也web化了。这个特征让用户感觉很像手机的app store。

 
## 二、openwrt 的jffs2和squafs两个版本的区别

 官方下载的都分jffs2和squafs两种格式,jffs2文件系统格式是适合于断电的系统,不像FAT那样容易丢文件,因为路由器一般都容易突然断电。官方的jffs2格式刷到路由器后就是一个jffs2分区,ROM本身和以后安装的软件都在这个分区里都可以读写。而squafs格式则是把ROM压缩到了一个文件刷进路由器,然后剩下的空间格式化成jffs2并且优先于ROM文件,有点像WM手机上的情况。ROM只 读分区挂在/rom下,而另一个可读写jffs2分区挂到/overlay,当/overlay下有和/rom同名的文件就优先读这个,相当于覆盖了 ROM文件,实际上并没有覆盖。这种情况的优点是ROM压缩率高,可写分区就更大一点,其次只要备份/overlay就可以把ROM以为的所有文件都备份 下来,以后全部还原就可以不用重新配置了。格式化/overlay分区就相当于恢复openwrt出厂设置了。官方推荐squafs,因为这种格式就算配置乱了还可以恢复刷机后的出厂设置,二是压缩后节省空间。jffs2格式搞乱了就只能重刷了。

 几个不同版本的说明：
- sysupgrade版：已经刷了openwrt固件,可用sysupgrade版本在OPENWRT的web页面内升级
tftp版:适用于目前是原厂固件或者ddwrt固件下tftp方式刷入
- factory版：此固件适用于直接在官方原厂固件下web方式刷入

brcm是指CPU方面的通用版本,jffs2是指文件系统可写,但是较大,squashfs是只读文件系统,但是压缩后很小。*.trx和*.bin;一般说来,trx的是通用的版本,bin是为一些设备支持提供的文件,使它符合一些设备的特性。

 分清两个文件factory和sysupgrade的区别，factory固件包含art部分，是从原厂固件升级到op用的，可以在路由器原版固件界面直接软升级，亦或是使用TTL方式刷入路由器，sysupgrade仅包含firmware部分，是已经是op的情况下升级固件用的，除非你对编程器非常了解，否则不推荐使用TTL方式刷入，升级最好的方式就是OpenWRT自带的sysupgrade功能，其次也可以使用mtd命令.当使用原版固件刷固件之后，第一次登录它只有 telnet 被启动，只有设置好root的密码后，我们才可以SSH进行操作