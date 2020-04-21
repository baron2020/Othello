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
            self.board.create_rectangle(10,10,60,60)
            self.board.create_rectangle(60,10,110,60)
            self.board.create_rectangle(110,10,160,60)
            self.board.create_rectangle(160,10,210,60)
            self.board.create_rectangle(210,10,260,60)
            self.board.create_rectangle(260,10,310,60)
            self.board.create_rectangle(310,10,360,60)
            self.board.create_rectangle(360,10,410,60)
            #2
            self.board.create_rectangle(10,60,60,110)
            self.board.create_rectangle(60,60,110,110)
            self.board.create_rectangle(110,60,160,110)
            self.board.create_rectangle(160,60,210,110)
            self.board.create_rectangle(210,60,260,110)
            self.board.create_rectangle(260,60,310,110)
            self.board.create_rectangle(310,60,360,110)
            self.board.create_rectangle(360,60,410,110)
            #3
            self.board.create_rectangle(10,110,60,160)
            self.board.create_rectangle(60,110,110,160)
            self.board.create_rectangle(110,110,160,160)
            self.board.create_rectangle(160,110,210,160)
            self.board.create_rectangle(210,110,260,160)
            self.board.create_rectangle(260,110,310,160)
            self.board.create_rectangle(310,110,360,160)
            self.board.create_rectangle(360,110,410,160)
            #4
            self.board.create_rectangle(10,160,60,210)
            self.board.create_rectangle(60,160,110,210)
            self.board.create_rectangle(110,160,160,210)
            self.board.create_rectangle(160,160,210,210)
            self.board.create_rectangle(210,160,260,210)
            self.board.create_rectangle(260,160,310,210)
            self.board.create_rectangle(310,160,360,210)
            self.board.create_rectangle(360,160,410,210)
            #5
            self.board.create_rectangle(10,210,60,260)
            self.board.create_rectangle(60,210,110,260)
            self.board.create_rectangle(110,210,160,260)
            self.board.create_rectangle(160,210,210,260)
            self.board.create_rectangle(210,210,260,260)
            self.board.create_rectangle(260,210,310,260)
            self.board.create_rectangle(310,210,360,260)
            self.board.create_rectangle(360,210,410,260)
            #6
            self.board.create_rectangle(10,260,60,310)
            self.board.create_rectangle(60,260,110,310)
            self.board.create_rectangle(110,260,160,310)
            self.board.create_rectangle(160,260,210,310)
            self.board.create_rectangle(210,260,260,310)
            self.board.create_rectangle(260,260,310,310)
            self.board.create_rectangle(310,260,360,310)
            self.board.create_rectangle(360,260,410,310)
            #7
            self.board.create_rectangle(10,310,60,360)
            self.board.create_rectangle(60,310,110,360)
            self.board.create_rectangle(110,310,160,360)
            self.board.create_rectangle(160,310,210,360)
            self.board.create_rectangle(210,310,260,360)
            self.board.create_rectangle(260,310,310,360)
            self.board.create_rectangle(310,310,360,360)
            self.board.create_rectangle(360,310,410,360)
            #8
            self.board.create_rectangle(10,360,60,410)
            self.board.create_rectangle(60,360,110,410)
            self.board.create_rectangle(110,360,160,410)
            self.board.create_rectangle(160,360,210,410)
            self.board.create_rectangle(210,360,260,410)
            self.board.create_rectangle(260,360,310,410)
            self.board.create_rectangle(310,360,360,410)
            self.board.create_rectangle(360,360,410,410)
            
        def run(self):
           self.mainloop()        
            
    if __name__=="__main__":
        start=Start()
        start.run()
