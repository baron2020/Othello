//グローバル関数
//盤面情報
var gameRecord={'d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None','d1s8':'None',
				'd2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None','d2s8':'None',
				'd3s1':'None','d3s2':'None','d3s3':'None','d3s4':'None','d3s5':'None','d3s6':'None','d3s7':'None','d3s8':'None',
				'd4s1':'None','d4s2':'None','d4s3':'None','d4s4':'white','d4s5':'black','d4s6':'None','d4s7':'None','d4s8':'None',
				'd5s1':'None','d5s2':'None','d5s3':'None','d5s4':'black','d5s5':'white','d5s6':'None','d5s7':'None','d5s8':'None',
				'd6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None','d6s8':'None',
				'd7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None','d7s8':'None',
				'd8s1':'None','d8s2':'None','d8s3':'None','d8s4':'None','d8s5':'None','d8s6':'None','d8s7':'None','d8s8':'None'
				};

//盤面情報のキー
var gameRecordKeys=['d1s1','d1s2','d1s3','d1s4','d1s5','d1s6','d1s7','d1s8',
					'd2s1','d2s2','d2s3','d2s4','d2s5','d2s6','d2s7','d2s8',
					'd3s1','d3s2','d3s3','d3s4','d3s5','d3s6','d3s7','d3s8',
					'd4s1','d4s2','d4s3','d4s4','d4s5','d4s6','d4s7','d4s8',
					'd5s1','d5s2','d5s3','d5s4','d5s5','d5s6','d5s7','d5s8',
					'd6s1','d6s2','d6s3','d6s4','d6s5','d6s6','d6s7','d6s8',
					'd7s1','d7s2','d7s3','d7s4','d7s5','d7s6','d7s7','d7s8',
					'd8s1','d8s2','d8s3','d8s4','d8s5','d8s6','d8s7','d8s8'
					];

//石の配列(黒,白)
var stone=["<p class='stone' id='black'></p>","<p class='stone' id='white'></p>"];

//8方向探索用配列
var allDirectionArray=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];//8方向(上,右上,右,右下,下,左下,左,左上)

//合法手を格納する配列
var gouhousyuArray=[];

//座標関連
var Page ={ cy:0,//現在のy
			cx:0,//現在のx
			cys:0,//現在の整数y
			cxs:0,//現在の整数x
			};

//ゲームの情報
var Game ={ teban:"黒(あなた)",
			rivalTeban:"白(バロン)",//逆の手番
			winner:"",
			count:1,//何手目か？
			blackNum:2,//黒石の数
			whiteNum:2,//白石の数
			currentMasu:""//現在のマスのid
			};

//フラグ
var Flg = { gameEnd:false,//対局が終了しているか？
			canBePlaced:true,//プレイヤーが石を置ける状態か？
			blackPass:false,//黒がパスするしかない状態か？
			renzokuPass:false,//連続パス判定に使用。
			endMode:false,//false:対局モード中
			currentMasuInout:false,//現在のマスは盤内か？
			};

//スタート
function start(){
	let supportTouch='ontouchend'in document;//タッチイベントがサポートされているか
	let EVENTNAME=supportTouch ? 'touchstart':'mousedown';//タッチイベントかマウスダウンイベントか
	userCheck();
	startDisplay();
	mainAria();
	cssAdjust("d4s4");//全てのボードの横幅,高さをを同じにする
	setUp();
	//イベント分岐
	if(EVENTNAME=='touchstart'){
		document.addEventListener("touchstart",touchstart);
	}else{
		document.addEventListener("mousedown",mousedown);
	}
}

//ユーザーチェック
function userCheck(){
	let userB=window.navigator.appName;//ユーザーブラウザ
	let wnu=window.navigator.userAgent;//ユーザーエージェント
	let userOs;//ユーザーos
	let userW=document.documentElement.clientWidth;//window.innerWidth;//ウィンドウの横幅
	let userH=document.documentElement.clientHeight;//window.innerHeight;//ウィンドウの高さ
	if(wnu.indexOf('iPhone')!=-1){
		userOs="iPhone";
	}else if(wnu.indexOf('iPod')!=-1){
		userOs="iPod";
	}else if(wnu.indexOf('Android')!=-1){
		userOs="Android";
	}else if(wnu.indexOf('Windows')!=-1){
		userOs="Windows";
	}else{
		userOs="わかりません";
	}
	document.getElementById("useros").innerHTML="OS："+userOs;//userのosを表示
	document.getElementById("userw").innerHTML="横幅："+userW;//userの横幅を表示
	document.getElementById("userh").innerHTML="高さ："+userH;//userの高さを表示
}

