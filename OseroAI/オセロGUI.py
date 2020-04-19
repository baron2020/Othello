# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 22:08:02 2020

@author: barosan
"""
import tkinter as tk

def createWindow():
    window=tk.Tk()
    window.title('オセロ')#タイトル
    window.geometry("{}x{}+{}+{}".format(400, 400, 800, 100))#メインウィンドウの立ち上がり位置(w,h,x,y)
    window.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
    window.bans=tk.Canvas(width=400,height=400,bg="green")#canvasの設定
    window.bans.pack()#canvasをwindowに貼り付け
    window.mainloop()

createWindow()
