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

### 查询类
功能|命令
-|-
显示所有网络连接|nmcli con show
显示活动网络连接|nmcli con show -active
显示指定网络连接的详情|nmcli con show eno16777728
显示网络设备连接状态|nmcli dev status
显示所有网络设备的详情|nmcli dev show
显示指定网络设备的详情|nmcli dev show eno16777728
查看添加网络连接配置的帮助|nmcli con add help 

### 控制类
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
nmcli con mod IF-NAME ipv4.dns 114.114.114.114添加dns1
nmcli con mod IF-NAME +ipv4.dns  8.8.8.8添加dns2
nmcli con mod IF-NAME -ipv4.dns  8.8.8.8删除dns

功能|命令
-|-
修改配置文件执行生效|systemctl restart network 或 nmcli con reload
nmcli命令生效|nmclicon down eth0 ; nmclicon up eth0

### nmcli命令修改所对应的文件条目

功能|命令
-|-
nmcli con mod       | ifcfg-* 文件
ipv4.method manual  |  BOOTPROTO=none
ipv4.method auto    |  BOOTPROTO=dhcp
connection.id eth0   |  NAME=eth0
(ipv4.addresses     |  IPADDR0=192.0.2.1
“192.0.2.1/24      |  PREFIX0=24
192.0.2.254”)      |  GATEWAY0=192.0.2.254
ipv4.dns 8.8.8.8   |  DNS0=8.8.8.8
pv4.dns-search example.com   |DOMAIN=example.com
pv4.ignore-auto-dns true  |  PEERDNS=no
connection.autoconnect yes |  ONBOOT=yes
connection.interface-name eth0| DEVICE=eth0
802-3-ethernet.mac-address... |HWADDR=...

图形工具|nm-connection-editor（Centos系统自带的图形模块）
网络接口配置tui工具|nmtui


## 部分命令示例

1. 显示所有网络连接 nmcli con show
```
[root@centos7 ~]# nmcli con show
NAME                UUID                                  TYPE            DEVICE      
virbr0-nic          4435f670-b732-49eb-afb9-6cef2481e749  generic         virbr0-nic  
virbr0              6802b5f0-f314-4669-b0f3-f69e25bb090c  bridge          virbr0      
Wired connection 1  d41f6dde-a78b-4bfa-a9b5-2e75cee0f5d3  802-3-ethernet  eno33554960 
System eno16777728  8cedbaed-b1ed-aa77-7f3c-6b5a960f4bb5  802-3-ethernet  eno16777728 
[root@centos7 ~]# 
```
2. 显示活动网络连接|nmcli con show -active
```
[root@centos7 ~]# nmcli con show -active
NAME                UUID                                  TYPE            DEVICE      
virbr0-nic          4435f670-b732-49eb-afb9-6cef2481e749  generic         virbr0-nic  
virbr0              6802b5f0-f314-4669-b0f3-f69e25bb090c  bridge          virbr0      
Wired connection 1  d41f6dde-a78b-4bfa-a9b5-2e75cee0f5d3  802-3-ethernet  eno33554960 
System eno16777728  8cedbaed-b1ed-aa77-7f3c-6b5a960f4bb5  802-3-ethernet  eno16777728 
[root@centos7 ~]#
```
3. 显示网络设备状态|nmcli dev status

