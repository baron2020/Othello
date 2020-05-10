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
        #盤面情報
        self.gameRecode={'d0s0':'None','d0s1':'None','d0s2':'None','d0s3':'None','d0s4':'None','d0s5':'None','d0s6':'None','d0s7':'None',
                         'd1s0':'None','d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None',
                         'd2s0':'None','d2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None',
                         'd3s0':'None','d3s1':'None','d3s2':'None','d3s3':'white','d3s4':'black','d3s5':'None','d3s6':'None','d3s7':'None',
                         'd4s0':'None','d4s1':'None','d4s2':'None','d4s3':'black','d4s4':'white','d4s5':'None','d4s6':'None','d4s7':'None',
                         'd5s0':'None','d5s1':'None','d5s2':'None','d5s3':'None','d5s4':'None','d5s5':'None','d5s6':'None','d5s7':'None',
                         'd6s0':'None','d6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None',
                         'd7s0':'None','d7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None'
                         }
        #盤面描写位置座標
        self.boardCoordinate=[[10,10,60,60],[60,10,110,60],[110,10,160,60],[160,10,210,60],[210,10,260,60],[260,10,310,60],[310,10,360,60],[360,10,410,60],
                              [10,60,60,110],[60,60,110,110],[110,60,160,110],[160,60,210,110],[210,60,260,110],[260,60,310,110],[310,60,360,110],[360,60,410,110],
                              [10,110,60,160],[60,110,110,160],[110,110,160,160],[160,110,210,160],[210,110,260,160],[260,110,310,160],[310,110,360,160],[360,110,410,160],
                              [10,160,60,210],[60,160,110,210],[110,160,160,210],[160,160,210,210],[210,160,260,210],[260,160,310,210],[310,160,360,210],[360,160,410,210],
                              [10,210,60,260],[60,210,110,260],[110,210,160,260],[160,210,210,260],[210,210,260,260],[260,210,310,260],[310,210,360,260],[360,210,410,260],
                              [10,260,60,310],[60,260,110,310],[110,260,160,310],[160,260,210,310],[210,260,260,310],[260,260,310,310],[310,260,360,310],[360,260,410,310],
                              [10,310,60,360],[60,310,110,360],[110,310,160,360],[160,310,210,360],[210,310,260,360],[260,310,310,360],[310,310,360,360],[360,310,410,360],
                              [10,360,60,410],[60,360,110,410],[110,360,160,410],[160,360,210,410],[210,360,260,410],[260,360,310,410],[310,360,360,410],[360,360,410,410]
                              ]
        #石描写位置座標
        self.stoneCoordinate=[[11,11,59,59],[61,11,109,59],[111,11,159,59],[161,11,209,59],[211,11,259,59],[261,11,309,59],[311,11,359,59],[361,11,409,59],
                              [11,61,59,109],[61,61,109,109],[111,61,159,109],[161,61,209,109],[211,61,259,109],[261,61,309,109],[311,61,359,109],[361,61,409,109],
                              [11,111,59,159],[61,111,109,159],[111,111,159,159],[161,111,209,159],[211,111,259,159],[261,111,309,159],[311,111,359,159],[361,111,409,159],
                              [11,161,59,209],[61,161,109,209],[111,161,159,209],[161,161,209,209],[211,161,259,209],[261,161,309,209],[311,161,359,209],[361,161,409,209],
                              [11,211,59,259],[61,211,109,259],[111,211,159,259],[161,211,209,259],[211,211,259,259],[261,211,309,259],[311,211,359,259],[361,211,409,259],
                              [11,261,59,309],[61,261,109,309],[111,261,159,309],[161,261,209,309],[211,261,259,309],[261,261,309,309],[311,261,359,309],[361,261,409,309],
                              [11,311,59,359],[61,311,109,359],[111,311,159,359],[161,311,209,359],[211,311,259,359],[261,311,309,359],[311,311,359,359],[361,311,409,359],
                              [11,361,59,409],[61,361,109,409],[111,361,159,409],[161,361,209,409],[211,361,259,409],[261,361,309,409],[311,361,359,409],[361,361,409,409]
                              ]      
        #石の数
        self.text1=tk.StringVar()
        self.text1.set("黒：2　白：2")
        #boardの描写
        self.create_board()
        #テスト用
        self.xxx='aaa'
        
    def create_board(self):
        #boardを作成する
        self.board=tk.Canvas(width=420,height=420,bg="lime green")#canvasの設定
        self.board.pack()#canvasをwindowに貼り付け
        #マスの作成
        #create_rectangle:長方形(x0,y0,x1,y1)
        for y in range(len(self.boardCoordinate)):
            self.board.create_rectangle(self.boardCoordinate[y][0],self.boardCoordinate[y][1],self.boardCoordinate[y][2],self.boardCoordinate[y][3])
        
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
        print(self.gameRecode.get('d3s3'))
        print(self.boardCoordinate[0])
        print(self.boardCoordinate[0][1])
        print(len(self.boardCoordinate))
        print(len(self.gameRecode))
       
    def run(self):
        self.mainloop()
 
if __name__=="__main__":
        start=Start()
        # start.targetDelete()
        start.run()

        
