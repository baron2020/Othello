# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 21:33:27 2020

@author: barosan
"""
from research import create_individual
import random

array=[1,2,3,4,5,6,7,8,9,10]
random.shuffle(array)
print(array)

kyokumen={'d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None','d1s8':'None',
          'd2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None','d2s8':'None',
          'd3s1':'None','d3s2':'None','d3s3':'None','d3s4':'None','d3s5':'None','d3s6':'None','d3s7':'None','d3s8':'None',
          'd4s1':'None','d4s2':'None','d4s3':'None','d4s4':'white','d4s5':'black','d4s6':'None','d4s7':'None','d4s8':'None',
          'd5s1':'None','d5s2':'None','d5s3':'None','d5s4':'black','d5s5':'white','d5s6':'None','d5s7':'None','d5s8':'None',
          'd6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None','d6s8':'None',
          'd7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None','d7s8':'None',
          'd8s1':'None','d8s2':'None','d8s3':'None','d8s4':'None','d8s5':'None','d8s6':'None','d8s7':'None','d8s8':'None'
          }

teban='黒'#'black'
gouhousyu=['d3s4', 'd4s3', 'd5s6', 'd6s5']

def test():
    print("test")
    
def ai_evalution_function():
    path='individual'+str(array.pop(0))
    print(path)
    ci=create_individual.CreateIndividual()
    ci_temp=ci.reading_csv(path)
    return ci_temp

test()

ai1=ai_evalution_function()
ai2=ai_evalution_function()
print(ai1)
print(ai2)
print(kyokumen)
print(teban)
print(gouhousyu)
