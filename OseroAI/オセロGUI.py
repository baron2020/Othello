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
        self.geometry("{}x{}+{}+{}".format(420, 500, 550, 25))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)
        self.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
        #石の数
        self.text1=tk.StringVar()
        self.text1.set("黒：2　白：2")
        
        #boardの設定
        self.create_board()
        #テスト用
        self.xxx='aaa'
        
    def create_board(self):
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
                self.board.create_rectangle(x,y,xx,yy,tag="d"+str(i)+"s"+str(j))
                x+=50
                xx+=50
            y+=50
            yy+=50
        self.board.create_oval(161,161,209,209,fill="white")            
        self.board.create_oval(211,161,259,209,fill="black")          
        self.board.create_oval(161,211,209,259,fill="black")
        self.board.create_oval(211,211,259,259,fill="white")
        #ラベル
        self.board.label1=tk.Label(textvariable=self.text1)
        self.board.label1.place(x=200,y=450)
       
        #デバッグ用ボタン
        self.board.btn1=tk.Button(text='配列',command=self.btn_click1)
        self.board.btn2=tk.Button(text='合法手',command=self.btn_click2)
        self.board.btn3=tk.Button(text='パス',command=self.btn_click3)
        self.board.btn4=tk.Button(text='投了',command=self.btn_click4)
        self.board.btn5=tk.Button(text='ボタン',command=self.btn_click5)

        self.board.btn1.pack(side='left')
        self.board.btn2.pack(side='left')
        self.board.btn3.pack(side='left')
        self.board.btn4.pack(side='left')
        self.board.btn5.pack(side='left')

        self.board.bind('<ButtonPress-1>',self.get_coordinate)#左クリック
       
    def targetDelete(self):
        self.board.delete("d3s0")
        
    def get_coordinate(self,event):
        print('x:'+str(event.x))
        print('y:'+str(event.y))
        
    
    def btn_click1(self):
        print(self.xxx)
        self.xxx='bbb'
    
    def btn_click2(self):
        print(self.xxx)
        self.xxx='ccc'

    def btn_click3(self):
        print("パス")

    def btn_click4(self):
        print("投了")

    def btn_click5(self):
        self.text1.set("ボタンを押しました")
        print(self.text1)

    def run(self):
        self.mainloop()
 
if __name__=="__main__":
        start=Start()
        # start.targetDelete()
        start.run()

        
