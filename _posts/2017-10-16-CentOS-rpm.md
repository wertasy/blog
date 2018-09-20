---
layout:       post
title:        "CentOS7修改rpm源"
subtitle:     "CentOS7 modify rpm"
date:         2018-4-19
header-img:   "img/post/LVM.jpg"
header-mask:  0.35
catalog:      true
tags:
    - Linux 
    - CentOS
    - rpm
---
``` sh
yum install epel-release
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```