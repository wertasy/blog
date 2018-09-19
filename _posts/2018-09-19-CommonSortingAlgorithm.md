---
layout:       post
title:        "常见的排序算法"
subtitle:     "Common Sorting Algorithm"
date:         "2018-9-19"
header-img:   "img/post/ubuntu-016.jpg"
catalog:      true
tags:
    - sort
    - algorithm
---

冒泡排序
---
它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成
- 时间复杂度：O(n²)
- 空间复杂度：O(1)
- 稳定性：稳定
```python
def bubble_sort(l):
  for i in range(len(l)):
    for j in range(len(l)-i-1):
      if l[j]<l[i]:
        l[i],l[j]=l[j],l[i]
  return l
```
选择排序
---
第1趟，在待排序记录r1 ~ r[n]中选出最小的记录，将它与r1交换；第2趟，在待排序记录r2 ~ r[n]中选出最小的记录，将它与r2交换；以此类推，第i趟在待排序记录r[i] ~ r[n]中选出最小的记录，将它与r[i]交换，使有序序列不断增长直到全部排序完毕
- 时间复杂度：O(n²)
- 空间复杂度：O(1)
- 稳定性：不稳定
```python
def select_sort(l):
  for i in range(len(l)):
    m=i
    for j in range(i+1,len(l)):
      if l[j]<l[m]:
        m=j
    if m==i:
      continue
    else:
      l[i],l[m]=l[m],l[i]
  return l
```
插入排序
---
插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据，算法适用于少量数据的排序；首先将第一个作为已经排好序的，然后每次从后的取出插入到前面并排序
- 时间复杂度：O(n²)
- 空间复杂度：O(1)
- 稳定性：稳定
```python
def insert_sort(l):
    for i in range(len(l)):
        for j in range(i):
            if l[i] < l[j]:
                l.insert(j, l.pop(i))
                break
    return l
```
希尔排序
---
希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止
```python
def shell_sort(a):
  n = len(a)
  gap = n >> 1
  while gap > 0:
    for i in range(gap, n):
      for j in range(i, 0, -gap):
        if a[j] < a[j - gap]:
          a[j], a[j - gap] = a[j - gap], a[j]
      gap >>= 1
  return l
```
快速排序
---
通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列
- 时间复杂度：O(nlog₂n)
- 空间复杂度：O(nlog₂n)
- 稳定性：不稳定

堆排序
---
它是选择排序的一种。可以利用数组的特点快速定位指定索引的元素。堆分为大根堆和小根堆，是完全二叉树。大根堆的要求是每个节点的值都不大于其父节点的值，即A[PARENT[i]] >= A[i]。在数组的非降序排序中，需要使用的就是大根堆，因为根据大根堆的要求可知，最大的值一定在堆顶
- 时间复杂度：O(nlog₂n)
- 空间复杂度：O(1)
- 稳定性：不稳定

基数排序
---
透过键值的部份资讯，将要排序的元素分配至某些“桶”中，藉以达到排序的作用
- 时间复杂度：O(d(r+n))
- 空间复杂度：O(rd+n)
- 稳定性：稳定

归并排序
---
采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为二路归并
- 时间复杂度：O(nlog₂n)
- 空间复杂度：O(1)
- 稳定性：稳定