//開始時の表示
function startDisplay(){
	document.getElementById("com").innerHTML="COM：バロン Ver7.0726.00";//comのversion
	document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	document.getElementById("blackNum").innerHTML="黒石："+Game.blackNum;//黒石の数
	document.getElementById("whiteNum").innerHTML="白石："+Game.whiteNum;//白石の数
	inpPass="<input class='con'id='re1' type='button' value='パス'onClick='passButton()'style='width:12%'>";
	inpResign="<input class='con'id=='de1' type='button' value='投了'onClick='resignButton()'style='width:12%'>";
	inpContinue="<input class='con'id='re1' type='button' value='最初に戻る'onClick='inputContinue()'style='width:24%'>";
	//inpLogDelete="<input class='con'id=='de1' type='button' value='ログ削除'onClick='inputLogDelete()'style='width:20%'>";
	document.getElementById("consider").innerHTML='　'+inpPass+'　'+inpResign+'　'+inpContinue;
}

//中央メイン盤の作成
function mainAria(){
	let mainDisplay="<table id='board' border='0'align='center'>";//メイン表示用
	let mainDisplayTop="<table border='0'align='center'>";//上用
	let mainDisplayBottom="<table border='0'align='center'>";//下用
	//main
	for(let y=1;y<9;y++){
		for(let x=1;x<9;x++){
			if(x==1){
				mainDisplay+="<tr>";
			}
			mainDisplay+="<td class='ban'id='d"+y+"s"+x+"'></td>";
			if(x==8){
				mainDisplay+="</tr>";
			}
			if((y==8)&&(x==8)){
				mainDisplay+="</table>";
				break;
			}
		}
	}
	//top
	for(let i=1;i<9;i++){
		if(i==1){
			mainDisplayTop+="<tr>";
		}
		mainDisplayTop+="<td class='topEdge'id='d0s"+i+"'></td>";
		if(i==8){
			mainDisplayTop+="</tr></table>";
			break;
		}
	}
	//bottom
	for(let i=1;i<9;i++){
		if(i==1){
			mainDisplayBottom+="<tr>";
		}
		mainDisplayBottom+="<td class='bottomEdge'id='d10s"+i+"'></td>";
		if(i==8){
			mainDisplayBottom+="</tr></table>";
			break;
		}
	}
	document.getElementById("mainDispTop").innerHTML=mainDisplayTop;
	document.getElementById("mainDisp").innerHTML=mainDisplay;
	document.getElementById("mainDispBottom").innerHTML=mainDisplayBottom;
}

//cssの調整
function cssAdjust(targetId){
	let targetElement=document.getElementById(targetId);
	let targetRect=targetElement.getBoundingClientRect();
	let targetClass=targetElement.className;//クラス名
	//console.log("横幅"+targetRect.width);	
	//console.log("クラス名"+targetClass);
	let HW=Math.floor(targetRect.width);//対象の横幅
	let tagetElements=document.getElementsByClassName(targetClass);
	//console.log(HW);
	//console.log(tagetElements);
	for(let i=0;i<tagetElements.length;i++){
		tagetElements[i].style.width=HW+"px";//ボードの横幅を同じにする
		tagetElements[i].style.height=HW+"px";//ボードの高さを横幅と同じにする
	}
	document.getElementById("mainDispTop").style.height=HW/2+"px";//ボードトップの高さを調整する
	document.getElementById("mainDispBottom").style.height=HW/2+"px";//ボードボトムの高さを調整する
}

//石の初期配置
function setUp(){
	document.getElementById("d4s4").insertAdjacentHTML('afterbegin',stone[1]);
	document.getElementById("d4s5").insertAdjacentHTML('afterbegin',stone[0]);
	document.getElementById("d5s4").insertAdjacentHTML('afterbegin',stone[0]);
	document.getElementById("d5s5").insertAdjacentHTML('afterbegin',stone[1]);
}

