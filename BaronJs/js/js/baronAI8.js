//バロンVer8テスト用
//合法手の評価
var whiteGouhousyu=[];//白の合法手
var blackGouhousyu=[];//黒の合法手
var virtualGouhousyuArray=[];//一手仮想的に動かした後の合法手
var virtualWhiteGouhousyu=[];//先読みしたの白の合法手
var virtualBlackGouhousyu=[];//先読みしたの黒の合法手
var hyoukaArray=[];//この配列の中の値が大きいインデックスを選ぶ

loaded();//ロードされたら

function baronAIVer8(record){
	//console.log(record);
	checkGouhousyu();//お互いの合法手の数の確認
	checkVirtualGouhousyu();
	let index=hyouka();
	console.log(whiteGouhousyu);
	//console.log("候補手の添え字："+index);
	//console.log(whiteGouhousyu[index]);
	let baronAI=whiteGouhousyu[index];//バロンの候補手
	console.log("バロンの候補手："+baronAI);
	return baronAI;
}

//着手前の合法手の数の確認
function checkGouhousyu(){
	setGouhousyuArray();//合法手の確認
	whiteGouhousyu=Array.from(gouhousyuArray);//白の合法手
	console.log("白の合法手数"+whiteGouhousyu.length);
	changeTeban();//手番の切り替え
	setGouhousyuArray();//合法手の確認
	blackGouhousyu=Array.from(gouhousyuArray);//黒の合法手
	console.log("黒の合法手数"+blackGouhousyu.length);
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
	//console.log("白");
	//console.log(virtualWhiteGouhousyu);
	//console.log("黒");
	//console.log(virtualBlackGouhousyu);
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
	//console.log(Game.teban+"が"+startingPoint+"を仮想的に動かした後の合法手："+virtualGouhousyuArray);//一手仮想的に動かした後の合法手
	//console.log(virtualGouhousyuArray);
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

//配列のリセット
function resetArray(){
	whiteGouhousyu.length=0;
	blackGouhousyu.length=0;
	virtualWhiteGouhousyu.length=0;
	virtualBlackGouhousyu.length=0;
	hyoukaArray.length=0;
	//console.log(whiteGouhousyu);
	//console.log(blackGouhousyu);
	//console.log(virtualWhiteGouhousyu);
	//console.log(virtualBlackGouhousyu);

}

//評価
function hyouka(){
	//console.log("白前："+whiteGouhousyu);
	//console.log("黒前"+blackGouhousyu);
	//console.log("白後"+virtualWhiteGouhousyu);
	//console.log("黒後"+virtualBlackGouhousyu);

	//①相手の合法手の数を考慮
	for(let i=0;i<virtualBlackGouhousyu.length;i++){
		//console.log(i+"："+virtualBlackGouhousyu[i].length);
		if(virtualBlackGouhousyu[i].length==0){
			return i;
		}
		if((virtualBlackGouhousyu[i].length==1)&&(checkX(virtualBlackGouhousyu[i]))){
			return i;
		}
	}
	
	//②自分の合法手の中から確定石の確認
	let tempArray=searchFinalStone();
	
	for(let i=0;i<whiteGouhousyu.length;i++){
		if(tempArray.indexOf(whiteGouhousyu[i])!=-1){
			console.log(i+"番目の添え字を返します。");
			return i;
		}
	}

	//③それ以外であれば
	console.log("白前："+whiteGouhousyu.length);
	console.log("黒前："+blackGouhousyu.length);
	let XArray=['d2s2','d2s7','d7s2','d7s7'];//考慮対象のX

	for(let i=0;i<whiteGouhousyu.length;i++){
		console.log("白後"+i+" : "+virtualWhiteGouhousyu[i].length);
		console.log("黒後"+i+" : "+virtualBlackGouhousyu[i].length);
		let valueX;//Xを考慮
		if(XArray.indexOf(whiteGouhousyu[i])!=-1){
			valueX=-1000;//Xである
		}else{
			valueX=0;//Xでない
		}
		
		let vw=deleteX(virtualWhiteGouhousyu[i]);//Xを削除した白の合法手
		let vb=deleteX(virtualBlackGouhousyu[i]);//Xを削除した黒の合法手
		let value1=(vw.length*15);//白の合法手の数を考慮
		let value2=(vb.length*(-20));//黒の合法手の数を考慮
		let value3=sumiWatasanai(virtualBlackGouhousyu[i]);//黒の隅を考慮
		
		let hyoukaValue=value1+value2+value3+valueX;
		//白,黒の着手前の合法手の数、着手後の合法手の数、着手後の黒の隅を考慮、白のXを考慮
		console.log("評価値："+hyoukaValue);
		hyoukaArray.push(hyoukaValue);
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
			continue;//存在する
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
}

//確定石--------------------------------------------------------------------------
//白の確定石を探すgameRecord
function searchFinalStone(){
	let sumiArray=['d1s1','d1s8','d8s1','d8s8'];//隅のマス
	//ループ順
	let useLoop=['d1s1','d1s8','d1s8','d8s8','d8s8','d8s1','d8s1','d1s1'];
	//検索順配列
	let searchArray=[['d1s1','d1s2','d1s3','d1s4','d1s5','d1s6','d1s7'],
					 ['d1s8','d1s7','d1s6','d1s5','d1s4','d1s3','d1s2'],
					 ['d1s8','d2s8','d3s8','d4s8','d5s8','d6s8','d7s8'],
					 ['d8s8','d7s8','d6s8','d5s8','d4s8','d3s8','d2s8'],
					 ['d8s8','d8s7','d8s6','d8s5','d8s4','d8s3','d8s2'],
					 ['d8s1','d8s2','d8s3','d8s4','d8s5','d8s6','d8s7'],
					 ['d8s1','d7s1','d6s1','d5s1','d4s1','d3s1','d2s1'],
					 ['d1s1','d2s1','d3s1','d4s1','d5s1','d6s1','d7s1']
					];
	//白の確定石を格納した配列
	let returnArray=[];

	//①隅を配列に格納する。
	for(let i=0;i<sumiArray.length;i++){
		if(gameRecord[sumiArray[i]]=='None'){
			returnArray.push(sumiArray[i]);
		}
	}
	
	//②辺の確定石を探す
	let count;
	let targetStone;
	let rivalStone;
	let targetNone;

	for(let y=0;y<useLoop.length;y++){
		count=0;
		targetStone=decisionStone1(gameRecord[useLoop[y]]);
		rivalStone=decisionStone2(gameRecord[useLoop[y]]);
		if(targetStone=="white"){
			for(let x=0;x<searchArray[y].length;x++){
				if(gameRecord[searchArray[y][x]]=='None'){
					targetNone=searchArray[y][x];
					break;
				}else{
					targetNone="空き無し";
				}
			}
			if(targetNone=="空き無し"){
				continue;
			}
			//console.log(targetNone);
			//console.log(targetStone);
			//console.log(rivalStone);

			for(let i=0;i<searchArray[y].length;i++){
				//console.log(i+":"+gameRecord[searchArray[y][i]]);
				if(gameRecord[searchArray[y][i]]==rivalStone){
					targetStone=changeStone(targetStone);
					rivalStone=changeStone(rivalStone);
					console.log("targetStone:"+targetStone);
					console.log("rivalStone:"+rivalStone);
					count++;
				}
				if(gameRecord[searchArray[y][i]]=='None'){
					if(count<2){
						returnArray.push(targetNone);
					}
					break;
				}
			}
			continue;
		}else if(targetStone=="black"){
			//隅が黒石の時
			continue;
		}
	}
	console.log("確定石になるマス:"+returnArray);
	return returnArray;
}

//石の決定１
function decisionStone1(target){
	if(target=="white"){
		return "white";
	}else if(target=="black"){
		return "black";
	}
}

//石の決定２
function decisionStone2(target){
	if(target=="white"){
		return "black";
	}else if(target=="black"){
		return "white";
	}
}

//石の変換
function changeStone(target){
	if(target=="white"){
		return "black";
	}else if(target=="black"){
		return "white";
	}
}

