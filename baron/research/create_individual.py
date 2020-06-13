# -*- coding: utf-8 -*-
"""
Created on Wed Jun  3 21:30:11 2020

@author: barosan
"""

import numpy as np
import os
import csv
import datetime
import random

class CreateIndividual():
    def __init__(self):
        self.dt_now=datetime.datetime.now()#現在の時刻
		# print(dt_now)#.strftime('%Y年%m月%d日 %H:%M:%S')

    def create_evalution_function(self):
        self.individual=[[0]*8 for i in range(8)]#個体=評価関数
        self.all_gene=[]#1個体の全ての遺伝子
        self.gene_index=[[1,2,3,4,4,3,2,1],
                         [2,5,6,7,7,6,5,2],
                         [3,6,8,9,9,8,6,3],
                         [4,7,9,10,10,9,7,4],
                         [4,7,9,10,10,9,7,4],
                         [3,6,8,9,9,8,6,3],
                         [2,5,6,7,7,6,5,2],
                         [1,2,3,4,4,3,2,1]
                         ]
        for i in range(10):
            random_gene=random.randint(-150,150)
            self.all_gene.append(random_gene)
        for y in range(8):
            for x in range(8):    
                self.individual[y][x]=self.all_gene[self.gene_index[y][x]-1]

        self.individual_np_array=np.array(self.individual)
        print(self.individual_np_array)#評価関数
        
    def writing_csv(self,path):
        temp_csv=path+'.csv'
        with open('research/'+temp_csv,'w',encoding='utf-8') as file:
            writer=csv.writer(file,lineterminator='\n')#改行コードの指定
            writer.writerow([self.dt_now])#ヘッダー
            writer.writerows(self.individual)#複数行の書き込み

    def reading_csv(self):
        with open('research/generation1/test0610.csv','r',encoding='utf-8') as file:
            csv_list=list(csv.reader(file))
        print(csv_list)
        print(csv_list[3][3])

    def update_record_csv(self,temp):   
        with open('research/record.csv','w',encoding='utf-8') as file:
            writer=csv.writer(file)
            writer.writerow([temp])

    def all_create_generation(self):
        with open('research/record.csv','r',encoding='utf-8') as file:
            generation_name=file.read().strip()
        # print(generation_name)
        target_dir="C:/Users/barosan/Desktop/BaronOsero/research/"+generation_name
        # print(target_dir)
        temp_head=generation_name[0:-1]
        temp_tail=generation_name[-1]

        if os.path.isdir(target_dir)==False:
            os.mkdir(target_dir)
            if generation_name=="generation1":
                print('初期世代')
                for i in range(1,21):
                    path=generation_name+'/individual'+str(i)
                    # print(i)
                    self.create_evalution_function()
                    self.writing_csv(path)
            elif generation_name!="generation1":
                print('2世代以降の処理')
            self.update_record_csv(temp_head+str(int(temp_tail)+1))
        else:
            print("存在するので何もしない")

    