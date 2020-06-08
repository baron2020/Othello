# -*- coding: utf-8 -*-
"""
Created on Wed Jun  3 21:30:11 2020

@author: barosan
"""

import os
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

hyouka_np_array=np.array(hyouka_array)
print(hyouka_np_array)
# array_sum=np.sum(hyouka_np_array)
# print(array_sum)

print(os.getcwd())
file=open('評価関数/テスト/test0608.txt','w',encoding='utf-8')
for i in hyouka_array:
    file.write(str(i)+',\n')
file.close()

test_data=open('評価関数/テスト/test0608.txt','r',encoding='utf-8')
data_all=test_data.read()
print(data_all)

test_data.close()