//パソコン用マウスダウン
function mousedown(e){
	//try{
		if(Flg.gameEnd==false){
			if(Flg.canBePlaced==true){
				touchScreen(e.clientX,e.clientY);
			}
		}else{
			throw new Error("throw new Error");
		}
	//}
	//catch(e){
		//console.log("catch(e):ゲーム終了しています");
	//}
}
//スマホ用タッチスタート
function touchstart(e){
	try{
		if(Flg.gameEnd==false){
			if(Flg.canBePlaced==true){
				//もしタッチされたのが一箇所であるなら
				if(e.targetTouches.length==1){
					touch=e.targetTouches[0];
					touchScreen(touch.clientX,touch.clientY);
				}
			}
		}else{
		
			throw new Error("throw new Error");
		}
	}
	catch(e){
		console.log("catch(e):ゲーム終了しています");
	}
}

//start()系終了---------------------------------------------------------------------------------------

//touchScreen()系開始---------------------------------------------------------------------------------
//タッチされた時のイベントの処理
function touchScreen(tx,ty){
	if((Flg.gameEnd==true)||(Flg.blackPass==true)){
		//ゲーム終了。又は、パスをするしかない状態。
		return;
	}
	setGouhousyuArray();//合法手の確認
	getCoordinate(tx,ty);//座標,盤内外の取得
	//console.log('盤内？:'+Flg.currentMasuInout);
	//console.log('現在のマス:'+Game.currentMasu);
	//console.log('js内の盤の石:'+gameRecord[Game.currentMasu]);
	//タッチした箇所が盤内＆石のない箇所＆合法手
	if((Flg.currentMasuInout==true)&&(gameRecord[Game.currentMasu]=='None')&&(gouhousyuArray.indexOf(Game.currentMasu)!=-1)){
		turnOverStone(Game.currentMasu);
		Flg.canBePlaced=false;//プレイヤーが石を置けない状態にする。
		changeTeban();//手番の切り替え
		tyakusyuEnd();//着手終了後の処理
		winLoseJudgment(0);//決着が着いているか？
		if(Flg.gameEnd==true){
			endDisplay();
			return;
		}else{
			//console.log("254:"+Game.teban);
			setGouhousyuArray();//白(バロン)の合法手の確認
			//テスト用：gouhousyuArray.length=0;
			if((gouhousyuArray.length==0)){
				//白のパス。
				setTimeout(function(){	
					commitPass(1);//白のパスの確認
					return;
				},1000);
			}else{
				document.getElementById("passAdvice").innerHTML="";//パス進言の削除
				Flg.blackPass=false;
				Flg.renzokuPass=false;//合法手がある。
				
				//AIファイルの読みこみからAI着手
				readBaronAI("js/baronAI7.js");
				tyakusyuBaronAI();//baronAIの着手
				return;
			}
		}
	}else{
		//盤内,合法手でなければリターン
		return;
	}
}

//座標取得
function getCoordinate(tx,ty){
	let d1s1Element=document.getElementById("d1s1");
	let d1s1rect=d1s1Element.getBoundingClientRect();
	//console.log("d1s1までの横"+Math.round(d1s1rect.left));//四捨五入
	//console.log("d1s1までの高さ"+Math.round(d1s1rect.top));
	//console.log("d1s1の幅"+d1s1rect.width);
	//console.log("d1s1の高さ"+d1s1rect.height);
	let banX=Math.round(d1s1rect.left);//将棋盤(d1s1)までの横幅(距離)
	let banY=Math.round(d1s1rect.top);//将棋盤(d1s1)までの高さ(距離)
	//console.log(banX);
	//console.log(banY);
	Page.cx=Math.floor(tx);
	Page.cy=Math.floor(ty);
	//console.log(Page.cx);
	//console.log(Page.cy);
	Page.cxs=Math.floor(((tx-banX)/d1s1rect.width)+1);
	Page.cys=Math.floor(((ty-banY)/d1s1rect.height)+1);
	Game.currentMasu="d"+Page.cys+"s"+Page.cxs;//タッチしたマス
	//y,x座標の表示
	//document.getElementById("cMasu").innerHTML=Game.currentMasu;//カレントのタッチマス
	Flg.currentMasuInout=inOut(Page.cys,Page.cxs);//カレントのマスは盤内？盤外？
	//document.getElementById("inOut").innerHTML=Flg.currentMasuInout;//カレントのマスは盤内？盤外？
}

