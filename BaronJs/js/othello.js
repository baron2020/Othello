//グローバル関数
//盤面情報
var gameRecode={'d1s1':'None','d1s2':'None','d1s3':'None','d1s4':'None','d1s5':'None','d1s6':'None','d1s7':'None','d1s8':'None',
				'd2s1':'None','d2s2':'None','d2s3':'None','d2s4':'None','d2s5':'None','d2s6':'None','d2s7':'None','d2s8':'None',
				'd3s1':'None','d3s2':'None','d3s3':'None','d3s4':'None','d3s5':'None','d3s6':'None','d3s7':'None','d3s8':'None',
				'd4s1':'None','d4s2':'None','d4s3':'None','d4s4':'white','d4s5':'black','d4s6':'None','d4s7':'None','d4s8':'None',
				'd5s1':'None','d5s2':'None','d5s3':'None','d5s4':'black','d5s5':'white','d5s6':'None','d5s7':'None','d5s8':'None',
				'd6s1':'None','d6s2':'None','d6s3':'None','d6s4':'None','d6s5':'None','d6s6':'None','d6s7':'None','d6s8':'None',
				'd7s1':'None','d7s2':'None','d7s3':'None','d7s4':'None','d7s5':'None','d7s6':'None','d7s7':'None','d7s8':'None',
				'd8s1':'None','d8s2':'None','d8s3':'None','d8s4':'None','d8s5':'None','d8s6':'None','d8s7':'None','d8s8':'None'
				}
//盤面情報のキー
var gameRecodeKeys=['d1s1','d1s2','d1s3','d1s4','d1s5','d1s6','d1s7','d1s8',
					'd2s1','d2s2','d2s3','d2s4','d2s5','d2s6','d2s7','d2s8',
					'd3s1','d3s2','d3s3','d3s4','d3s5','d3s6','d3s7','d3s8',
					'd4s1','d4s2','d4s3','d4s4','d4s5','d4s6','d4s7','d4s8',
					'd5s1','d5s2','d5s3','d5s4','d5s5','d5s6','d5s7','d5s8',
					'd6s1','d6s2','d6s3','d6s4','d6s5','d6s6','d6s7','d6s8',
					'd7s1','d7s2','d7s3','d7s4','d7s5','d7s6','d7s7','d7s8',
					'd8s1','d8s2','d8s3','d8s4','d8s5','d8s6','d8s7','d8s8'
					]
//石の配列(黒,白)
var stone=["<p class='stone' id='black'></p>","<p class='stone' id='white'></p>"]
//座標関連
var Page ={ cy:0,//現在のy
			cx:0,//現在のx
			cys:0,//現在の整数y
			cxs:0,//現在の整数x
			
			};
//ゲームの情報
var Game ={ teban:"黒",
			rivalTeban:"白",//逆の手番
			winner:"",
			count:1,//何手目か？
			blackNum:2,//黒石の数
			whiteNum:2,//白石の数
			currentPieceId:"",//現在の駒のId
			currentPieceName:"",//現在の駒(二文字)
			currentPieceClass:"",//現在の駒クラス
			currentMasu:"",//現在のマスのid
			firstTouchPieceId:"",//一度目にタッチした駒のid
			firstTouchPieceName:"",//一度目にタッチした駒(二文字)
			firstTouchMasu:""//一度目にタッチしたマスのid
			};
