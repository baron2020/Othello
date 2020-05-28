# -*- coding: utf-8 -*-
"""
Created on Wed May 20 15:45:47 2020

@author: barosan
"""

import tkinter as tk

class ModeChoice(tk.Tk):
    def __init__(self):
        super(ModeChoice,self).__init__()
        self.title('モード選択')#タイトル
        self.mode=-1#モード 0:PP 1:PAI 2:AIAI
        self.geometry("{}x{}+{}+{}".format(300, 300, 620, 200))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)215, 215, 600, 125
        self.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
        self.radio_label_array=['Player (黒)  対  Player (白)','Player (黒)  対  AI (白)','AI (黒)  対  AI (白)']
        self.aisatu_text=tk.StringVar()
        self.radio_choice=tk.IntVar()#どのラジオボタンを選択しているか？
        self.aisatu_text.set("白黒つけたい、あなたへ〇\n\nよろしくお願いします(*_ _)\n\n対局モードを選択してください。")
        #ボタン,ラジオボタンの生成,配置
        self.create_botton()
    
    #盤面生成
    def create_botton(self):
        #ラジオボタンの生成,配置
        for i in range(len(self.radio_label_array)):
            create_radio_button=tk.Radiobutton(text=self.radio_label_array[i],variable=self.radio_choice,value=i)
            create_radio_button.place(x=75,y=120+(i*40))
        self.aisatu_disp=tk.Label(textvariable=self.aisatu_text)
        self.btn=tk.Button(text='OK?',command=self.btn_click)
        self.aisatu_disp.place(x=75,y=20)
        self.btn.place(x=75,y=240)
    
    #ボタンクリック
    def btn_click(self):
        label_index=self.radio_choice.get()
        res=tk.messagebox.askokcancel('askokcancel',self.radio_label_array[label_index]+' で開始しますか？')
        # print(res)
        if res==True:
            self.mode=label_index#モード 0:PP 1:PAI 2:AIAI
            self.destroy()#ウィンドウを閉じる
            return
    
    #モードを返す
    def return_mode(self):
        # print('モードは'+str(self.mode))
        return self.mode#モードを返す
  
    #実行
    def run(self):
        self.mainloop()
 
# if __name__=="__main__":
#     modeChoice=ModeChoice()
#     modeChoice.run()