//着手＆石の反転させる。
function turnOverStone(startingPoint){
//console.log('着手'+startingPoint);
	let tagetDan,tagetSuji,checkDan,checkSuji,checkMasu,temp;
	let turnOverFlg=false;//反転動作確認に使用
	let turnOverStoneArray=[];
	let useBlackArray=['black','white'];//手番黒用
	let useWhiteArray=['white','black'];//手番白用
	if(Game.teban=='黒(あなた)'){
		switchArray=useBlackArray;
		targetStone=stone[0];
		gameRecordStone='black';
	}else if(Game.teban=='白(バロン)'){
		switchArray=useWhiteArray;
		targetStone=stone[1];
		gameRecordStone='white';
	}
	//着手したマスに石を置く。
	document.getElementById(startingPoint).insertAdjacentHTML('afterbegin',targetStone);
	gameRecord[startingPoint]=gameRecordStone;
	targetDan=Number(startingPoint.substr(1,1));//二文字目の段の切り出し
	targetSuji=Number(startingPoint.substr(3,1));//四文字目の筋の切り出し
	for(let j=0;j<allDirectionArray.length;j++){
		turnOverFlg=false;//反転動作確認に使用
		checkDan=targetDan;
		checkSuji=targetSuji;
		while(true){
			checkDan+=allDirectionArray[j][0];
			checkSuji+=allDirectionArray[j][1];
			checkMasu='d'+String(checkDan)+'s'+String(checkSuji);
			if((checkDan==0)||(checkSuji==0)||(checkDan==9)||(checkSuji==9)){
				turnOverStoneArray.length=0;
				break;//盤外であれば抜ける
			}
			//盤内であれば
			if(gameRecord[checkMasu]=='None'){
				turnOverStoneArray.length=0;
				break;//一マス先に石がなければ抜ける
			}
			if((turnOverFlg==false)&&(gameRecord[checkMasu]==switchArray[0])){
				//[0]:自石
				turnOverStoneArray.length=0;
				break;//間にライバルの石がない＆一マス先が自石ならぬける
			}
			if(gameRecord[checkMasu]==switchArray[1]){
				//[1]:ライバルの石
				turnOverFlg=true;
				turnOverStoneArray.push(checkMasu);//反転対象の石が置かれているマスを配列に格納する
				continue;//マスの確認方向を一マス伸ばし処理を続ける
			}
			if((turnOverFlg==true)&&(gameRecord[checkMasu]==switchArray[0])){
				//[0]:自石
				//console.log('反転対象配列');
				//console.log(turnOverStoneArray);
				//配列をもとに反転させる
				for(let i=0;i<turnOverStoneArray.length;i++){
					temp=document.getElementById(turnOverStoneArray[i]);
					temp.firstElementChild.remove();//石の削除
					document.getElementById(turnOverStoneArray[i]).insertAdjacentHTML('afterbegin',targetStone);//石の追加(反転)
					gameRecord[turnOverStoneArray[i]]=gameRecordStone;
				}
				turnOverFlg=false//フラグをFalseに戻す
				break//ループを抜ける
			}
		}
	}
	return;
}