```
[root@centos7 ~]# nmcli dev status
DEVICE       TYPE      STATE      CONNECTION         
virbr0       bridge    connected  virbr0             
eno16777728  ethernet  connected  System eno16777728 
eno33554960  ethernet  connected  Wired connection 1 
virbr0-nic   tap       connected  virbr0-nic         
lo           loopback  unmanaged  --                 
[root@centos7 ~]# 

```
4. 显示指定网络连接的详情|nmcli con show eno16777728
```
[root@centos7 ~]# nmcli con show eno16777728 
connection.id:                          eno16777728
connection.uuid:                        8cedbaed-b1ed-aa77-7f3c-6b5a960f4bb5
connection.interface-name:              eno16777728
connection.type:                        802-3-ethernet
connection.autoconnect:                 yes
connection.autoconnect-priority:        0
connection.timestamp:                   1473150860
connection.read-only:                   no
connection.permissions:                 
connection.zone:                        --
connection.master:                      --
connection.slave-type:                  --
connection.autoconnect-slaves:          -1 (default)
connection.secondaries:                 
connection.gateway-ping-timeout:        0
connection.metered:                     unknown
802-3-ethernet.port:                    --
802-3-ethernet.speed:                   0
802-3-ethernet.duplex:                  --
802-3-ethernet.auto-negotiate:          yes
802-3-ethernet.mac-address:             --
802-3-ethernet.cloned-mac-address:      --
802-3-ethernet.mac-address-blacklist:   
802-3-ethernet.mtu:                     auto
802-3-ethernet.s390-subchannels:        
802-3-ethernet.s390-nettype:            --
802-3-ethernet.s390-options:            
802-3-ethernet.wake-on-lan:             1 (default)
802-3-ethernet.wake-on-lan-password:    --
ipv4.method:                            manual
ipv4.dns:                               
ipv4.dns-search:                        
ipv4.addresses:                         10.1.254.254/16
ipv4.gateway:                           --
ipv4.routes:                            
ipv4.route-metric:                      -1
ipv4.ignore-auto-routes:                no
ipv4.ignore-auto-dns:                   no
ipv4.dhcp-client-id:                    --
ipv4.dhcp-send-hostname:                yes
ipv4.dhcp-hostname:                     --
ipv4.never-default:                     no
ipv4.may-fail:                          yes
ipv6.method:                            ignore
ipv6.dns:                               
ipv6.dns-search:                        
ipv6.addresses:                         
ipv6.gateway:                           --
ipv6.routes:                            
ipv6.route-metric:                      -1
ipv6.ignore-auto-routes:                no
ipv6.ignore-auto-dns:                   no
ipv6.never-default:                     no
ipv6.may-fail:                          yes
ipv6.ip6-privacy:                       -1 (unknown)
ipv6.dhcp-send-hostname:                yes
ipv6.dhcp-hostname:                     --
GENERAL.NAME:                           System eno16777728
GENERAL.UUID:                           8cedbaed-b1ed-aa77-7f3c-6b5a960f4bb5
GENERAL.DEVICES:                        eno16777728
GENERAL.STATE:                          activated
GENERAL.DEFAULT:                        no
GENERAL.DEFAULT6:                       no
GENERAL.VPN:                            no
GENERAL.ZONE:                           --
GENERAL.DBUS-PATH:                      /org/freedesktop/NetworkManager/ActiveConnection/4
GENERAL.CON-PATH:                       /org/freedesktop/NetworkManager/Settings/3
GENERAL.SPEC-OBJECT:                    /
GENERAL.MASTER-PATH:                    --
IP4.ADDRESS[1]:                         10.1.254.254/16
IP4.GATEWAY:                            
IP6.ADDRESS[1]:                         fe80::20c:29ff:fe06:f987/64
IP6.GATEWAY:                            
[root@centos7 ~]# 
```

5. 显示指定网络设备的详情|nmcli dev show eno16777728 
```
[root@centos7 ~]# nmcli dev show eno16777728 
GENERAL.DEVICE:                         eno16777728
GENERAL.TYPE:                           ethernet
GENERAL.HWADDR:                         00:0C:29:06:F9:87
GENERAL.MTU:                            1500
GENERAL.STATE:                          100 (connected)
GENERAL.CONNECTION:                     System eno16777728
GENERAL.CON-PATH:                       /org/freedesktop/NetworkManager/ActiveConnection/4
WIRED-PROPERTIES.CARRIER:               on
IP4.ADDRESS[1]:                         10.1.254.254/16
IP4.GATEWAY:                            
IP6.ADDRESS[1]:                         fe80::20c:29ff:fe06:f987/64
IP6.GATEWAY:                            
[root@centos7 ~]# 
```

6. 新建网络连接配置文件

1) 动态获取IP方式的网络连接配置|nmcli con add con-name eno16777728 type ethernet ifname eno16777728
```
[root@centos7 network-scripts]# nmcli con add con-name eno16777728 type ethernet ifname eno16777728 
Connection 'eno16777728' (6ce34ffb-d80a-4247-9a40-f0c19a45defa) successfully added.
[root@centos7 network-scripts]# cat ifcfg-eno16777728
TYPE=Ethernet
BOOTPROTO=dhcp
DEFROUTE=yes
PEERDNS=yes
PEERROUTES=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_FAILURE_FATAL=no
NAME=eno16777728
UUID=6ce34ffb-d80a-4247-9a40-f0c19a45defa
DEVICE=eno16777728
ONBOOT=yes
[root@centos7 network-scripts]# 
```
2) 指定静态IP方式的网络连接配置|nmcli con add con-name eno16777728 ifname eno16777728 autoconnect yes type ethernet ip4 10.1.254.254/16 gw4 10.1.0.1
```
[root@centos7 network-scripts]# nmcli con add con-name eno16777728 ifname eno16777728 autoconnect yes type ethernet ip4 10.1.254.254/16 gw4 10.1.0.1
Connection 'eno16777728' (ced5dba6-af9f-446e-9de0-d425a0ebb80e) successfully added.
[root@centos7 network-scripts]# cat ifcfg-eno16777728
TYPE=Ethernet
BOOTPROTO=none
IPADDR=10.1.254.254
PREFIX=16
GATEWAY=10.1.0.1
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_FAILURE_FATAL=no
NAME=eno16777728
UUID=ced5dba6-af9f-446e-9de0-d425a0ebb80e
DEVICE=eno16777728
ONBOOT=yes
[root@centos7 network-scripts]# 
```

7. 启用网络连接|nmcli con up eno16777728
```
[root@centos7 network-scripts]# nmcli con up eno16777728 
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/7)
[root@centos7 network-scripts]# 
```

8. 停用网络连接:nmcli con down eno33554960
```
[root@centos7 network-scripts]# nmcli con down eno33554960 
Connection 'eno33554960' successfully deactivated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/8)