//バロンの着手
function test(a,b,c){
	console.log(a);
	console.log(b);
	console.log(c);
}

//バロンVer4:1手先読み
function baronAIVer4(){
	let candidateEvaluation=[];//候補手の評価値を格納する配列
	let indexArray=[];//候補手のインデックスを格納する配列
	setGouhousyuArray();//合法手の確認
	//console.log(gouhousyuArray);
	
	for(let i=0;i<gouhousyuArray.length;i++){
		let virtualGameRecord=virtualMove(gouhousyuArray[i]);
		//console.log(virtualGameRecord);
		let evaluationValue=returnEvaluationValue(virtualGameRecord);
		//console.log("評価値"+evaluationValue);
		candidateEvaluation.push(evaluationValue);
	}
	
	let maxEvaluationValue=candidateEvaluation.reduce((a,b)=>Math.max(a,b));//評価値から最大値を検索
	//console.log("候補手を動かした後のMax評価値:"+maxEvaluationValue);
	
	for(let i=0;i<candidateEvaluation.length;i++){
		if(candidateEvaluation[i]==maxEvaluationValue){
			indexArray.push(i);
		}
	}
	//console.log("候補手のインデックス："+indexArray);
	//indexArray配列をシャッフルする -->
	for(let i=indexArray.length-1;i>0;i--){
		let j=Math.floor(Math.random()*(i+1));
		let temp = indexArray[i];
		indexArray[i]=indexArray[j];
		indexArray[j]=temp;
	}
	console.log("バロンの合法手："+gouhousyuArray);
	console.log("バロンの合法手の評価値："+candidateEvaluation);
	console.log("バロンの合法手の評価値の最大値："+maxEvaluationValue);
	let baronAI=gouhousyuArray[indexArray[0]];
	console.log("バロンの候補手："+baronAI);
	return baronAI;
}

//局面から合法手を仮想的に動かす。
function virtualMove(startingPoint){
	let virtualGameRecord=Object.assign({},gameRecord);//ゲームレコードのコピー
	//console.log(virtuaGameRecord);
	//console.log('着手'+startingPoint);
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
	//console.log('virtual');
	//console.log(virtualGameRecord);//一手仮想的に動かした後の局面
	return virtualGameRecord;//一手仮想的に動かした後の局面
}

//指定局面の評価値を返す。
function returnEvaluationValue(targetGameRecord){
	//評価点を格納した配列
	let evaluationArray=[[0,0,0,0,0,0,0,0,0],
						[0,250,-50,50,10,10,50,-50,250],
						[0,-50,-100,-10,-10,-10,-10,-100,-100],
						[0,50,-10,30,5,5,30,-10,50],
						[0,10,-10,5,5,5,5,-10,10],
						[0,10,-10,5,5,5,5,-10,10],
						[0,50,-10,30,5,5,30,-10,50],
						[0,-50,-100,-10,-10,-10,-10,-100,-100],
						[0,250,-50,50,10,10,50,-50,250],
						];
	let evaluationValue=0;//指定局面の評価値
	
	for(let i=0;i<gameRecordKeys.length;i++){
		if(targetGameRecord[gameRecordKeys[i]]=="black"){
			let indexY=Number(gameRecordKeys[i].substr(1,1));//二文字目の段の切り出し
			let indexX=Number(gameRecordKeys[i].substr(3,1));//四文字目の筋の切り出し
			//console.log("評価点は："+evaluationArray[indexY][indexX])
			evaluationValue-=evaluationArray[indexY][indexX];
		}
		if(targetGameRecord[gameRecordKeys[i]]=="white"){
			let indexY=Number(gameRecordKeys[i].substr(1,1));//二文字目の段の切り出し
			let indexX=Number(gameRecordKeys[i].substr(3,1));//四文字目の筋の切り出し
			evaluationValue+=evaluationArray[indexY][indexX];
		}
	}
	//console.log("バロンからみた指定局面の評価値"+evaluationValue);
	return evaluationValue;
}

loaded();//ロードされたら

