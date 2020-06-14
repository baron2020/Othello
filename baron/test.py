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

def test():
    print("test")
    
def ai_evalution_function():
    path='individual'+str(array.pop(0))
    print(path)
    ci=create_individual.CreateIndividual()
    ci_temp=ci.reading_csv(path)
    return ci_temp
    
# def incriment():
#     array_index+=1

test()

# ci=create_individual.CreateIndividual()
# ci.all_create_generation()
ai1=ai_evalution_function()
ai2=ai_evalution_function()
print(ai1)
print(ai2)
