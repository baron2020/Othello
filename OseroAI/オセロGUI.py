# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 22:08:02 2020
    
@author: barosan
"""
import tkinter as tk
    
class Start(tk.Tk):
    def __init__(self):
        super(Start,self).__init__()
        self.title('オセロ')#タイトル
        self.geometry("{}x{}+{}+{}".format(420, 500, 800, 100))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)
        self.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
        #boardの設定
        self.set_board()
            
    def set_board(self):
        #boardを作成する
        self.board=tk.Canvas(width=420,height=420,bg="lime green")#canvasの設定
        self.board.pack()#canvasをwindowに貼り付け
        #マスの作成
        #開始位置x（横）,開始位置y(縦),終了位置x(横),終了位置y(縦)
        y=10
        yy=60
        for i in range(8):
            x=10
            xx=60
            for j in range(8):    
                self.board.create_rectangle(x,y,xx,yy,tag="s1")
                x+=50
                xx+=50  
            y+=50
            yy+=50
                    
    def run(self):
        self.mainloop()        
        
    def targetDelete(self):
        self.board.delete("s1")
        
if __name__=="__main__":
        start=Start()
        start.targetDelete()
        start.run()

        