//手番の合法手を生成する。
function setGouhousyuArray(){
	let tempGouhousyuArray=[];
	let tagetDan,tagetSuji,checkDan,checkSuji,checkMasu;
	let existRivalStoneFlg=false;//ライバルの石が間に存在するか？
	let useBlackArray=['black','white'];//手番黒用
	let useWhiteArray=['white','black'];//手番白用
	gouhousyuArray.length=0;
	if(Game.teban=='黒(あなた)'){
		switchArray=useBlackArray;
	}else if(Game.teban=='白(バロン)'){
		switchArray=useWhiteArray;
	}
	for(let i=0;i<gameRecordKeys.length;i++){
		//gameRecordKeys[i]:合法手確認の対象のマス
		if(gameRecord[gameRecordKeys[i]]!='None'){
			continue;//合法手確認の対象のマスに石があれば抜ける
		}
		targetDan=Number(gameRecordKeys[i].substr(1,1));//二文字目の段の切り出し
		targetSuji=Number(gameRecordKeys[i].substr(3,1));//四文字目の筋の切り出し
		for(let j=0;j<allDirectionArray.length;j++){
			existRivalStoneFlg=false;//ライバルの石が間に存在しないフラグをFalseにする
			checkDan=targetDan;
			checkSuji=targetSuji;
			while(true){
				checkDan+=allDirectionArray[j][0];
				checkSuji+=allDirectionArray[j][1];
				checkMasu='d'+String(checkDan)+'s'+String(checkSuji);
				if((checkDan==0)||(checkSuji==0)||(checkDan==9)||(checkSuji==9)){
					break;//盤外であれば抜ける
				}else{
					//盤内であれば
					if(gameRecord[checkMasu]=='None'){
						break;//一マス先に石がなければ抜ける
					}
					if((existRivalStoneFlg==false)&&(gameRecord[checkMasu]==switchArray[0])){
						//[0]:自石
						break;//#間にライバルの石がない＆一マス先が自石ならぬける
					}
					if(gameRecord[checkMasu]==switchArray[1]){
						//[1]:ライバルの石
						existRivalStoneFlg=true;
						continue;//マスの確認方向を一マス伸ばし処理を続ける
					}
					if((existRivalStoneFlg==true)&&(gameRecord[checkMasu]==switchArray[0])){
						//[0]:自石
						tempGouhousyuArray.push(gameRecordKeys[i]);//合法手を配列に格納
						existRivalStoneFlg=false;//フラグをFalseに戻す
						break;//ループを抜ける
					}
				}
			}
		}
	}
	//配列から重複した値を削除する
	gouhousyuArray=tempGouhousyuArray.filter((x,i,self)=>self.indexOf(x)===i);
	//console.log("合法手");
	//console.log(gouhousyuArray);
}

//手番の切り替え
function changeTeban(){
	if(Game.teban=='黒(あなた)'){
		Game.teban='白(バロン)';
		Game.rivalTeban='黒(あなた)';
	}else if(Game.teban=='白(バロン)'){
		Game.teban='黒(あなた)';
		Game.rivalTeban='白(バロン)';
	}
}

//着手終了後のディスプレイ処理
function tyakusyuEnd(){
	Game.count++;
	document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	checkStoneNum();
	//連続パスをしなかった。
	Flg.blackPass=false;
	Flg.renzokuPass=false;
}

//着手終了時の石の数の確認＆表示
function checkStoneNum(){
	//着手完了後に、石の数の確認をし,石の数のテキストを更新する。
	let tempBlackNum=0;
	let tempWhiteNum=0;
	for(let i=0;i<gameRecordKeys.length;i++){
		if(gameRecord[gameRecordKeys[i]]=='black'){
			tempBlackNum++;
		}
		if(gameRecord[gameRecordKeys[i]]=='white'){
			tempWhiteNum++;
		}
	}
	//console.log("黒石の数"+tempBlackNum)
	//console.log("白石の数"+tempWhiteNum)
	Game.blackNum=tempBlackNum;
	Game.whiteNum=tempWhiteNum;
	document.getElementById("blackNum").innerHTML="黒石："+Game.blackNum;//黒石の数
	document.getElementById("whiteNum").innerHTML="白石："+Game.whiteNum;//白石の数
}

