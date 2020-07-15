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
var virtualGouhousyuArray=[];//仮想的に動かした後の合法手

//座標関連
var Page ={ cy:0,//現在のy
			cx:0,//現在のx
			cys:0,//現在の整数y
			cxs:0,//現在の整数x
			};

//ゲームの情報
var Game ={ teban:"黒(あなた)",
			rivalTeban:"白(バロン)",//逆の手番
			virtualTeban:"",//仮想的に動かす手番
			winner:"",
			count:1,//何手目か？
			blackNum:2,//黒石の数
			whiteNum:2,//白石の数
			currentMasu:""//現在のマスのid
			};

//フラグ
var Flg = { gameEnd:false,//対局が終了しているか？
			endMode:false,//false:対局モード中
			currentMasuInout:false,//現在のマスは盤内か？
			pass:false,//パスをするしかない状態か？
			renzokuPass:false,//連続パス判定に使用。
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
	document.getElementById("com").innerHTML="COM：バロン Ver5";//comのversion
	document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	document.getElementById("blackNum").innerHTML="黒石："+Game.blackNum;//黒石の数
	document.getElementById("whiteNum").innerHTML="白石："+Game.whiteNum;//白石の数
	inpPass="<input class='con'id='re1' type='button' value='パス'onClick='inputPass()'style='width:12%'>";
	inpResign="<input class='con'id=='de1' type='button' value='投了'onClick='inputResign()'style='width:12%'>";
	inpContinue="<input class='con'id='re1' type='button' value='最初に戻る'onClick='inputContinue()'style='width:24%'>";
	inpLogDelete="<input class='con'id=='de1' type='button' value='ログ削除'onClick='inputLogDelete()'style='width:20%'>";
	document.getElementById("consider").innerHTML='　'+inpPass+'　'+inpResign+'　'+inpContinue+'　'+inpLogDelete;
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
			touchScreen(e.clientX,e.clientY);
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
			//もしタッチされたのが一箇所であるなら
			if(e.targetTouches.length==1){
				touch=e.targetTouches[0];
				touchScreen(touch.clientX,touch.clientY);
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
	if((Flg.gameEnd==true)||(Flg.pass==true)||(Flg.renzokuPass==true)){
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
		changeTeban();//手番の切り替え
		tyakusyuEnd();//着手終了後の処理
		winLoseJudgment(0);//決着が着いているか？
		if(Flg.gameEnd==true){
			endDisplay();
		}
	}else{
		//盤内,合法手でなければリターン
		return;
	}
	checkPass();//パスの確認
	if(Flg.pass==true){
		//白(バロン)がパスをするしかない状態。
			inputPass();
		return;
	}
	if(Game.teban=='白(バロン)'){
		aiTyakusyu();
		checkPass();//パスの確認
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
	//重複の削除
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

//着手終了後の処理
function tyakusyuEnd(){
	Game.count++;
	document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	checkStoneNum();
	Flg.pass=false;//連続パスをしなかった。
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

//パスの確認
function checkPass(){
	if(Flg.gameEnd==false){
		setGouhousyuArray();//合法手の確認
		if(gouhousyuArray.length==0){
			if(Game.teban=='黒(あなた)'){
				setTimeout(function(){
					alert("黒(あなた)\n「合法手がありません。パスしてください。」");
					document.getElementById("passAdvice").innerHTML="パスしてください。";//パス進言
				},1100);
			}else if(Game.teban=='白(バロン)'){
				setTimeout(function(){
					alert("白(バロン)\n「合法手がありません。パスします。」");
					document.getElementById("passAdvice").innerHTML="パスしました。";//パス進言
				},1100);
			}
			Flg.pass=true;//パスをするしかない状態。
		}else{
			document.getElementById("passAdvice").innerHTML="";//パス進言の削除
			Flg.pass=false;//合法手がある。
		}
		gouhousyuArray.length=0;
	}
	return;
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

//パスボタン
function inputPass(){
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
	if(gouhousyuArray.length!=0){
		alert("黒(あなた)\n「合法手があります。パス出来ません。」");
		return;
	}
	changeTeban();
	Game.count--;
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	document.getElementById("passAdvice").innerHTML="";//パス進言の削除
	
	setGouhousyuArray();
	if(gouhousyuArray.length==0){
		if(Game.teban=='黒(あなた)'){
			//連続パスによりゲーム終了
			alert("黒(あなた)\n「合法手がありません。パスしてください。」");
			document.getElementById("passAdvice").innerHTML="パスしてください。";//パス進言の削除
			Flg.renzokuPass=true;//連続パス判定
			return;
		}else if(Game.teban=='白(バロン)'){
			//連続パスによりゲーム終了
			alert("白(バロン)\n「合法手がありません。パスします。」");
			alert("連続パスによりゲームを終了します。");
			//document.getElementById("passAdvice").innerHTML="連続パスによりゲームを終了します。";//連続パス
			winLoseJudgment(1);//連続パスでゲーム終了
			endDisplay();
			return;
		}
	}
}

//投了ボタン
function inputResign(){
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

//AI着手
function aiTyakusyu(){
	setTimeout(function(){
		//console.log("○秒後に着手");
		checkGouhousyu();//お互いの合法手の数の確認
		checkVirtualGouhousyu();
		turnOverStone(baronAiVer5());//引数を変えることでAIの強さ変更が可能
		resetArray();//評価配列のリセット
		changeTeban();//手番の切り替え
		tyakusyuEnd();//着手終了後の処理
		winLoseJudgment(0);//決着が着いているか？
		if(Flg.gameEnd==true){
			endDisplay();
		}
		return;
	},700);
}

//合法手の評価
var whiteGouhousyu=[];//白の合法手
var blackGouhousyu=[];//黒の合法手
var virtualWhiteGouhousyu=[];//先読みしたの白の合法手
var virtualBlackGouhousyu=[];//先読みしたの黒の合法手
var hyoukaArray=[];//この配列の中の値が大きいインデックスを選ぶ

//バロンVer5:大幅改良
function baronAiVer5(){
	let index=hyouka();
	console.log(whiteGouhousyu);
	console.log("候補手の添え字："+index);
	console.log(whiteGouhousyu[index]);

	let baronAi=whiteGouhousyu[index];//バロンの候補手
	console.log("バロンの候補手："+baronAi);
	return baronAi;
}

//配列のリセット
function resetArray(){
	whiteGouhousyu.length=0;
	blackGouhousyu.length=0;
	virtualWhiteGouhousyu.length=0;
	virtualBlackGouhousyu.length=0;
	hyoukaArray.length=0;
	console.log(whiteGouhousyu);
	console.log(blackGouhousyu);
	console.log(virtualWhiteGouhousyu);
	console.log(virtualBlackGouhousyu);
	console.log(virtualBlackGouhousyu);

}

//評価
function hyouka(){
	console.log("白前："+whiteGouhousyu);
	console.log("黒前"+blackGouhousyu);
	console.log("白後"+virtualWhiteGouhousyu);
	console.log("黒後"+virtualBlackGouhousyu);

	//①相手の合法手の数を考慮
	for(let i=0;i<virtualBlackGouhousyu.length;i++){
		//console.log(i+"："+virtualBlackGouhousyu[i].length);
		if(virtualBlackGouhousyu[i].length==0){
			//console.log(i+"です");
			return i;
		}
		if((virtualBlackGouhousyu[i].length==1)&&(checkX(virtualBlackGouhousyu[i]))){
			//console.log(i+"です");
			return i;
		}
	}
	
	let sumiArray=['d1s1','d1s8','d8s1','d8s8'];//検索対象の隅
	//②自分の合法手の中から隅の確認
	if(checkSumi(whiteGouhousyu)){
		console.log("684：合法手の中に隅があります。");
		for(let i=0;i<whiteGouhousyu.length;i++){
			if(sumiArray.indexOf(whiteGouhousyu[i])!=-1){
				console.log(i+"番目の添え字を返します。");
				return i;
			}
		}
	}
	//③それ以外であれば
	console.log("白前："+whiteGouhousyu.length);
	console.log("黒前："+blackGouhousyu.length);
	let XArray=['d2s2','d2s7','d7s2','d7s7'];//考慮対象のX

	for(let i=0;i<whiteGouhousyu.length;i++){
		console.log("白後"+i+" : "+virtualWhiteGouhousyu[i].length);
		console.log("黒後"+i+" : "+virtualBlackGouhousyu[i].length);
		let tempX;//Xを考慮
		if(XArray.indexOf(whiteGouhousyu[i])!=-1){
			tempX=-1000;//Xである
		}else{
			tempX=0;//Xでない
		}
		let tempLength1=virtualWhiteGouhousyu[i].length;
		let tempLength2=virtualBlackGouhousyu[i].length;
		//console.log(virtualWhiteGouhousyu[i]);
		let tempSumiKouryo=sumiWatasanai(virtualBlackGouhousyu[i]);
		let tempKouryoX=kouryoX(virtualWhiteGouhousyu[i]);
		let tempValue1=(tempLength1*10);
		let tempValue2=(tempLength2*(-10));
		let value=tempValue1+tempValue2+tempSumiKouryo+tempKouryoX+tempX;
		console.log("評価値："+value);
		hyoukaArray.push(value);
	}
	console.log("評価："+hyoukaArray);
	let maxValue=hyoukaArray.reduce((a,b)=>Math.max(a,b));//評価値から最大値を検索
	console.log("Max評価値:"+maxValue);
	let indexArray=[];//候補手のインデックスを格納する配列

	for(let i=0;i<hyoukaArray.length;i++){
		if(hyoukaArray[i]==maxValue){
			indexArray.push(i);
		}
	}
	console.log("候補手のインデックス："+indexArray);
	//indexArray配列をシャッフルする -->
	for(let i=indexArray.length-1;i>0;i--){
		let j=Math.floor(Math.random()*(i+1));
		let temp = indexArray[i];
		indexArray[i]=indexArray[j];
		indexArray[j]=temp;
	}
	console.log("候補手のインデックス："+indexArray[0]);
	return indexArray[0];
}

//指定の配列を受け取り、配列の中に隅が存在するか調べてtrue,falseを返す。
function checkSumi(targetArray){
	let sumiArray=['d1s1','d1s8','d8s1','d8s8'];//検索対象の隅
	for(let i=0;i<targetArray.length;i++){
		if(sumiArray.indexOf(targetArray[i])!=-1){
			return true;
		}
	}
	return false;
}

//指定の配列を受け取り、配列の中にXが存在するか調べてtrue,falseを返す。
function checkX(targetArray){
	let XArray=['d2s2','d2s7','d7s2','d7s7'];//検索対象のX
	for(let i=0;i<targetArray.length;i++){
		if(XArray.indexOf(targetArray[i])!=-1){
			return true;
		}
	}
	return false;
}

//指定の配列を受け取り、Xを削除した配列を返す
function deleteX(targetArray){
	let copyArray=Array.from(targetArray);//配列のコピー
	let returnArray=[];//返す配列
	let XArray=['d2s2','d2s7','d7s2','d7s7'];//削除対象のX
	for(let i=0;i<copyArray.length;i++){
		if(XArray.indexOf(copyArray[i])!=-1){
			continue;
		}
		returnArray.push(copyArray[i]);
	}
	return returnArray;//Xを削除した配列を返す
}

//自分のXを考慮する
function kouryoX(targetArray){
	let XArray=['d2s2','d2s7','d7s2','d7s7'];//考慮対象のX
	for(let i=0;i<targetArray.length;i++){
		if(XArray.indexOf(targetArray[i])!=-1){
			return -10;//存在する
		}
	}
	return 0;//存在しない
}

//相手に隅をとらせない：隅があれば-500を返す
function sumiWatasanai(targetArray){
	let sumiArray=['d1s1','d1s8','d8s1','d8s8'];//検索対象の隅
	for(let i=0;i<targetArray.length;i++){
		if(sumiArray.indexOf(targetArray[i])!=-1){
			return -1000;//存在する
		}
	}
	return 0;//存在しない
}

//着手前の合法手の数の確認
function checkGouhousyu(){
	setGouhousyuArray();//合法手の確認
	//console.log(Game.teban+"の合法手の数"+gouhousyuArray.length);
	whiteGouhousyu=Array.from(gouhousyuArray);//白の合法手
	console.log(Game.teban+"の合法手"+whiteGouhousyu);
	changeTeban();//手番の切り替え
	setGouhousyuArray();//合法手の確認
	//console.log(Game.teban+"の合法手の数"+gouhousyuArray.length);
	blackGouhousyu=Array.from(gouhousyuArray);//黒の合法手
	console.log(Game.teban+"の合法手"+blackGouhousyu);
	changeTeban();//手番の切り替え
}

//仮想的に進めた合法手の数の確認
function checkVirtualGouhousyu(){
	setGouhousyuArray();//合法手の確認
	//console.log(Game.teban+"の合法手の数"+gouhousyuArray.length);
	//console.log(Game.teban+"の合法手"+gouhousyuArray);
	for(let i=0;i<gouhousyuArray.length;i++){
		//console.log(gouhousyuArray[i]);	
		let virtualGameRecord=virtualMove(gouhousyuArray[i]);
	}
	console.log("白");
	console.log(virtualWhiteGouhousyu);
	console.log("黒");
	console.log(virtualBlackGouhousyu);
	//let abc=["a","b","d7s7","d","e","d2s2"];
	//console.log(deleteX(abc));
}

//局面から合法手を仮想的に動かす。
function virtualMove(startingPoint){
	let virtualGameRecord=Object.assign({},gameRecord);//ゲームレコードのコピー
	let switchArray,gameRecordStone,targetDan,targetSuji,checkDan,checkSuji,checkMasu,temp;
	let turnOverFlg=false;//反転動作確認に使用
	let turnOverStoneArray=[];
	let useBlackArray=['black','white'];//手番黒用
	let useWhiteArray=['white','black'];//手番白用
	if(Game.teban=='黒(あなた)'){
		switchArray=useBlackArray;
		gameRecordStone='black';
	}else if(Game.teban=='白(バロン)'){
		switchArray=useWhiteArray;
		gameRecordStone='white';
	}
	//着手したマスに石を置く。
	virtualGameRecord[startingPoint]=gameRecordStone;

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
			if(virtualGameRecord[checkMasu]=='None'){
				turnOverStoneArray.length=0;
				break;//一マス先に石がなければ抜ける
			}
			if((turnOverFlg==false)&&(virtualGameRecord[checkMasu]==switchArray[0])){
				//[0]:自石
				turnOverStoneArray.length=0;
				break;//間にライバルの石がない＆一マス先が自石ならぬける
			}
			if(virtualGameRecord[checkMasu]==switchArray[1]){
				//[1]:ライバルの石
				turnOverFlg=true;
				turnOverStoneArray.push(checkMasu);//反転対象の石が置かれているマスを配列に格納する
				continue;//マスの確認方向を一マス伸ばし処理を続ける
			}
			if((turnOverFlg==true)&&(virtualGameRecord[checkMasu]==switchArray[0])){
				//[0]:自石
				//配列をもとに反転させる
				for(let i=0;i<turnOverStoneArray.length;i++){
					virtualGameRecord[turnOverStoneArray[i]]=gameRecordStone;
				}
				turnOverFlg=false//フラグをFalseに戻す
				break//ループを抜ける
			}
		}
	}
	setVirtualGouhousyuArray(virtualGameRecord);
	console.log(Game.teban+"が"+startingPoint+"を仮想的に動かした後の合法手："+virtualGouhousyuArray);//一手仮想的に動かした後の合法手
	console.log(virtualGouhousyuArray);

	//console.log(virtualGameRecord);

	if(Game.teban=='黒(あなた)'){
		//先読みしたの黒の合法手
		let copy1=Array.from(virtualGouhousyuArray);//配列のコピー
		virtualBlackGouhousyu.push(copy1);
	}else if(Game.teban=='白(バロン)'){
		//先読みしたの白の合法手
		let copy2=Array.from(virtualGouhousyuArray);//配列のコピー
		virtualWhiteGouhousyu.push(copy2);
	}
	changeTeban();//手番の切り替え
	setVirtualGouhousyuArray(virtualGameRecord);
	console.log(Game.teban+"の合法手"+virtualGouhousyuArray);
	if(Game.teban=='黒(あなた)'){
		//先読みしたの黒の合法手
		let copy3=Array.from(virtualGouhousyuArray);//配列のコピー
		virtualBlackGouhousyu.push(copy3);
	}else if(Game.teban=='白(バロン)'){
		//先読みしたの白の合法手
		let copy4=Array.from(virtualGouhousyuArray);//配列のコピー
		virtualWhiteGouhousyu.push(copy4);
	}
	changeTeban();//手番の切り替え
	return virtualGameRecord;//一手仮想的に動かした後の局面
}

//指定局面から合法手を生成する。
function setVirtualGouhousyuArray(targetGameRecord){
	let tempArray=[];
	let tagetDan,tagetSuji,checkDan,checkSuji,checkMasu;
	let existRivalStoneFlg=false;//ライバルの石が間に存在するか？
	let useBlackArray=['black','white'];//手番黒用
	let useWhiteArray=['white','black'];//手番白用
	virtualGouhousyuArray.length=0;
	if(Game.teban=='黒(あなた)'){
		switchArray=useBlackArray;
	}else if(Game.teban=='白(バロン)'){
		switchArray=useWhiteArray;
	}
	for(let i=0;i<gameRecordKeys.length;i++){
		//gameRecordKeys[i]:合法手確認の対象のマス
		if(targetGameRecord[gameRecordKeys[i]]!='None'){
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
					if(targetGameRecord[checkMasu]=='None'){
						break;//一マス先に石がなければ抜ける
					}
					if((existRivalStoneFlg==false)&&(targetGameRecord[checkMasu]==switchArray[0])){
						//[0]:自石
						break;//#間にライバルの石がない＆一マス先が自石ならぬける
					}
					if(targetGameRecord[checkMasu]==switchArray[1]){
						//[1]:ライバルの石
						existRivalStoneFlg=true;
						continue;//マスの確認方向を一マス伸ばし処理を続ける
					}
					if((existRivalStoneFlg==true)&&(targetGameRecord[checkMasu]==switchArray[0])){
						//[0]:自石
						tempArray.push(gameRecordKeys[i]);//合法手を配列に格納
						existRivalStoneFlg=false;//フラグをFalseに戻す
						break;//ループを抜ける
					}
				}
			}
		}
	}
	//配列から重複した値を削除する
	virtualGouhousyuArray=tempArray.filter((x,i,self)=>self.indexOf(x)===i);
	//console.log(Game.teban+"の仮想局面");
	//console.log(targetGameRecord);
	//console.log("合法手は"+virtualGouhousyuArray);
}

