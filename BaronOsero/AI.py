# -*- coding: utf-8 -*-
"""
Created on Wed May 20 15:45:47 2020

@author: barosan
"""

import random
import time

#盤面情報,合法手,手番を受け取り着手を返す
class AI():
    # def __init__(self):   
    #弱い：ランダム着手を返す
    def weak(self,gouhousyuArray):
        # time.sleep(3)#x秒停止する
        randomAi=random.choice(gouhousyuArray)#ランダムな着手
        return randomAi