//着手完了後に、勝敗が着いているか調べる。勝敗が着いている場合は、手番テキストを更新し、終了フラグを立てる。
function winLoseJudgment(passEnd){
	//passEnd==1:連続パスによる終了
	//盤面に石の置ける場所がない。又は、石の数が0。であれば終了
	let tempNoneNum=0;
	let tempBlackNum=0;
	let tempWhiteNum=0;
	for(let i=0;i<gameRecordKeys.length;i++){
		if(gameRecord[gameRecordKeys[i]]=='None'){
			tempNoneNum++;
		}
		if(gameRecord[gameRecordKeys[i]]=='black'){
			tempBlackNum++;
		}
		if(gameRecord[gameRecordKeys[i]]=='white'){
			tempWhiteNum++;
		}
	}
	if((passEnd==1)||(tempNoneNum==0)||(tempBlackNum==0)||(tempWhiteNum==0)){
		Flg.gameEnd=true;//決着フラグ
	}
	if(Flg.gameEnd==true){
		console.log("決着");
		if((tempWhiteNum==0)||(tempBlackNum>tempWhiteNum)){
			Game.winner="黒(あなた)の勝ちです";
			return;
		}
		if((tempBlackNum==0)||(tempBlackNum<tempWhiteNum)){
			Game.winner="白(バロン)の勝ちです";
			return;
		}
		if(tempBlackNum==tempWhiteNum){
			Game.winner="引き分けです";
			return;
		}
	}
}

//オセロ盤の中か？外か？
function inOut(targetY,targetX){
	if(((targetY>=1)&&(targetY<=8))&&((targetX>=1)&&(targetX<=8))){
		return true;
	}
	return false;
}

//ゲーム終了時のディスプレイ処理
function endDisplay(){
	document.getElementById("teban").remove();
	document.getElementById("gamecount").remove();
	document.getElementById("endDisp").innerHTML="お疲れ様でした(*_ _)";
	document.getElementById("winner").innerHTML=Game.winner;//勝者の表示
	document.getElementById("passAdvice").innerHTML="";//パス進言の削除
}


//パスをまとめた処理
function commitPass(type){
	//type0:黒,type1:白
	//blackPass:false,//黒がパスするしかない状態か？
	if(type==0){
			alert("黒(あなた)\n「合法手がありません。パスしてください。」");
			document.getElementById("passAdvice").innerHTML="パスしてください。";//パス進言
			Flg.blackPass=true;//黒がパスをするしかない状態。
	}else if(type==1){
			alert("白(バロン)\n「合法手がありません。パスします。」");
			document.getElementById("passAdvice").innerHTML="パスしました。";//パス進言
			changeTeban();
			document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
			document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
			Flg.blackPass=false;//黒が置ける準備。
			Flg.canBePlaced=true;//プレイヤーが石を置ける状態。
			checkRenzokuPass(0);
			return;
	}
}

//連続パス確認
function checkRenzokuPass(type){
	//type0:黒,type1:白
	setGouhousyuArray();
	//テスト用：gouhousyuArray.length=0;
	if(gouhousyuArray.length==0){
		//連続パス判定によりゲームを終了
		if(type==0){
			alert("黒(あなた)\n「合法手がありません。パスしてください。」");
			document.getElementById("passAdvice").innerHTML="パスしてください。";//パス進言の削除
			Flg.blackPass=true;//黒に合法手がない。
			Flg.renzokuPass=true;//連続パス判定
			Flg.canBePlaced=false;//プレイヤーが石を置けない状態にする。
		}else if(type==1){
			alert("白(バロン)\n「合法手がありません。パスします。」");
			alert("連続パスによりゲームを終了します。");
			//document.getElementById("passAdvice").innerHTML="連続パスによりゲームを終了します。";//連続パス
			winLoseJudgment(1);//連続パスでゲーム終了
			endDisplay();
		}
	}else{
		Flg.renzokuPass=false;//合法手がある。
	}
	return;
}

//パスボタン
function passButton(){
	if(Flg.gameEnd==true){
		return;
	}
	if(Flg.renzokuPass==true){
		//連続パス判定よりゲームを終了
		alert("連続パスによりゲームを終了します。");
		winLoseJudgment(1);//連続パスでゲーム終了
		endDisplay();
		return;
	}
	setGouhousyuArray();
	//テスト用：gouhousyuArray.length=0;
	if(gouhousyuArray.length!=0){
		alert("黒(あなた)\n「合法手があります。パス出来ません。」");
		return;
	}else{
		changeTeban();
		document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
		document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
		checkRenzokuPass(1);//連続パス確認
		if(Flg.gameEnd==true){
			console.log("連続パスにより終了します");
			return;
		}else{
			//白の着手
			document.getElementById("passAdvice").innerHTML="";//パス進言の削除
			Flg.canBePlaced=false;//プレイヤーが石を置けない状態にする。
			Flg.renzokuPass=false;//合法手がある。
			//AIファイルの読みこみからAI着手
			readBaronAI("js/baronAI7.js");
			tyakusyuBaronAI();//baronAIの着手
			return;
		}
	}
}

