---
layout             :       post
title                 :        "Liquid 基础语法"
subtitle           :       "来点标签魔法怎么样"
date                :        2018-4-9
header-img   :        "img/home-bg-art.jpg"
heard-musk  :        0.3
catalog           :        true
tags                :
    - Liquid
---

## Output | 输出

简单输出示例：

```liquid
{% raw %}
Hello {{name}} 
Hello {{user.name}}
Hello {{ 'tobi' }}
{% endraw %}
```

## Advanced output: Filters | 高级输出：过滤器

输出标记需要的过滤器。过滤器是简单的方法。第一个参数在过滤器的左侧就是过滤器的输入，即需要过滤的内容。过滤器的返回值将是过滤器运行时过滤后的左侧的参数。当没有更多的过滤器，模板会收到结果字符串。

代码示例：

```
{% raw %}
Hello {{ 'tobi' | upcase }} 
Hello tobi has {{ 'tobi' | size }} letters! 
Hello {{ '*tobi*' | textilize | upcase }} 
Hello {{ 'now' | date: "%Y %h" }}
{% endraw %}
```

## Standard Filters | 标准过滤器

过滤器|说明
--|--
 date |时间格式化
 capitalize|设置输入中的某个单词*
 downcase|将输入的字符串转换为小写*
 upcase|将输入的字符串转换为大写
 first|获得传入的数组的第一个元素
 last|获得传入的数组的最后一个元素
 join|用数组的分隔符连接数组中的元素
 sort|数组中的元素排序
 map|通过指定的属性过滤数组中的元素
 size|返回一个数组或字符串的大小
 escape|转义一个字符串
 escape_once|返回HTML的转义版本，而不会影响现有的实体转义
 strip_html|从字符串去除HTML
 strip_newlines |从字符串中去除所有换行符（\ n）的
 newline_to_br|用HTML标记替换每个换行符（\ n）
 replace | 替换，例如：{{ 'foofoo' \| replace:'foo','bar' }} #=> 'barbar'
 replace_first|替换第一个，例如： '{{barbar' \|  replace_first:'bar','foo' }} #=> 'foobar'
remove | 删除，例如：{{'f barfoobar' \| remove:'foo' }} #=> 'barbar'
 remove_first|删除第一个，例如：{{ 'barbar' \|  remove_first:'bar' }} #=> 'bar'
 truncate|截取字符串到第x个字符
 truncatewords|截取字符串到第x个词
 prepend|前置添加字符串，例如：{{ 'bar' \| prepend:'foo' }} #=> 'foobar'
 append|后置追加字符串，例如：{{'foo' \| append:'bar' }} #=> 'foobar'
 minus|减法，例如：{{ 4 \| minus:2 }} #=> 2
 plus|加法，例如：{{'1' \| plus:'1' }} #=> '11', {{ 1 \| plus:1 }} #=> 2
 times|乘法，例如：{{ 5 \| times:4 }} #=> 20
 divided_by|除法，例如：{{ 10 \| divided_by:2 }} #=> 5
split|通过正则表达式切分字符串为数组，例如：{{"a~b" \| split:"~" }} #=> ['a','b']

 modulo|取模，例如：{{ 3 \| modulo:2 }} #=> 1

## 标记

目前支持的标记的列表：

标记 | 说明
--|--
assign  | 将某个值赋给一个变量
capture | 标记文本赋值给一个变量
case | 标准的case...when代码块
comment | 块标记，注释掉该块中的文本
cycle | 通常在循环中使用的值之间交替，如颜色或DOM类。
for | for循环
if | 标准的if/else代码块
include  | 包含另外一个模版
raw | 暂时停用标签处理以避免出现语法冲突
unless | if的反义词

### Comments | 注释

注释是最简单的标签，它会隐藏标记的内容。例如：
```
{% raw %}
We made 1 million dollars {% comment %} in losses {% endcomment %} this year.
{% endraw %}
```
### Raw | 

Raw暂时禁用标签处理。这是用于生成内容，它使用相互矛盾的语法非常有用。例如：
```
{% assign openTag = '{%' %}
{{ openTag }} raw %}
{% raw %}
In Handlebars, {{ this }} will be HTML-escaped, but {{{ that }}} will not. 
{% endraw %}
{{ openTag }} endraw %}
```
### If / Else

