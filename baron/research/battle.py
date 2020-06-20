# -*- coding: utf-8 -*-
"""
Created on Wed Jun 17 14:23:55 2020

@author: barosan
"""

# from research import create_individual
import os
import csv
# import random

class Battle():
    def __init__(self,teban,kyokumen,gouhousyu,com):
        #teban,kyokumen,gouhousyu,com
        self.teban=teban#手番
        self.kyokumen=kyokumen#局面
        self.gouhousyu=gouhousyu#合法手
        self.com=com
        # print(self.teban)
        # print(self.kyokumen)
        # print(self.gouhousyu)
        # print(self.com)
       
    def get_random_array(self):
        with open('research/generation.txt','r',encoding='utf-8') as file:
            generation_name=file.read().strip() 
        target_path=os.getcwd()+"/research/"+generation_name+'/random.csv'
        # print(target_path)
        if os.path.isfile(target_path)==True:
            with open(target_path,'r',encoding='utf-8') as file:
                random_array=list(csv.reader(file))[0]
        # print(random_array)
        return random_array
                
    def return_check_index(self):
        check_index=[]
        for i in range(len(self.gouhousyu)):
            # print(self.gouhousyu[i])
            target_x=int(self.gouhousyu[i][1:2])-1#二文字目の段の切り出し
            target_y=int(self.gouhousyu[i][3:4])-1#四文字目の筋の切り出し
            check_index.append([target_x,target_y])
        # print(check_index)
        return check_index

    def read_individual_csv(self):
        print("関数読み込み")
        with open('research/generation.txt','r',encoding='utf-8') as file:
            generation_name=file.read().strip()
            target_path=os.getcwd()+"/research/"+generation_name+"/individual"+self.com+".csv"
        with open(target_path,'r',encoding='utf-8') as file:
            evalution_function=list(csv.reader(file))
        evalution_function.pop(0)
        # print(evalution_function)
        return evalution_function

    def matome(self):
        check_temp=[]#この配列の中から一番大きな数字を探す
        check_index=self.return_check_index()#確認用配列の作成
        evalution_function=self.read_individual_csv()#対象の評価関数の読み込み
        # print(check_temp)
        # print(check_index)
        # print(evalution_function)
        for i in range(len(check_index)):
            check_temp.append(evalution_function[check_index[i][0]][check_index[i][1]])
        print("☆☆☆")
        print(check_temp)
        ai_tyakusyu=self.gouhousyu[check_temp.index(max(check_temp))]
        return ai_tyakusyu

    def test(self):
        print("テスト☆")