//フラグ
var Flg = { //強制終了フラグ
			gameEnd:false,//対局が終了しているか？
			endMode:false,//false:対局モード中
			//選択後
			firstTouchMasuInOut:false,//最初にタッチしたマスは盤内か？
			currentMasuInout:false,//現在のマスは盤内か？
			get:false,//駒をとっていない
			
			//棋譜用
			kihuFirstTouch:true//棋譜用に使うフラグ、最初にタッチできる時:true
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
	try{
		if(Flg.gameEnd==false){
			touchScreen(e.clientX,e.clientY);
		}else{
			throw new Error("throw new Error");
		}
	}
	catch(e){
		console.log("catch(e):ゲーム終了しています");
	}
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

//touchScreen()系開始----------------------------------------------------------------------------------
//タッチされた時のイベントの処理
function touchScreen(tx,ty){
	getCoordinate(tx,ty);//座標、盤内外の取得	
	if((Flg.currentMasuInout==true)&&(gameRecode[Game.currentMasu]=='None')){
		console.log('test:'+Flg.currentMasuInout);//盤内
		console.log('現在のマス:'+Game.currentMasu);
		console.log('js内の盤の石:'+gameRecode[Game.currentMasu]);//js内の石
		tyakusyu(Game.currentMasu);
	}else{
		console.log('test:'+Flg.currentMasuInout);//盤外
		console.log('js内の盤の石:'+gameRecode[Game.currentMasu]);//js内の石
		return;
	}
	changeTeban();//手番の切り替えに伴う処理
	winLoseJudgment();//決着が着いているか？
	
	if(Flg.gameEnd==true){
		endDisplay();
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
	Game.currentMasu="d"+Page.cys+"s"+Page.cxs;//カレントのタッチマス
	//Flg.currentMasuInout=InOut(Page.cys,Page.cxs);//カレントのマスは盤内？盤外？
	//y,x座標の表示
	//document.getElementById("cMasu").innerHTML=Game.currentMasu;//カレントのタッチマス
	Flg.currentMasuInout=inOut(Page.cys,Page.cxs);
	//document.getElementById("inOut").innerHTML=Flg.currentMasuInout;//カレントのマスは盤内？盤外？
}

//オセロ盤の中か？外か？
function inOut(targetY,targetX){
	if(((targetY>=1)&&(targetY<=8))&&((targetX>=1)&&(targetX<=8))){
		return true;
	}
	return false;
}

//着手したマスに石を置く
function tyakusyu(setMasu){
	if(Game.teban=='黒'){
		targetStone=stone[0];
		gameRecodeStone='black';
	}else if(Game.teban=='白'){
		targetStone=stone[1];
		gameRecodeStone='white';
	}
	document.getElementById(setMasu).insertAdjacentHTML('afterbegin',targetStone);
	gameRecode[Game.currentMasu]=gameRecodeStone;
	return;
}

//着手終了の処理
function changeTeban(){
	if(	Game.teban=='黒'){
		Game.teban='白';
		Game.rivalTeban='黒';
	}else if(Game.teban=='白'){
		Game.teban='黒';
		Game.rivalTeban='白';
	}
	Game.count++;
	document.getElementById("teban").innerHTML=Game.teban+"の手番です";//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	checkStoneNum();
	return;
}

//着手終了時の石の数の確認＆表示
function checkStoneNum(){
	//着手完了後に、石の数の確認をし,石の数のテキストを更新する。
	let tempBlackNum=0;
	let tempWhiteNum=0;
	for(let i=0;i<gameRecodeKeys.length;i++){
		if(gameRecode[gameRecodeKeys[i]]=='black'){
			tempBlackNum++;
		}
		if(gameRecode[gameRecodeKeys[i]]=='white'){
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
function winLoseJudgment(){
	//盤面に石の置ける場所がない。又は、石の数が0。であれば終了
	let tempNoneNum=0;
	let tempBlackNum=0;
	let tempWhiteNum=0;
	for(let i=0;i<gameRecodeKeys.length;i++){
		if(gameRecode[gameRecodeKeys[i]]=='None'){
			tempNoneNum++;
		}
		if(gameRecode[gameRecodeKeys[i]]=='black'){
			tempBlackNum++;
		}
		if(gameRecode[gameRecodeKeys[i]]=='white'){
			tempWhiteNum++;
		}
	}
	if((tempNoneNum==0)||(tempBlackNum==0)||(tempWhiteNum==0)){
		Flg.gameEnd=true;//決着フラグ
	}
	if(Flg.gameEnd==true){
		console.log("決着");
		if((tempBlackNum==0)||(tempBlackNum<tempWhiteNum)){
			Game.winner="白の勝ちです";
			return;
		}
		if((tempWhiteNum==0)||(tempBlackNum>tempWhiteNum)){
			Game.winner="黒の勝ちです";
			return;
		}
		if(tempBlackNum==tempWhiteNum){
			Game.winner="引き分けです";
			return;
		}
	}
}

//ゲーム終了時のディスプレイ処理
function endDisplay(){
	document.getElementById("teban").remove();
	document.getElementById("gamecount").remove();
	document.getElementById("endDisp").innerHTML="お疲れ様でした(*_ _)";
	document.getElementById("winner").innerHTML=Game.winner;//勝者の表示
}

//パスボタン
function inputPass(){
	changeTeban();
}

//投了ボタン
function inputResign(){
	Flg.gameEnd=true;
	Game.winner=Game.rivalTeban+"の勝ちです";
	endDisplay();
}

//continue:リロード
function inputContinue(){
	window.location.reload();
}

//コンソール削除
function inputLogDelete(){
	console.clear();
}