if / else语句对任何其他编程语言都应该是众所周知的。Liquid允许使用if,unless,以及可选的elsif和else,例如：
```
{% raw %}
{% if user %} 
Hello {{ user.name }} 
{% endif %}

# Same as above 
{% if user != null %} 
Hello {{ user.name }} 
{% endif %}

{% if user.name == 'tobi' %} 
Hello tobi 
{% elsif user.name == 'bob' %} 
Hello bob 
{% endif %}

{% if user.name == 'tobi' or user.name == 'bob' %} 
Hello tobi or bob 
{% endif %}

{% if user.name == 'bob' and user.age > 45 %}
Hello old bob 
{% endif %}

{% if user.name != 'tobi' %} 
Hello non-tobi 
{% endif %}

# Same as above 
{% unless user.name == 'tobi' %} 
Hello non-tobi 
{% endunless %}

# Check for the size of an array 
{% if user.payments == empty %} 
you never paid ! 
{% endif %} 

{% if user.payments.size > 0 %} 
you paid ! 
{% endif %}

{% if user.age > 18 %} 
Login here 
{% else %} 
Sorry, you are too young 
{% endif %}

# array = 1,2,3 
{% if array contains 2 %} 
array includes 2 
{% endif %}

# string = 'hello world' 
{% if string contains 'hello' %} 
string includes 'hello' 
{% endif %}
{% endraw %}
```

### Case Statement

如果您需要更多的条件，您可以使用case语句：
```
{% raw %}
{% case condition %} 
{% when 1 %} 
hit 1 
{% when 2 or 3 %} 
hit 2 or 3 
{% else %} 
... else ... 
{% endcase %}
{% endraw %}
```
例如：
```
{% raw %}
{% case template %} 
{% when 'label' %}   
{{ label.title }} 
{% when 'product' %}
{{ product.vendor | link_to_vendor }} {{ product.title }} 
{% else %}
{{page_title}} 
{% endcase %}
{% endraw %}
```
### Cycle

通常你有不同的颜色或类似的任务之间切换。 Liquid已经内置了对此类操作的支持，使用cycle标记。
```
{% raw %}
{% cycle 'one', 'two', 'three' %} 
{% cycle 'one', 'two', 'three' %} 
{% cycle 'one', 'two', 'three' %} 
{% cycle 'one', 'two', 'three' %}
{% endraw %}
```
结果为：
```
one two three one
```
如果未提供循环体的名称，那么它假设用同样的参数多次调用同一个循环体。

如果你想完全控制循环体，您可以选择指定循环体的名称。这甚至可以是一个变量。
```

{% raw %}
{% cycle 'group 1': 'one', 'two', 'three' %}
{% cycle 'group 1': 'one', 'two', 'three' %} 
{% cycle 'group 2': 'one', 'two', 'three' %} 
{% cycle 'group 2': 'one', 'two', 'three' %}
{% endraw %}
```
得到结果为：
```
one two one two
```
## For loops

Liquid 可以使用for遍历集合。
```
{% raw %}
{% for item in array %}
{{ item }}
{% endfor %}
{% endraw %}
```
当遍历一个键值对集合时，item[0]是key的值，item[1]则是value的值。
```
{% raw %}
{% for item in hash %} 
{{ item[0] }}: {{ item[1] }} 
{% endfor %}
{% endraw %}
```
在每次for循环中，下面的辅助变量可用于额外的需求：
```
forloop.length # => 整个for循环的长度 forloop.index # => 当前迭代的索引 forloop.index0 # => 当前迭代的索引(从0开始) forloop.rindex # => 剩余的迭代次数 forloop.rindex0 # => 剩余的迭代次数(从0开始) forloop.first # => 是否是第一次迭代? forloop.last # => 是否是最后一次迭代?
```
你还可以使用多个属性来过滤循环中的内容。

limit:int可以限制你有多少个项目获得 offset:int可以让你从第n项开始遍历。
```
{% raw %}
# array = [1,2,3,4,5,6] 
{% for item in array limit:2 offset:2 %} 
{{ item }} 
{% endfor %} 
# results in 3,4
{% endraw %}
```

倒序循环
```
{% raw %}
{% for item in collection reversed %} 
	{{item}} 
{% endfor %}
{% endraw %}
```

你可以通过定义一系列的数字来代替现有的集合循环。范围可以通过包括文本和变量的数字来定义：
```
{% raw %}
# if item.quantity is 4... 
{% for i in (1..item.quantity) %} 
{{ i }} 
{% endfor %} 
# results in 1,2,3,4
{% endraw %}
```
 

## Variable Assignment

您可以将数据存储在自己的变量，在输出或其他标记随意使用。创建一个变量最简单的方法是使用assign标签，它有一个非常简单的语法：
```
{% raw %}
{% assign name = 'freestyle' %} 
{% for t in collections.tags %} 
{% if t == name %} 
Freestyle! 
{% endif %} 
{% endfor %}
{% endraw %}
```

这个标签的另一种用法是分配true / false值：
```
{% raw %}
{% assign freestyle = false %} 
{% for t in collections.tags %} 
{% if t == 'freestyle' %} 
{% assign freestyle = true %} 
{% endif %} 
{% endfor %} 
{% if freestyle %} 
Freestyle! 
{% endif %}
{% endraw %}
```
如果你想将多个字符串合并成一个单一的字符串，并将其保存到变量中，你可以使用capture标记。这个标签“捕获”内容无论它是否已经实现，然后分配捕获的值。而不是只能捕获屏幕上已经存在的内容。

