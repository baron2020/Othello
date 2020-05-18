# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 22:08:02 2020
    
@author: barosan
"""
import tkinter as tk
    
class App(tk.Tk):
    def __init__(self):
        super(App,self).__init__()
        self.title('オセロ')#タイトル
        self.geometry("{}x{}+{}+{}".format(420, 500, 550, 25))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)
        self.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
        #盤面情報
        self.gameRecode={'d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None','d1s8':'None',
                         'd2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None','d2s8':'None',
                         'd3s1':'None','d3s2':'None','d3s3':'None','d3s4':'None','d3s5':'None','d3s6':'None','d3s7':'None','d3s8':'None',
                         'd4s1':'None','d4s2':'None','d4s3':'None','d4s4':'white','d4s5':'black','d4s6':'None','d4s7':'None','d4s8':'None',
                         'd5s1':'None','d5s2':'None','d5s3':'None','d5s4':'black','d5s5':'white','d5s6':'None','d5s7':'None','d5s8':'None',
                         'd6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None','d6s8':'None',
                         'd7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None','d7s8':'None',
                         'd8s1':'None','d8s2':'None','d8s3':'None','d8s4':'None','d8s5':'None','d8s6':'None','d8s7':'None','d8s8':'None'
                         }
        #盤面情報のキー
        self.gameRecodeKeys=['d1s1','d1s2','d1s3','d1s4','d1s5','d1s6','d1s7','d1s8',
                             'd2s1','d2s2','d2s3','d2s4','d2s5','d2s6','d2s7','d2s8',
                             'd3s1','d3s2','d3s3','d3s4','d3s5','d3s6','d3s7','d3s8',
                             'd4s1','d4s2','d4s3','d4s4','d4s5','d4s6','d4s7','d4s8',
                             'd5s1','d5s2','d5s3','d5s4','d5s5','d5s6','d5s7','d5s8',
                             'd6s1','d6s2','d6s3','d6s4','d6s5','d6s6','d6s7','d6s8',
                             'd7s1','d7s2','d7s3','d7s4','d7s5','d7s6','d7s7','d7s8',
                             'd8s1','d8s2','d8s3','d8s4','d8s5','d8s6','d8s7','d8s8'
                             ]
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
        #合法手確認関連
        self.useBlackArray=['black','white']#手番黒用
        self.useWhiteArray=['white','black']#手番白用
        self.checkTRBL_Coordinate=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]
        self.gouhousyuArray=[]#合法手を格納
        self.existRivalStoneFlg=False#ライバルの石が間に存在しない
        #合法手着手時の動作用
        self.turnOverStoneArray=[]#反転対象の石が置かれているマスを格納
        self.turnOverFlg=False#反転動作確認に使用
        #game情報
        self.teban='黒'
        self.rivalTeban='白'
        self.blackNum=2
        self.whiteNum=2
        self.tebanText=tk.StringVar()
        self.bWText=tk.StringVar()
        self.tebanText.set(self.teban+"の手番です")
        self.bWText.set("黒："+str(self.blackNum)+' '+"白："+str(self.whiteNum))
        #boardの描写
        self.createBoard()
       
    def createBoard(self):
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
        self.board.teban=tk.Label(textvariable=self.tebanText)#手番
        self.board.teban.place(x=200,y=450)
        self.board.label1=tk.Label(textvariable=self.bWText)#黒,白の石の数
        self.board.label1.place(x=300,y=450)   
        #デバッグ用ボタン
        self.board.btn1=tk.Button(text='盤面情報',command=self.btn_click1)
        self.board.btn2=tk.Button(text='合法手',command=self.btn_click2)
        self.board.btn3=tk.Button(text='パス',command=self.btn_pass)
        self.board.btn4=tk.Button(text='投了',command=self.btn_touryou)
        #ボタンの配置場所
        self.board.btn1.pack(side='left')
        self.board.btn2.pack(side='left')
        self.board.btn3.pack(side='left')
        self.board.btn4.pack(side='left')
        #イベント設定
        self.board.bind('<ButtonPress-1>',self.startOsero)#左クリック
       
    def startOsero(self,event):
        print('x:'+str(event.x))
        print('y:'+str(event.y))        
        if event.x > 10 and event.x < 60:
            xNum=1
        elif event.x > 60 and event.x < 110:
            xNum=2
        elif event.x > 110 and event.x < 160:
            xNum=3
        elif event.x > 160 and event.x < 210:
            xNum=4
        elif event.x > 210 and event.x < 260:
            xNum=5
        elif event.x > 260 and event.x < 310:
            xNum=6
        elif event.x > 310 and event.x < 360:
            xNum=7
        elif event.x > 360 and event.x < 410:
            xNum=8
        else:
            xNum=-1
        if event.y > 10 and event.y < 60:
            yNum=1
        elif event.y > 60 and event.y < 110:
            yNum=2
        elif event.y > 110 and event.y < 160:
            yNum=3
        elif event.y > 160 and event.y < 210:
            yNum=4
        elif event.y > 210 and event.y < 260:
            yNum=5
        elif event.y > 260 and event.y < 310:
            yNum=6
        elif event.y > 310 and event.y < 360:
            yNum=7
        elif event.y > 360 and event.y < 410:
            yNum=8
        else:
            yNum=-1
        
        if xNum!=-1 and yNum !=-1:
            currentMasu='d'+str(yNum)+'s'+str(xNum)
        else:
            currentMasu='盤外です'
        print('カレントマス:'+currentMasu)
        
        #もしクリックした場所が盤内なら
        if currentMasu in self.gameRecodeKeys:
            # print(self.gameRecodeKeys.index(currentMasu))
            # print(self.gameRecode.get(currentMasu))
            if self.gameRecode.get(currentMasu)=='None':#石がないマスなら
                self.setGouhousyuArray()#合法手確認
                #合法手であれば
                if currentMasu in self.gouhousyuArray:
                    sIndex=self.gameRecodeKeys.index(currentMasu)#配列の何番目に存在するか？
                    #クリックした場所に石を描写する
                    if self.teban == "黒":                    
                        self.board.create_oval(self.stoneCoordinate[sIndex][0],self.stoneCoordinate[sIndex][1],
                                               self.stoneCoordinate[sIndex][2],self.stoneCoordinate[sIndex][3],fill="black")
                        self.gameRecode[currentMasu]="black"#ゲーム記録も更新する
                    elif self.teban == "白":
                        self.board.create_oval(self.stoneCoordinate[sIndex][0],self.stoneCoordinate[sIndex][1],
                                               self.stoneCoordinate[sIndex][2],self.stoneCoordinate[sIndex][3],fill="white")
                        self.gameRecode[currentMasu]="white"#ゲーム記録も更新する
                    self.turnOverTheStoneMotion(currentMasu)#反転動作
                    self.changeTeban()#手番交代
                    self.gouhousyuArray.clear()#合法手配列のリセット
                    self.turnOverStoneArray.clear()#反転対象配列のリセット
                    return
                else:
                    print('合法手でありません')
                    self.gouhousyuArray.clear()#合法手配列のリセット
                    self.turnOverStoneArray.clear()#反転対象配列のリセット
                    return#リセット

    #合法手確認
    def setGouhousyuArray(self):
        if self.teban=='黒':
            switchArray=self.useBlackArray
        elif self.teban=='白':
            switchArray=self.useWhiteArray
        #tagetMasu:合法手確認の対象のマス
        for tagetMasu in self.gameRecodeKeys:
            if self.gameRecode.get(tagetMasu)!='None':
                continue#合法手確認の対象のマスに石があれば抜ける
            else:
                #合法手確認の対象のマスに石がないならば合法手確認する
                tagetDan=int(tagetMasu[1:2])#二文字目の段の切り出し
                tagetSuji=int(tagetMasu[3:4])#四文字目の段の切り出し
                for trblIndex in range(len(self.checkTRBL_Coordinate)):
                    self.existRivalStoneFlg=False#ライバルの石が間に存在しないフラグをFalseにする
                    checkDan=tagetDan
                    checkSuji=tagetSuji                    
                    while True:#確認マスを一マスづつ伸ばし合法手確認をする
                        checkDan+=self.checkTRBL_Coordinate[trblIndex][0]
                        checkSuji+=self.checkTRBL_Coordinate[trblIndex][1]
                        checkMasu='d'+str(checkDan)+'s'+str(checkSuji)
                        if checkDan==0 or checkSuji==0 or checkDan==9 or checkSuji==9:
                            break#盤外であれば抜ける
                        #盤内であれば
                        if self.gameRecode[checkMasu]=='None':
                            break#一マス先に石がなければ抜ける
                        if self.existRivalStoneFlg==False and self.gameRecode[checkMasu]==switchArray[0]:#[0]:自石
                            break#間にないライバルの石がない＆一マス先が自石ならぬける
                        if self.gameRecode[checkMasu]==switchArray[1]:#[1]:ライバルの石
                            self.existRivalStoneFlg=True
                            continue#マスの確認方向を一マス伸ばし処理を続ける
                        if self.existRivalStoneFlg==True and self.gameRecode[checkMasu]==switchArray[0]:#[0]:自石
                            self.gouhousyuArray.append(tagetMasu)#合法手を配列に格納
                            self.existRivalStoneFlg=False#フラグをFalseに戻す
                            break#ループを抜ける
    
    def turnOverTheStoneMotion(self,startingPoint):#石の反転動作
        print('起点のマス'+startingPoint)
        if self.teban=='黒':
            switchArray=self.useBlackArray
        elif self.teban=='白':
            switchArray=self.useWhiteArray
        tagetDan=int(startingPoint[1:2])#二文字目の段の切り出し
        tagetSuji=int(startingPoint[3:4])#四文字目の段の切り出し
        for trblIndex in range(len(self.checkTRBL_Coordinate)):
            self.turnOverFlg=False#動作確認に使用
            checkDan=tagetDan
            checkSuji=tagetSuji 
            while True:#確認マスを一マスづつ伸ばすためループを繰り返す
                checkDan+=self.checkTRBL_Coordinate[trblIndex][0]
                checkSuji+=self.checkTRBL_Coordinate[trblIndex][1]
                checkMasu='d'+str(checkDan)+'s'+str(checkSuji)
                if checkDan==0 or checkSuji==0 or checkDan==9 or checkSuji==9:
                    self.turnOverStoneArray.clear()
                    break#盤外であれば抜ける
                #盤内であれば
                if self.gameRecode[checkMasu]=='None':
                    self.turnOverStoneArray.clear()
                    break#一マス先に石がなければ抜ける
                if self.turnOverFlg==False and self.gameRecode[checkMasu]==switchArray[0]:#[0]:自石
                    self.turnOverStoneArray.clear()
                    break#間にないライバルの石がない＆一マス先が自石ならぬける
                if self.gameRecode[checkMasu]==switchArray[1]:#[1]:ライバルの石
                    self.turnOverFlg=True
                    self.turnOverStoneArray.append(checkMasu)#反転対象の石が置かれているマスを配列に格納する
                    continue#マスの確認方向を一マス伸ばし処理を続ける
                if self.turnOverFlg==True and self.gameRecode[checkMasu]==switchArray[0]:#[0]:自石
                    print('反転対象配列')
                    print(self.turnOverStoneArray)
                    #配列をもとに反転させる
                    for i in self.turnOverStoneArray:
                        sIndex=self.gameRecodeKeys.index(i)#配列の何番目に存在するか？
                        #石を反転させる
                        self.board.create_oval(self.stoneCoordinate[sIndex][0],self.stoneCoordinate[sIndex][1],
                                               self.stoneCoordinate[sIndex][2],self.stoneCoordinate[sIndex][3],fill=switchArray[0])
                        self.gameRecode[i]=switchArray[0]#ゲーム記録も更新する
                    self.turnOverFlgFlg=False#フラグをFalseに戻す
                    break#ループを抜ける
        
    def changeTeban(self):
        self.gouhousyuArray.clear()#合法手配列のリセット
        if self.teban=="黒":
           self.teban="白"
           self.rivalTeban="黒" 
        elif self.teban=="白":
            self.teban="黒"
            self.rivalTeban="白" 
        print(self.teban)
        self.tebanText.set(self.teban+"の手番です")
        self.blackNum=0
        self.whiteNum=0
        temp=list(self.gameRecode.values())#値の確認
        for stone in temp:
            if stone=='black':
               self.blackNum+=1
            elif stone=='white':
               self.whiteNum+=1
        self.bWText.set("黒："+str(self.blackNum)+" 白："+str(self.whiteNum))  
        
    def btn_click1(self):
        print(self.gameRecode)#盤面情報
        print(len(self.checkTRBL_Coordinate))
        
    
    def btn_click2(self):
        self.gouhousyuArray.clear()#合法手配列のリセット
        self.setGouhousyuArray()#合法手確認
        print(self.gouhousyuArray)#合法手
        self.gouhousyuArray.clear()#合法手配列のリセット

    def btn_pass(self):
        print("パス")
        #合法手がないならパス可能
        
    def btn_touryou(self):
        print("投了")
        self.tebanText.set(self.rivalTeban+"の勝ちです")#「逆手番の勝ちです」の表示
        #プログラムの終了を追加する

    def run(self):
        self.mainloop()
 
if __name__=="__main__":
        app=App()
        app.run()

        
