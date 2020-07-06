//グローバル関数

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
			count:1,//何手目か？
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
			tumi:false,//詰んでいる？
			endMode:false,//false:対局モード中
			//選択後
			firstTouchMasuInOut:false,//最初にタッチしたマスは盤内か？
			currentMasuInout:false,//現在のマスは盤内か？
			firstChoice:true,//最初に駒を選択できる状態:true
			firstPromotion:false,//最初に選択した駒は成駒か？
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
	document.getElementById("teban").innerHTML=Game.teban;//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
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
	touchScreen(e.clientX,e.clientY);
}
//スマホ用タッチスタート
function touchstart(e){
	//もしタッチされたのが一箇所であるなら
	if(e.targetTouches.length==1){
		touch=e.targetTouches[0];
		touchScreen(touch.clientX,touch.clientY);
	}
}
//start()系終了---------------------------------------------------------------------------------------

//touchScreen()系開始----------------------------------------------------------------------------------
//タッチされた時のイベントの処理
function touchScreen(tx,ty){
	getCoordinate(tx,ty);//座標、盤内外の取得
	document.getElementById("test").innerHTML="タッチされました";
	
	if(Flg.currentMasuInout==true){
		console.log('test:'+Flg.currentMasuInout);//盤内
		console.log('現在のマス:'+Game.currentMasu);
		tyakusyu(Game.currentMasu);
	}else{
		console.log('test:'+Flg.currentMasuInout);//盤外
		return;
	}
	tyakusyuEnd();//手番&何手目の進行
}

//座標取得
function getCoordinate(tx,ty){
	//console.log("テスト")
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
	document.getElementById("cy").innerHTML=Page.cy;//y座標
	document.getElementById("cx").innerHTML=Page.cx;//x座標
	document.getElementById("cMasu").innerHTML=Game.currentMasu;//カレントのタッチマス
	Flg.currentMasuInout=inOut(Page.cys,Page.cxs);
	document.getElementById("inOut").innerHTML=Flg.currentMasuInout;//カレントのマスは盤内？盤外？
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
	if(	Game.teban=='黒'){
		targetStone=stone[0];
	}else if(Game.teban=='白'){
		targetStone=stone[1];
	}
	document.getElementById(setMasu).insertAdjacentHTML('afterbegin',targetStone);
}

//着手終了の処理
function tyakusyuEnd(){
	if(	Game.teban=='黒'){
		Game.teban='白';
	}else if(Game.teban=='白'){
		Game.teban='黒';
	}
	Game.count++;
	document.getElementById("teban").innerHTML=Game.teban;//手番の表示
	document.getElementById("gamecount").innerHTML=Game.count+"手目";//何手目の表示
	return;
}


