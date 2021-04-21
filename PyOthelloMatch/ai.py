import random

#盤面情報,合法手,手番を受け取り着手を返す
class OtelloAi():
    # def __init__(self):   
    #弱い：ランダム着手を返す
    def weak(self,gouhousyu_array):
        # time.sleep(3)#x秒停止する
        random_ai=random.choice(gouhousyu_array)#ランダムな着手
        return random_ai