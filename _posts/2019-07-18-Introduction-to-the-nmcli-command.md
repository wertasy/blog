---
layout:       post
title:        nmcli命令介绍
subtitle:     Introduction to the nmcli command
date:         2019-07-18
header-img:   img/post/self-study-room.jpg
header-mask:  0.25
catalog:      true
tags:
    - Linux
    - 网络
    - 配置
    - 命令
---

## nmcli命令集

### 查询信息

功能|命令
-|-
显示所有网络连接|nmcli con show
显示活动网络连接|nmcli con show -active
显示指定网络连接的详情|nmcli con show eno16777728
显示网络设备连接状态|nmcli dev status
显示所有网络设备的详情|nmcli dev show
显示指定网络设备的详情|nmcli dev show eno16777728
查看添加网络连接配置的帮助|nmcli con add help 

### 控制开关

功能|命令
-|-
启用网络连接|nmcli con up eno16777728
停用网络连接（可被自动激活）|nmcli con down eno33554960
禁用网卡，防止被自动激活|nmcli dev dis eth0 
删除网络连接的配置文件|nmcli con del eno33554960
重新加载配置网络配置文件|nmcli con reload
启用/关闭所有的网络连接|nmcli net on/off
禁用网络设备并防止自动激活|nmcli con dis eno33554960

### 添加配置

功能|命令
-|-
动态获取IP方式的网络连接配置|nmcli con add con-name eno16777728 type ethernet ifname eno16777728
指定静态IP方式的网络连接配置|nmcli con add con-name eno16777728 ifname eno16777728 autoconnect yes type ethernet ip4 10.1.254.254/16 gw4 10.1.0.1


### 修改网络连接单项参数

功能|命令
-|-
修改为自动连接|nmcli con mod IF-NAME connection.autoconnect yes
修改IP地址分配方式|nmcli con mod IF-NAME ipv4.method [auto, link-local, manual, shared, disabled]
修改IP配置及网关|nmcli con mod IF-NAME ipv4.addresses "172.25.X.10/24 172.25.X.254"
修改默认网关|nmcli con mod IF-NAME ipv4.gateway 10.1.0.1
添加第二个IP地址|nmcli con mod IF-NAME +ipv4.addresses 10.10.10.10/16
添加dns1|nmcli con mod IF-NAME ipv4.dns 114.114.114.114
添加dns2|nmcli con mod IF-NAME +ipv4.dns  8.8.8.8
删除dns|nmcli con mod IF-NAME -ipv4.dns  8.8.8.8

### 应用修改

功能|命令
-|-
修改配置文件执行生效|systemctl restart network 或 nmcli con reload
nmcli命令生效|nmclicon down eth0 ; nmclicon up eth0
