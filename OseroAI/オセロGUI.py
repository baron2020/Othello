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
            self.board.create_rectangle(10,10,50,50)#開始位置ｙ（縦）,開始位置x(横),縦サイズ,横サイズ
            #self.board.create_rectangle(50,50,50,50)
            
        def run(self):
           self.mainloop()        
            
    if __name__=="__main__":
        start=Start()
        start.run()
