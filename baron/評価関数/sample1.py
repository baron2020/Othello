# -*- coding: utf-8 -*-
"""
Created on Wed Jun  3 21:30:11 2020

@author: barosan
"""

import numpy as np
import random

hyouka_array=[[0]*8 for i in range(8)]#全体の評価関数
temp_array=[]#1個の評価関数
kansu_index=[[1,2,3,4,4,3,2,1],
             [2,5,6,7,7,6,5,2],
             [3,6,8,9,9,8,6,3],
             [4,7,9,10,10,9,7,4],
             [4,7,9,10,10,9,7,4],
             [3,6,8,9,9,8,6,3],
             [2,5,6,7,7,6,5,2],
             [1,2,3,4,4,3,2,1]
             ]

for i in range(10):
    temp_hyouka=random.randint(-150,150)
    temp_array.append(temp_hyouka)

for i in temp_array:
    print(i)

for y in range(8):
    for x in range(8):
       hyouka_array[y][x]=temp_array[kansu_index[y][x]-1]

# print(hyouka_array)
hyouka_np_array=np.array(hyouka_array)
print(hyouka_np_array)

s2=np.sum(hyouka_np_array)
print(s2)

