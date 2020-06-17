# -*- coding: utf-8 -*-
"""
Created on Sat Jun 13 22:02:46 2020

@author: barosan
"""
from research import create_individual

if __name__=="__main__":
    ci=create_individual.CreateIndividual()
    ci.all_create_generation()#世代の作成,個体のランダムシャッフル,次世代に更新
