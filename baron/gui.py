# -*- coding: utf-8 -*-
"""
Created on Sun Apr 19 22:08:02 2020
    
@author: barosan
"""

import ai
import tkinter as tk

class OseroGui(tk.Tk):
    def __init__(self,mode):
        super(OseroGui,self).__init__()
        self.mode=mode#モード 0:PP 1:PAI 2:AIAI
        self.title('オセロ')#タイトル
        self.geometry("{}x{}+{}+{}".format(420, 500, 670, 60))#(サイズw,h,メインウィンドウの立ち上がり位置x,y)
        self.resizable(width=0,height=0)#メインウィンドウの拡大・縮小禁止
        #盤面情報
        self.game_recode={'d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None','d1s8':'None',
                         'd2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None','d2s8':'None',
                         'd3s1':'None','d3s2':'None','d3s3':'None','d3s4':'None','d3s5':'None','d3s6':'None','d3s7':'None','d3s8':'None',
                         'd4s1':'None','d4s2':'None','d4s3':'None','d4s4':'white','d4s5':'black','d4s6':'None','d4s7':'None','d4s8':'None',
                         'd5s1':'None','d5s2':'None','d5s3':'None','d5s4':'black','d5s5':'white','d5s6':'None','d5s7':'None','d5s8':'None',
                         'd6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None','d6s8':'None',
                         'd7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None','d7s8':'None',
                         'd8s1':'None','d8s2':'None','d8s3':'None','d8s4':'None','d8s5':'None','d8s6':'None','d8s7':'None','d8s8':'None'
                         }
        #盤面情報のキー
        self.game_recode_keys=['d1s1','d1s2','d1s3','d1s4','d1s5','d1s6','d1s7','d1s8',
                             'd2s1','d2s2','d2s3','d2s4','d2s5','d2s6','d2s7','d2s8',
                             'd3s1','d3s2','d3s3','d3s4','d3s5','d3s6','d3s7','d3s8',
                             'd4s1','d4s2','d4s3','d4s4','d4s5','d4s6','d4s7','d4s8',
                             'd5s1','d5s2','d5s3','d5s4','d5s5','d5s6','d5s7','d5s8',
                             'd6s1','d6s2','d6s3','d6s4','d6s5','d6s6','d6s7','d6s8',
                             'd7s1','d7s2','d7s3','d7s4','d7s5','d7s6','d7s7','d7s8',
                             'd8s1','d8s2','d8s3','d8s4','d8s5','d8s6','d8s7','d8s8'
                             ]
        #オセロ棋譜公式
        self.kihu=['a1','b1','c1','d1','e1','f1','g1','h1',
                   'a2','b2','c2','d2','e2','f2','g2','h2',
                   'a3','b3','c3','d3','e3','f3','g3','h3',
                   'a4','b4','c4','d4','e4','f4','g4','h4',
                   'a5','b5','c5','d5','e5','f5','g5','h5',
                   'a6','b6','c6','d6','e6','f6','g6','h6',
                   'a7','b7','c7','d7','e7','f7','g7','h7',
                   'a9','b8','c8','d8','e8','f8','g8','h8'
                   ]
        #盤面描写位置座標
        self.board_coordinate=[[10,10,60,60],[60,10,110,60],[110,10,160,60],[160,10,210,60],[210,10,260,60],[260,10,310,60],[310,10,360,60],[360,10,410,60],
                              [10,60,60,110],[60,60,110,110],[110,60,160,110],[160,60,210,110],[210,60,260,110],[260,60,310,110],[310,60,360,110],[360,60,410,110],
                              [10,110,60,160],[60,110,110,160],[110,110,160,160],[160,110,210,160],[210,110,260,160],[260,110,310,160],[310,110,360,160],[360,110,410,160],
                              [10,160,60,210],[60,160,110,210],[110,160,160,210],[160,160,210,210],[210,160,260,210],[260,160,310,210],[310,160,360,210],[360,160,410,210],
                              [10,210,60,260],[60,210,110,260],[110,210,160,260],[160,210,210,260],[210,210,260,260],[260,210,310,260],[310,210,360,260],[360,210,410,260],
                              [10,260,60,310],[60,260,110,310],[110,260,160,310],[160,260,210,310],[210,260,260,310],[260,260,310,310],[310,260,360,310],[360,260,410,310],
                              [10,310,60,360],[60,310,110,360],[110,310,160,360],[160,310,210,360],[210,310,260,360],[260,310,310,360],[310,310,360,360],[360,310,410,360],
                              [10,360,60,410],[60,360,110,410],[110,360,160,410],[160,360,210,410],[210,360,260,410],[260,360,310,410],[310,360,360,410],[360,360,410,410]
                              ]
        #石描写位置座標
        self.stone_coordinate=[[11,11,59,59],[61,11,109,59],[111,11,159,59],[161,11,209,59],[211,11,259,59],[261,11,309,59],[311,11,359,59],[361,11,409,59],
                              [11,61,59,109],[61,61,109,109],[111,61,159,109],[161,61,209,109],[211,61,259,109],[261,61,309,109],[311,61,359,109],[361,61,409,109],
                              [11,111,59,159],[61,111,109,159],[111,111,159,159],[161,111,209,159],[211,111,259,159],[261,111,309,159],[311,111,359,159],[361,111,409,159],
                              [11,161,59,209],[61,161,109,209],[111,161,159,209],[161,161,209,209],[211,161,259,209],[261,161,309,209],[311,161,359,209],[361,161,409,209],
                              [11,211,59,259],[61,211,109,259],[111,211,159,259],[161,211,209,259],[211,211,259,259],[261,211,309,259],[311,211,359,259],[361,211,409,259],
                              [11,261,59,309],[61,261,109,309],[111,261,159,309],[161,261,209,309],[211,261,259,309],[261,261,309,309],[311,261,359,309],[361,261,409,309],
                              [11,311,59,359],[61,311,109,359],[111,311,159,359],[161,311,209,359],[211,311,259,359],[261,311,309,359],[311,311,359,359],[361,311,409,359],
                              [11,361,59,409],[61,361,109,409],[111,361,159,409],[161,361,209,409],[211,361,259,409],[261,361,309,409],[311,361,359,409],[361,361,409,409]
                              ] 
        #合法手確認関連
        self.use_black_array=['black','white']#手番黒用
        self.use_white_array=['white','black']#手番白用
        self.all_direction_array=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]#8方向(上,右上,右,右下,下,左下,左,左上)
        self.gouhousyu_array=[]#合法手を格納
        self.exist_rival_stone_flg=False#ライバルの石が間に存在しない
        #合法手着手時の動作用
        self.turn_over_stone_array=[]#反転対象の石が置かれているマスを格納
        self.turn_over_flg=False#反転動作確認に使用
        #game情報
        self.end_flg=False#勝敗が着いているか？
        self.teban='黒'
        self.rival_teban='白'
        self.black_num=2
        self.white_num=2
        self.teban_text=tk.StringVar()
        self.bw_text=tk.StringVar()
        self.teban_text.set(self.teban+"の手番です")
        self.bw_text.set("黒："+str(self.black_num)+' '+"白："+str(self.white_num))
        #boardの描写
        self.create_board()
        
    def create_board(self):
        """
        盤面を生成する。
        """
        self.board=tk.Canvas(width=420,height=420,bg="lime green")#canvasの設定
        self.board.pack()#canvasをwindowに貼り付け
        #マスの作成
        #create_rectangle:長方形(x0,y0,x1,y1)
        for y in range(len(self.board_coordinate)):
            self.board.create_rectangle(self.board_coordinate[y][0],self.board_coordinate[y][1],
                                        self.board_coordinate[y][2],self.board_coordinate[y][3])
        self.board.create_oval(161,161,209,209,fill="white",tag="stone")            
        self.board.create_oval(211,161,259,209,fill="black",tag="stone")          
        self.board.create_oval(161,211,209,259,fill="black",tag="stone")
        self.board.create_oval(211,211,259,259,fill="white",tag="stone")
        #ラベル
        self.board.teban=tk.Label(textvariable=self.teban_text)#手番
        self.board.teban.place(x=280,y=435)
        self.board.bw=tk.Label(textvariable=self.bw_text)#黒,白の石の数
        self.board.bw.place(x=280,y=465)
        #イベントボタン
        self.board.btn_gouhousyu=tk.Button(text='合法手',command=self.btn_gouhousyu)
        self.board.btn_pass=tk.Button(text='パス',command=self.btn_pass)
        self.board.btn_touryou=tk.Button(text='投了',command=self.btn_touryou)
        self.board.btn_back_start=tk.Button(text='最初に戻る',command=self.btn_back_start)
        #ボタンの配置場所
        self.board.btn_gouhousyu.pack(padx=15,side='left')
        self.board.btn_pass.pack(side='left')
        self.board.btn_touryou.pack(padx=15,side='left')
        self.board.btn_back_start.pack(side='left')
        #イベント設定
        self.board.bind('<ButtonPress-1>',self.click_start)#左クリック
     
    def click_start(self,event):
        """
        クリックでスタートした時の処理。
        """
        if self.end_flg==True:#勝敗が着いている    
            return
        
        if self.mode==2: #もしAI対AIなら
            print('AI対AI')
            # while self.end_flg==False:#勝敗が着いていないなら
            self.ai_tyakusyu()#AIの着手処理
            return
        
        if self.teban=='黒':
            switch_array=self.use_black_array
        elif self.teban=='白':
            switch_array=self.use_white_array
        self.set_gouhousyu_array()#合法手生成
        #合法手がなければパスを進言する
        if len(self.gouhousyu_array)==0:
            tk.messagebox.showinfo('showinfo','合法手はありません。\nパスしてください。')#タイトル,メッセージ内容
            return
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
            current_masu='d'+str(yNum)+'s'+str(xNum)
        else:
            current_masu='盤外です'
        print('カレントマス:'+current_masu)
        if self.end_flg==False:#勝敗が着いていないなら    
            #もしクリックした場所が盤内なら
            if current_masu in self.game_recode_keys:
                if self.game_recode.get(current_masu)=='None':#石がないマスなら
                    #合法手であれば
                    if current_masu in self.gouhousyu_array:
                        key_index=self.game_recode_keys.index(current_masu)#配列の何番目に存在するか？
                        #クリックした場所に石を描写する
                        self.board.create_oval(self.stone_coordinate[key_index][0],self.stone_coordinate[key_index][1],
                                               self.stone_coordinate[key_index][2],self.stone_coordinate[key_index][3],fill=switch_array[0],tag="stone")#[0]:自石
                        self.game_recode[current_masu]=switch_array[0]#ゲーム記録も更新する
                        self.turn_over_stone(current_masu)#反転動作
                        self.check_stone_num()#石の数の確認,更新
                        self.win_lose_judgment()#勝敗判定
                        if self.end_flg==True:#勝敗がついた
                            return
                        self.change_teban()#手番交代
                        self.gouhousyu_array.clear()#合法手配列のリセット
                        self.turn_over_stone_array.clear()#反転対象配列のリセット
                    else:
                        print('合法手ではありません')
                        self.gouhousyu_array.clear()#合法手配列のリセット
                        self.turn_over_stone_array.clear()#反転対象配列のリセット
                        return#リセット
        
        if self.mode==1 and self.teban=='白' and self.end_flg==False:#もしP対AI＆白&勝敗が着いていない
            self.ai_tyakusyu()#AIの着手処理
        return#リセット

    def ai_tyakusyu(self):
        """
        AIの着手する際の処理。
        """
        if self.teban=='黒':
            switch_array=self.use_black_array
        elif self.teban=='白':
            switch_array=self.use_white_array
        self.set_gouhousyu_array()#AIの合法手生成
        if len(self.gouhousyu_array)==0:
            print('パスします。')
            tk.messagebox.showinfo('showinfo','合法手はありません。パスします。')#パス
            self.change_teban()
            self.gouhousyu_array.clear()#合法手配列のリセット
            return
        osero_ai=ai.OseroAi()  
        random_ai=osero_ai.weak(self.gouhousyu_array)#ランダムな着手
        # print(self.gouhousyu_array)
        print("ランダム着手"+random_ai)
        key_index=self.game_recode_keys.index(random_ai)#配列の何番目に存在するか？
        #AIの着手石を描写する
        self.board.create_oval(self.stone_coordinate[key_index][0],self.stone_coordinate[key_index][1],
                               self.stone_coordinate[key_index][2],self.stone_coordinate[key_index][3],fill=switch_array[0],tag="stone")#[0]:自石
        self.game_recode[random_ai]=switch_array[0]#ゲーム記録も更新する
        self.turn_over_stone(random_ai)#反転動作
        self.check_stone_num()#石の数の確認,更新
        self.win_lose_judgment()#勝敗判定
        if self.end_flg==True:#勝敗がついた
           return
        self.change_teban()#手番交代
        self.gouhousyu_array.clear()#合法手配列のリセット
        self.turn_over_stone_array.clear()#反転対象配列のリセット
        
    def set_gouhousyu_array(self):
        """
         手番の合法手を生成する。
        """
        if self.teban=='黒':
            switch_array=self.use_black_array
        elif self.teban=='白':
            switch_array=self.use_white_array
        #tagetMasu:合法手確認の対象のマス
        for taget_masu in self.game_recode_keys:
            if self.game_recode.get(taget_masu)!='None':
                continue#合法手確認の対象のマスに石があれば抜ける
            else:
                #合法手確認の対象のマスに石がないならば合法手確認する
                taget_dan=int(taget_masu[1:2])#二文字目の段の切り出し
                taget_suji=int(taget_masu[3:4])#四文字目の筋の切り出し
                for direction_index in range(len(self.all_direction_array)):#8方向確認(上,右上,右,右下,下,左下,左,左上)
                    self.exist_rival_stone_flg=False#ライバルの石が間に存在しないフラグをFalseにする
                    check_dan=taget_dan
                    check_suji=taget_suji                    
                    while True:#確認マスを一マスづつ伸ばし合法手確認をする
                        check_dan+=self.all_direction_array[direction_index][0]
                        check_suji+=self.all_direction_array[direction_index][1]
                        check_masu='d'+str(check_dan)+'s'+str(check_suji)
                        if check_dan==0 or check_suji==0 or check_dan==9 or check_suji==9:
                            break#盤外であれば抜ける
                        #盤内であれば
                        if self.game_recode[check_masu]=='None':
                            break#一マス先に石がなければ抜ける
                        if self.exist_rival_stone_flg==False and self.game_recode[check_masu]==switch_array[0]:#[0]:自石
                            break#間にないライバルの石がない＆一マス先が自石ならぬける
                        if self.game_recode[check_masu]==switch_array[1]:#[1]:ライバルの石
                            self.exist_rival_stone_flg=True
                            continue#マスの確認方向を一マス伸ばし処理を続ける
                        if self.exist_rival_stone_flg==True and self.game_recode[check_masu]==switch_array[0]:#[0]:自石
                            self.gouhousyu_array.append(taget_masu)#合法手を配列に格納
                            self.exist_rival_stone_flg=False#フラグをFalseに戻す
                            break#ループを抜ける

    #石の反転
    def turn_over_stone(self,starting_point):
        """
        着手した手に対して石を反転させる。
        """
        print('起点のマス'+starting_point)
        if self.teban=='黒':
            switch_array=self.use_black_array
        elif self.teban=='白':
            switch_array=self.use_white_array
        taget_dan=int(starting_point[1:2])#二文字目の段の切り出し
        taget_suji=int(starting_point[3:4])#四文字目の筋の切り出し
        for direction_index in range(len(self.all_direction_array)):#8方向確認(上,右上,右,右下,下,左下,左,左上)
            self.turn_over_flg=False#動作確認に使用
            check_dan=taget_dan
            check_suji=taget_suji
            while True:#確認マスを一マスづつ伸ばすためループを繰り返す
                check_dan+=self.all_direction_array[direction_index][0]
                check_suji+=self.all_direction_array[direction_index][1]
                check_masu='d'+str(check_dan)+'s'+str(check_suji)
                if check_dan==0 or check_suji==0 or check_dan==9 or check_suji==9:
                    self.turn_over_stone_array.clear()
                    break#盤外であれば抜ける
                #盤内であれば
                if self.game_recode[check_masu]=='None':
                    self.turn_over_stone_array.clear()
                    break#一マス先に石がなければ抜ける
                if self.turn_over_flg==False and self.game_recode[check_masu]==switch_array[0]:#[0]:自石
                    self.turn_over_stone_array.clear()
                    break#間にライバルの石がない＆一マス先が自石ならぬける
                if self.game_recode[check_masu]==switch_array[1]:#[1]:ライバルの石
                    self.turn_over_flg=True
                    self.turn_over_stone_array.append(check_masu)#反転対象の石が置かれているマスを配列に格納する
                    continue#マスの確認方向を一マス伸ばし処理を続ける
                if self.turn_over_flg==True and self.game_recode[check_masu]==switch_array[0]:#[0]:自石
                    # print('反転対象配列')
                    # print(self.turnOverStoneArray)
                    #配列をもとに反転させる
                    for i in self.turn_over_stone_array:
                        key_index=self.game_recode_keys.index(i)#配列の何番目に存在するか？
                        #石を反転させる
                        self.board.create_oval(self.stone_coordinate[key_index][0],self.stone_coordinate[key_index][1],
                                               self.stone_coordinate[key_index][2],self.stone_coordinate[key_index][3],fill=switch_array[0],tag="stone")
                        self.game_recode[i]=switch_array[0]#ゲーム記録も更新する
                    self.turn_over_flg=False#フラグをFalseに戻す
                    break#ループを抜ける
    
    def check_stone_num(self):
        """
        着手完了後に、石の数の確認をし,石の数のテキストを更新する。
        """
        self.black_num=0
        self.white_num=0
        temp=list(self.game_recode.values())#値の確認
        for stone in temp:
            if stone=='black':
               self.black_num+=1
            elif stone=='white':
               self.white_num+=1
        self.bw_text.set("黒："+str(self.black_num)+" 白："+str(self.white_num))                      

    def change_teban(self):
        """
        着手完了後に、手番の切り替える。
        手番テキストも更新する。
        """
        if self.teban=="黒":
           self.teban="白"
           self.rival_teban="黒" 
        elif self.teban=="白":
            self.teban="黒"
            self.rival_teban="白" 
        self.teban_text.set(self.teban+"の手番です")
    
    def win_lose_judgment(self):
        """
        着手完了後に、勝敗が着いているか調べる。
        勝敗が着いている場合は、手番テキストを更新し、終了フラグを立てる。
        """
        if self.black_num==0:#白の勝ち
            self.teban_text.set("白の勝ちです")
            self.end_flg=True
            return
        if self.white_num==0:#黒の勝ち
            self.teban_text.set("黒の勝ちです")
            self.end_flg=True
            return
        if 'None' in self.game_recode.values():
            print('石の置ける場所があります')
            return
        else:
            print('石の置ける場所がありません。勝敗判定をします。')
            print(self.black_num)
            print(self.white_num)    
            if self.black_num>self.white_num:#黒石＞白石
                self.teban_text.set("黒の勝ちです")
                print("黒の勝ちです")
            elif self.black_num<self.white_num:#黒石＜白石
                self.teban_text.set("白の勝ちです")
                print("白の勝ちです")
            elif self.black_num==self.white_num:#黒石＝白石
                self.teban_text.set("引き分けです")
            self.end_flg=True
            return

    def btn_gouhousyu(self):
        """
        合法手確認ボタンが押された時に、合法手を表示する。
        """
        self.gouhousyu_array.clear()#合法手配列のリセット
        self.set_gouhousyu_array()#合法手生成
        print(self.gouhousyu_array)#合法手
        if len(self.gouhousyu_array)!=0:
            tk.messagebox.showinfo('showinfo',self.gouhousyu_array)#合法手の表示
        elif len(self.gouhousyu_array)==0:
            tk.messagebox.showinfo('showinfo','合法手はありません。\nパスしてください。')
        self.gouhousyu_array.clear()#合法手配列のリセット

    #パスボタンイベント
    def btn_pass(self):
        self.gouhousyu_array.clear()#合法手配列のリセット
        self.set_gouhousyu_array()#合法手確認
        #合法手:len(self.gouhousyu_array)0なら合法手がないのでパス可能
        if len(self.gouhousyu_array)==0:
           self.change_teban()
        else:
            print('合法手があるためパスできません。')
            tk.messagebox.showwarning('showwarning','合法手があるためパスできません。')#タイトル,メッセージ内容
        self.gouhousyu_array.clear()#合法手配列のリセット
    
    #投了ボタンイベント
    def btn_touryou(self):
        self.teban_text.set(self.rival_teban+"の勝ちです")#「逆手番の勝ちです」の表示
        self.end_flg=True
        
    #最初に戻る
    def btn_back_start(self):
        self.board.delete("stone")#石の削除
        self.game_recode={'d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None','d1s8':'None',
                          'd2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None','d2s8':'None',
                          'd3s1':'None','d3s2':'None','d3s3':'None','d3s4':'None','d3s5':'None','d3s6':'None','d3s7':'None','d3s8':'None',
                          'd4s1':'None','d4s2':'None','d4s3':'None','d4s4':'white','d4s5':'black','d4s6':'None','d4s7':'None','d4s8':'None',
                          'd5s1':'None','d5s2':'None','d5s3':'None','d5s4':'black','d5s5':'white','d5s6':'None','d5s7':'None','d5s8':'None',
                          'd6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None','d6s8':'None',
                          'd7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None','d7s8':'None',
                          'd8s1':'None','d8s2':'None','d8s3':'None','d8s4':'None','d8s5':'None','d8s6':'None','d8s7':'None','d8s8':'None'
                          }
        self.board.create_oval(161,161,209,209,fill="white",tag="stone")            
        self.board.create_oval(211,161,259,209,fill="black",tag="stone")          
        self.board.create_oval(161,211,209,259,fill="black",tag="stone")
        self.board.create_oval(211,211,259,259,fill="white",tag="stone")
        self.end_flg=False#勝敗が着いているか？
        self.teban='黒'
        self.rival_teban='白'
        self.black_num=2
        self.white_num=2
        self.teban_text.set(self.teban+"の手番です")
        self.bw_text.set("黒："+str(self.black_num)+" 白："+str(self.white_num))
        self.gouhousyu_array.clear()#合法手配列のリセット
        self.turn_over_stone_array.clear()#反転対象配列のリセット
    
    #ウィンドウを閉じて終了する
    def close_window(self):
        self.destroy()#ウィンドウを閉じる
    
    #実行
    def run(self):
        self.mainloop()