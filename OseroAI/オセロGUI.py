# -*- coding: utf-8 -*-
"""
Created on Sat Apr 25 17:54:01 2020

@author: barosan
"""
import tkinter as tk

window=tk.Tk()
window.title('オセロ')#タイトル
window.geometry("{}x{}+{}+{}".format(420, 500, 800, 100))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)
window.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
#boardの設定
#boardを作成する
window.board=tk.Canvas(width=420,height=420,bg="lime green")#canvasの設定
window.board.pack()#canvasをwindowに貼り付け
#マスの作成
#開始位置x（横）,開始位置y(縦),終了位置x(横),終了位置y(縦)
y=10
yy=60
for i in range(8):
    x=10
    xx=60
    for j in range(8):    
        window.board.create_rectangle(x,y,xx,yy,tags="d"+str(i)+"s"+str(j))
        x+=50
        xx+=50  
    y+=50
    yy+=50

def leftclick(event):
    x=window.board.canvasx(event.x)
    y=window.board.canvasy(event.y)
    l=[window.board.itemcget(obj,'tags')for obj in window.board.find_overlapping(x,y,x,y)]
    print(l)
    print("クリック")

window.board.bind('<Button-1>',leftclick)
window.mainloop()