# -*- coding: utf-8 -*-
"""
Created on Wed May 20 15:45:47 2020

@author: barosan
"""

import tkinter as tk

class ModeChoice(tk.Tk):
    def __init__(self):
        super(ModeChoice,self).__init__()
        self.title('モード')#タイトル
        self.geometry("{}x{}+{}+{}".format(215, 215, 600, 125))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)
        self.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
        self.radioLabelArray=['Player (黒)  対  Player (白)','Player (黒)  対  AI (白)','AI (黒)  対  AI (白)']
        self.aisatuText=tk.StringVar()
        self.radioChoice=tk.IntVar()#どのラジオボタンを選択しているか？
        self.aisatuText.set("\nよろしくお願いします(*_ _)\n\n対局モードを選択してください。")
        #ボタン,ラジオボタンの生成,配置
        self.createBotton()
   
    #盤面生成
    def createBotton(self):
        #ラジオボタンの生成,配置
        for i in range(len(self.radioLabelArray)):
            createRadioButton=tk.Radiobutton(text=self.radioLabelArray[i],variable=self.radioChoice,value=i)
            createRadioButton.place(x=0,y=75+(i*35))

        self.aisatuDisp=tk.Label(textvariable=self.aisatuText)
        self.btn=tk.Button(text='OK?',command=self.btnClick)
        self.aisatuDisp.place(x=0,y=0)
        self.btn.place(x=0,y=180)
    
    #ボタンクリック
    def btnClick(self):
        labelIndex=self.radioChoice.get()
        res=tk.messagebox.askokcancel('askokcancel',self.radioLabelArray[labelIndex]+' で開始しますか？')
        print(res)
        #self.destroy()#ウィンドウを閉じる
        
    #実行
    def run(self):
        self.mainloop()
 
if __name__=="__main__":
    modeChoice=ModeChoice()
    modeChoice.run()