//投了ボタン
function resignButton(){
	if(Flg.gameEnd==true){
		return;
	}
	let res;
	res=confirm("黒(あなた)\n「投了しますか？」");
	if(res==true){
		Flg.gameEnd=true;
		Game.winner=Game.rivalTeban+"の勝ちです";
		endDisplay();
	}else{
		return;
	}
}

//continue:リロード
function inputContinue(){
	window.location.reload();
}

//コンソール削除
function inputLogDelete(){
	console.clear();
}

//バロンAI関連---------------------------------------------------------------------------------------
var baronAI={'choice':''};

//"js/baronAI.js":AIファイル読み込み
function readBaronAI(url){
	let TagScript=document.getElementsByTagName("script");//スクリプトタグ
	let script=document.createElement('script');
	script.type='text/javascript';
	script.src=url;
	//let head=document.getElementsByTagName("head");
	//document.head.appendChild(script);
	//document.head.removeChild(script);
	if(!TagScript[1]){
		document.head.appendChild(script);
	}
	//console.log(TagScript[0]);
	//console.log(TagScript[1]);
}

//"js/baronAi.js"がロードされたら実行される。
function loaded(){
	let copyGameRecord=Object.assign({},gameRecord);//ゲームレコードのコピー
	//let copyTeban=Game.teban;//手番のコピー
	//let copyGouhousyu//合法手のコピー
	baronAI.choice=baronAIVer7(copyGameRecord);
	console.log("バロンAI："+baronAI.choice);
}

//バロンAIの着手。
function tyakusyuBaronAI(){
	let count=0;
	//空白＆nullチェック
	let waitBaronAI=function(){
					if(!baronAI.choice){
						//バロンの着手が返ってきていない(baronAIが空白＆nullである)
						console.log("待機しています。");
						console.log(count);
						count++;
					}
				}
	let id =setInterval(function(){
							waitBaronAI();
							if((baronAI.choice)||(count>25)){
								clearInterval(id);
								if(count>25){
									console.log("不具合が発生しました。終了します。");
									baguEndDisplay();
									Flg.gameEnd=true;
									return;
								}
								console.log("バロンの着手を受け取りました。");
								setTimeout(function(){
									turnOverStone(baronAI.choice);//引数を変えることでAIの強さ変更が可能
									let TagScript=document.getElementsByTagName("script");//スクリプトタグの消去
									if(TagScript[1]){
										TagScript[1].remove();
									}
									changeTeban();//手番の切り替え
									tyakusyuEnd();//着手終了後の処理
									winLoseJudgment(0);//決着が着いているか？
									if(Flg.gameEnd==true){
										endDisplay();
										return;
									}else{
										setGouhousyuArray();//黒の合法手の確認
										//テスト：gouhousyuArray.length=0;
										//if(Game.count>8){
										//	gouhousyuArray.length=0;
										//}
										if((gouhousyuArray.length==0)){
											//黒のパス。
											setTimeout(function(){
												commitPass(0);//黒のパス
												return;
											},1000);
										}else{
											document.getElementById("passAdvice").innerHTML="";//パス進言の削除
											Flg.blackPass=false;
											Flg.renzokuPass=false;//合法手がある。
											Flg.canBePlaced=true;//プレイヤーが石を置ける状態にする。
											return;
										}
									}
								},700);
							}},200);
}

//不具合発生時のディスプレイ処理
function baguEndDisplay(){
	document.getElementById("teban").remove();
	document.getElementById("gamecount").remove();
	document.getElementById("winner").remove();//勝者表示の削除
	document.getElementById("whiteNum").remove();//削除
	document.getElementById("passAdvice").remove();//パス進言の削除
	document.getElementById("endDisp").innerHTML="不具合が発生しました、終了します。";
	document.getElementById("blackNum").innerHTML="申し訳ございませんm(_ _)m";
}
