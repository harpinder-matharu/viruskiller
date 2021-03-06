import { _decorator, Component, Node, Prefab, SpriteFrame, Enum, Sprite, tween, Vec3, math, instantiate, UITransform, size, assetManager, resources, director, Director, physics, PhysicsSystem, Intersection2D, v3, v2, Collider, Size, Vec2, Label, UI,Animation, AudioClip, AudioSource, AnimationClip, Button, color } from 'cc';
import {gameManager , IN_GAME_CURR_OP, SCENE_TYPE, SYRINGE_TYPE} from '../Common/gameManager';
const { ccclass, property } = _decorator;
import {VIRUS_TYPE, getLevelData,visurInfo,virus,getVirusPower,getVirusPoints,getVirusAnimationName,getVirusDestroyAnimationName} from '../Common/virusData';
import { SoundManager } from '../Common/SoundManager';

// <script src="https://game-connector.s3.ap-south-1.amazonaws.com/BlaashGameSDK.js"> </script>

@ccclass('GamePlay')
export class GamePlay extends Component {
    
    //touch points
    arrowTouchBeganPoint:any;
    canAccessArrow :Boolean = false;
    bonusLevel :Boolean = false;
    enableAPIs :Boolean = false;
    initialDataFetched :Boolean = false;
    coinMultiplyFactor:number=0;



    level:number = 1;
    levelCount:number = 1;
    maxLevel:number = 20;
    totalLevelPoints:number = 0;
    APIObject:any;
    
    RewardID:number = 0;
    RewardLevel:number = 0;
    RewardText:string = "0";

    injectionsLeft:number = 0;
    maxInjections:number = 3;
    miss:number = 0;
    virusesDistroyedInOneShot:number = 0;
    xDifference:number = 0;
    yDifference:number = 0;

    selectInjectionScript:any;

    levelData :any;
    virus:Node  = null!;
    fingerTap:Node  = null!;
    rewardBox:Node  = null!;

    virusArray : Array<virus> = new Array(); //container 
    arrow:Node =  null!;
    virusInfo : Array<visurInfo> = new Array();
    unUsedCoins : Array<Node> = new Array();

    arrowPrefab = new Prefab();

    @property(Label)    levelNum :Label = null!;
    @property(Label)    levelScore :Label = null!;
    @property(Label)    cuponDiscount :Label = null!;
    @property(Label)    message :Label = null!;

    @property(Node)     injectionCount :Node = null!;
    @property(Node)     selectInjection :Node = null!;
    @property(Node)     toggleInjections :Node = null!;
    @property(Node)     redBg :Node = null!;

    @property(Node)     bonusLevelBg :Node = null!;
    @property(Node)     bonusLevelHeading :Node = null!;
    @property(Node)     bonusLevelGreetings  :Node = null!;
    @property(Node)     replayButton  :Node = null!;
    @property(Node)     reviveButton  :Node = null!;
    @property(Node)     gameTouchRestriction  :Node = null!;

    @property(Sprite)    bg :Sprite = null!;
    @property(Sprite)    bonfire :Sprite = null!;
    @property(Sprite)    rotator :Sprite = null!;
    @property(Sprite)    gameOverLayer :Sprite = null!;
    @property(Sprite)    congratulationLayer :Sprite = null!;
    @property(Sprite)    rewardLayer :Sprite = null!;
    @property(Sprite)    confettieAnimation :Sprite = null!;
    @property(Sprite)    progressbar:Sprite = null!;

    @property(Prefab)    prefabAnimation:Prefab = null!;
    @property(Prefab)    prefabCoin :Prefab = null!;
    @property(Prefab)    virusPrefab :Prefab = null!;
    @property(Prefab)    dotPrefab :Prefab = null!;
    @property(Prefab)    giftBox :Prefab = null!;
    @property(Prefab)    finger :Prefab = null!;

    @property({type : Enum(VIRUS_TYPE)})
    virusFrameType   = [];
    @property(SpriteFrame)
    virusFramesFull = [];



    @property({type : Enum(SYRINGE_TYPE)})
    syringesType:Array<SYRINGE_TYPE> = [];
    @property(Prefab)    syringes = [];

    @property(AudioClip)    fire : AudioClip = null!;
    @property(AudioClip)    blast : AudioClip = null!;
    @property(AudioClip)    syringeFly : AudioClip = null!;

    start () {
        
        this.gameTouchRestriction.active=false;

        if(gameManager.getInstance().getToken()&& gameManager.getInstance().isWebBuild){
            this.enableAPIs = true;
        }
        if(!gameManager.getInstance().isWebBuild){
            this.admobInit();
        }

        if(this.enableAPIs&& gameManager.getInstance().isWebBuild){

            try {
                this.initBlaashGameSDK();
                this.onGameStart();
            } catch (error) {
                console.log("Token error");
                this.enableAPIs = false;
            }
        }
        SoundManager.getInstance().init(this.node.getComponent(AudioSource)!);
        this.gameOverLayer.node.active = false;
        this.confettieAnimation.node.active = false;
        this.rewardLayer.node.active = false;
        let touchRestriction:any = this.rewardLayer.node!.getChildByName("touchRestriction");
        touchRestriction.active = false;
        this.congratulationLayer.node.active = false;
        this.selectInjection.active =false;
        this.redBg.active = false

        this.selectInjectionScript = this.selectInjection.getComponent("ChooseInjection");
        this.selectInjectionScript!.setDelegate(this);
        
        this.touchEvents();
        this.setVirusInfo();
        this.startLevel(this.level);
        this.createCoins();
        // if(this.enableAPIs&& gameManager.getInstance().isWebBuild){
        //     this.onGameStart();
        // }

        this.bonfire.getComponent(Animation)?.play();
    }

    startLevel(levelNum:number){

        if(!gameManager.getInstance().isWebBuild){
            this.reviveButton.getComponent(Button)!.interactable = false;
            this.reviveButton.getComponent(Sprite)!.grayscale = true;
            this.cacheInterstitial();
        }

        this.updateRewardLevelProgressBar();
        if(gameManager.getInstance().getRewardDetails().RewardLevel == this.level){
            
            // this.setInjectionCount();
            this.updateUIForBonusLevel();
            this.showBonusLevelGreetings();
            if(Math.floor(Math.random() * 2)){
                this.bonusLevel = true;
            }
                
        }else{
            this.updateUIForSimpleLevel();
            this.showMessage("Kill Them All!");
        }

        this.miss = 0;
        this.coinMultiplyFactor = gameManager.getInstance().getSyringeType();
        
        this.arrowPrefab = this.syringes[this.syringesType.indexOf(this.coinMultiplyFactor)];
        
        if(this.maxLevel < levelNum){
            levelNum = Math.floor(Math.random() * 20) + 1;
        }
        this.level = levelNum;

        this.updateLevelData(this.level);
        this.updateLevelNum();
        this.setUpViruses();
        this.setUpInitialSyringe();
        this.rotateRotator();
        this.enableAllToggleInjections();
        
        // console.log("Bonus Level : ",this.bonusLevel);
        // if(this.bonusLevel){
        //     this.setInjectionCount();
        //     this.updateUIForBonusLevel();
        //     this.showBonusLevelGreetings();
        // }
        // else{
        //     this.updateUIForSimpleLevel();
        //     this.showMessage("Kill Them All!");
        // }

        this.schedule(this.checkCollision, 0.001);
    }

    updateUIForBonusLevel(){
        this.bonusLevelBg.active = true;    
        this.bonusLevelHeading.active = true;
        this.bonusLevelGreetings.active = true;
        this.replayButton.active = false;
    }

    showBonusLevelGreetings(){
        tween(this.bonusLevelGreetings)
        .call(()=>{
            this.bonusLevelGreetings.active = true;
        })
        .delay(1)
        .call(()=>{
            this.bonusLevelGreetings.active = false;
        })
        .start();
    }

    updateUIForSimpleLevel(){
        this.bonusLevelBg.active = false;    
        this.bonusLevelHeading.active = false;
        this.bonusLevelGreetings.active = false;
        this.replayButton.active = true;
    }

    startBonusLevel(){
        this.miss = 0;
        this.coinMultiplyFactor = gameManager.getInstance().getSyringeType();
        this.arrowPrefab = this.syringes[this.syringesType.indexOf(this.coinMultiplyFactor)];
        this.bonusLevel = true;   
        
        let random = Math.floor(Math.random() * 20) + 1;
        this.updateLevelData(random);
        this.updateLevelNum();
        
        this.setUpViruses();
        this.setUpInitialSyringe();
        this.rotateRotator();
        this.setInjectionCount();
        this.showMessage("Bonus Level!");
        this.schedule(this.checkCollision, 0.001);
    }
    updateRewardLevelProgressBar(){

        this.RewardLevel = gameManager.getInstance().getRewardDetails().RewardLevel;

        if(this.initialDataFetched){
            let percent = 1 - (this.RewardLevel - this.levelCount)/this.RewardLevel;

            console.log({percent});
            console.log("rewardLevel:",this.RewardLevel);
            console.log("levelCount:",this.levelCount);
            this.progressbar.fillRange = percent;
        }
    }

    updateSyringeType(error:boolean,msg:string,amount:number){
        
        if(!error){

            this.APIObject.onPurchase(this.levelCount,gameManager.getInstance().getCoins(),amount);
            this.levelScore.string = gameManager.getInstance().getCoins().toString();
            this.coinMultiplyFactor = gameManager.getInstance().getSyringeType();
            this.arrowPrefab = this.syringes[this.syringesType.indexOf(this.coinMultiplyFactor)];
            this.setUpInitialSyringe();

            // if(this.bonusLevel){
            //     this.injectionCount.removeAllChildren();
            //     this.setInjectionCount();
            // }
        }
        else{
            this.showMessage(msg);
        }
    }

    resetScene(){
        this.rotator.node.removeAllChildren();
        // this.injectionCount.removeAllChildren();
        this.arrow.removeFromParent();
    }

    updateLevelData(level:number){
        this.levelData = getLevelData(level);
    }
    setUpInitialSyringe(){

        if(this.arrow)
            this.arrow.removeFromParent();

        this.arrow = instantiate(this.arrowPrefab);
        let scale = this.bg.getComponent(UITransform)?.contentSize.height!  * 0.25/this.arrow.getComponent(UITransform)?.contentSize.height!;
        this.arrow.setScale(new Vec3(scale,scale,scale));
        this.arrow.position.y = this.bg.getComponent(UITransform)?.contentSize.height! * 0.35 *-1;
        this.arrow.position.x = 0;
        this.bg.node.addChild(this.arrow);

        tween(this.arrow)
        .repeatForever(
            tween()
            .by(0.5, { position: new Vec3(0, +50, 10) }, { easing: 'sineOut'})
            .by(0.5, { position: new Vec3(0, -50, 0) }, { easing: 'sineIn'})
        ).start();

        if(this.level == 1){
            this.fingerTap = instantiate(this.finger);
            this.arrow.addChild(this.fingerTap);
            this.fingerTap.getComponent(Animation)?.play("fingerTap");
        }
    }
    resetSyringePosition(){

        if(this.level == 1){
            this.fingerTap.active = true;
        }
        this.arrow.position.y = this.bg.getComponent(UITransform)?.contentSize.height! * 0.3 *-1;
        this.arrow.position.x = 0;
    }
    setVirusInfo(){
        
        for(let i=0;i<this.virusFramesFull.length;i++){
            this.virusInfo.push({ 
                type            : this.virusFrameType[i],
                spriteFrameFull     : this.virusFramesFull[i]
            });
        }
    }
    setUpViruses(){
        this.virusArray= [];
        this.virus = instantiate(this.virusPrefab); 

        //difference between viruses
        let numRowColumn = this.levelData.rowXCol;
        let diffBtwnViruses = this.rotator.getComponent(UITransform)?.contentSize.height!  / (numRowColumn+2);

        //size of virus
        let scale = this.rotator.getComponent(UITransform)?.contentSize.height!  * this.levelData.scale/this.virus.getComponent(UITransform)?.contentSize.height!;
        this.totalLevelPoints = 0;
        // this.progressbar.fillRange = 0;
        this.levelScore.string = gameManager.getInstance().getCoins().toString();


        let BonusVirusType:VIRUS_TYPE = VIRUS_TYPE.NONE;
        if(this.bonusLevel){
            let random = Math.floor(Math.random() * 3) + 1;
            switch(random){
                case 1: BonusVirusType = VIRUS_TYPE.TYPE11; break;
                case 2: BonusVirusType = VIRUS_TYPE.TYPE12; break;
                case 3: BonusVirusType = VIRUS_TYPE.TYPE13; break;
            }
        }
    

        this.levelData.virus.forEach((virus:any,index:number,arr:any) => {

            this.totalLevelPoints = this.totalLevelPoints + getVirusPoints(virus.type);
            this.virus = instantiate(this.virusPrefab); 
            let dot = instantiate(this.dotPrefab);
            tween(this.virus)
            .repeatForever(
                tween()
                .by(Math.floor(Math.random() * 1)+ 1, {  angle : 180})
                .by(Math.floor(Math.random() * 2)+ 1, {  angle : 180})
                .by(Math.floor(Math.random() * 1)+ 1, {  angle : 10})
                .by(Math.floor(Math.random() * 2)+ 1, {  angle : -180})
                .by(Math.floor(Math.random() * 1)+ 1, {  angle : -180})
            ).start();
            
            

            if(this.bonusLevel){

                this.virusArray.push({
                    type : BonusVirusType,
                    virus : this.virus,
                    power : getVirusPower(BonusVirusType)
                    });
                this.virus.getComponent(Sprite)!.spriteFrame = this.virusInfo.find(i => i.type === BonusVirusType)?.spriteFrameFull;
            }
            else{
                this.virusArray.push({
                    type : virus.type,
                    virus : this.virus,
                    power : getVirusPower(virus.type)
                    });
                this.virus.getComponent(Sprite)!.spriteFrame = this.virusInfo.find(i => i.type === virus.type)?.spriteFrameFull;
            }

            let virusPosition = new Vec3(diffBtwnViruses * this.getX(virus.index,numRowColumn), diffBtwnViruses * this.getY(virus.index,numRowColumn),0);

            this.virus.position = virusPosition;
            dot.position = virusPosition;
            this.rotator.node.addChild(dot);
            this.rotator.node.addChild(this.virus);

            if(this.bonusLevel){
                let virusBlastAnimation = instantiate(this.prefabAnimation);
                this.virus.addChild(virusBlastAnimation);
                virusBlastAnimation.getComponent(Animation)?.play(getVirusAnimationName(virus.type));
                virusBlastAnimation.setScale(new Vec3(scale*0.5,scale*0.5,0.5));
            }
            
            
            this.virus.setScale(new Vec3(scale,scale,1));
        });

        this.totalLevelPoints = this.totalLevelPoints * this.coinMultiplyFactor;
    }

    updateLevelNum(){

        // if(this.bonusLevel){
        //     this.levelNum.string = String("BONUS");
        // }
        // else{
            this.levelNum.string = String("LEVEL"+this.levelCount);
        // }
    }
    setInjectionCount(){
        let spareArrow = instantiate(this.arrowPrefab);
        let scale = this.rotator.getComponent(UITransform)?.contentSize.width!  * 0.06/spareArrow.getComponent(UITransform)?.contentSize.width!;

        spareArrow.setScale(new Vec3(scale,scale,scale));

        this.injectionsLeft = this.maxInjections;
        let width = spareArrow.getComponent(UITransform)?.contentSize.width! * this.injectionsLeft*scale;
        let height = spareArrow.getComponent(UITransform)?.contentSize.height!*scale;
        this.injectionCount.getComponent(UITransform)?.setContentSize(new Size(width,height)); 

        for(let i=1;i<this.injectionsLeft;i++){
            spareArrow = instantiate(this.arrowPrefab);
            spareArrow.getComponent(UITransform)!.setAnchorPoint(new Vec2(0,0));
            spareArrow.setScale(new Vec3(scale,scale,scale));
            spareArrow.position.y = 0;
            spareArrow.position.x = spareArrow.getComponent(UITransform)?.contentSize.width!*1 * (i-1)*scale;
            spareArrow.name =  String(i);
            this.injectionCount.addChild(spareArrow);
        }
    }

    rotateRotator(){
        tween(this.rotator.node)
        .repeatForever(
            tween()
            .by(Math.floor(Math.random() * 1)+ 2.5, {  angle : 360})
            .by(Math.floor(Math.random() * 2)+ 2.5, {  angle : 360})
            .by(Math.floor(Math.random() * 1)+ 2.5, {  angle : 10})
            .by(Math.floor(Math.random() * 2)+ 2.5, {  angle : -360})
            .by(Math.floor(Math.random() * 1)+ 2.5, {  angle : -360})
        )
        .start();
    }

    checkArrowIntersectWith(virus :any| Node){
        if(virus && this.arrow){
            return Intersection2D.rectRect(
                virus.getChildByName("collider").getComponent(UITransform)?.getBoundingBoxToWorld(),
                this.arrow.getChildByName("collider")!.getComponent(UITransform)?.getBoundingBoxToWorld()!
                );
        }
        else{
            return false;
        }
    }

    checkCollision(){
        if(this.virusArray.length>0){
            this.virusArray.forEach((virusData,index,aar) =>{
                if (this.checkArrowIntersectWith(virusData.virus)){
                    this.virusesDistroyedInOneShot++;
                    SoundManager.getInstance().playSoundEffect(this.blast);
                    this.breakAndBurnVirus(virusData);
                    virusData.virus.active = false;
                    aar.splice(index, 1);
                }
            });
        }
        else{
            this.unschedule(this.checkCollision);
            this.updateGameWinLayer();
            this.confettieAnimation.node.active = true;
            this.confettieAnimation.getComponent(Animation)?.play();


            if(gameManager.getInstance().getRewardDetails().RewardLevel == this.levelCount){
                if(Math.floor(Math.random() * 2) == 1){
                    this.rewardLayer.node.active = true;
                } 
                else{
                    this.congratulationLayer.node.active = true;
                }
            }
            else{
                this.showStarAnimation();
            }
        }
    }

    onNext(){

        // if(this.bonusLevel){

        //     this.bonusLevel = false;
        //     this.injectionCount.removeAllChildren();
        // }
        this.stopConfettie();
        this.gameOverLayer.node.active = false;
        this.resetScene();
        this.level++;
        this.levelCount++
        this.startLevel(this.level);
    }

    stopConfettie(){
        this.confettieAnimation.getComponent(Animation)?.stop();
        this.confettieAnimation.node.active = false;
    }

    updateGameWinLayer(){

        let totalCoins = gameManager.getInstance().getCoins();

        if(this.enableAPIs&& gameManager.getInstance().isWebBuild){
            this.onLevelComplete(this.levelCount,totalCoins);
        }
        

        let levelNumber:Label|any = this.gameOverLayer.node.getChildByName("level")?.getComponent(Label);
        levelNumber.string = String("LEVEL "+this.levelCount);

        let scoreValue:Label|any = this.gameOverLayer.node.getChildByName("scoreValue")?.getComponent(Label);
        scoreValue.string = totalCoins.toString();

        let reviveButton:Button|any = this.gameOverLayer.node.getChildByName("revive");
        reviveButton.active = false;

        let nextButton:Button|any = this.gameOverLayer.node.getChildByName("next");
        nextButton.active = true;

        this.gameOverLayer.node.active = true;

        // if(this.bonusLevel){

        // //     this.bonusLevel = false;
        //     this.injectionCount.removeAllChildren();
        // }
    }
    updateGameOverLayer(){
          
        if(this.enableAPIs&& gameManager.getInstance().isWebBuild){
            this.onGameOver(this.levelCount,gameManager.getInstance().getCoins());
        }
        
        

        tween(this.bg)
        .call(()=>{
            this.gameTouchRestriction.active=true;

            if(gameManager.getInstance().getRewardDetails().RewardLevel == this.level){
                this.showMessage("Keep Playing to Win Exciting Rewards!");
            }
            else{
                this.showMessage("Game Over!");
            }
            
        })
        .delay(1.4)
        .call(()=>{
            this.gameTouchRestriction.active=false;
            let levelNumber:Label|any = this.gameOverLayer.node.getChildByName("level")?.getComponent(Label);
            levelNumber.string = String("LEVEL "+this.levelCount);

            let scoreValue:Label|any = this.gameOverLayer.node.getChildByName("scoreValue")?.getComponent(Label);
            

            let reviveButton:Button|any = this.gameOverLayer.node.getChildByName("revive");
            let nextButton:Button|any = this.gameOverLayer.node.getChildByName("next");
            

            if(gameManager.getInstance().getRewardDetails().RewardLevel == this.level){
                reviveButton.active = false;
                nextButton.active = true;
                scoreValue.string = "";
            }
            else{
                reviveButton.active = true;
                nextButton.active = false;
                scoreValue.string = gameManager.getInstance().getCoins().toString();
            }

            

            this.gameOverLayer.node.active = true;

            this.dontShowStars();
        })
        .start();

        
    }

    dontShowStars(){
        let star1:Node|any = this.gameOverLayer.node.getChildByName("star1");
        let star2:Node|any = this.gameOverLayer.node.getChildByName("star2");
        let star3:Node|any = this.gameOverLayer.node.getChildByName("star3");

        star1.active = false;
        star2.active = false;
        star3.active = false;
    }

    showStarAnimation(){
        let star1:Node|any = this.gameOverLayer.node.getChildByName("star1");
        let star2:Node|any = this.gameOverLayer.node.getChildByName("star2");
        let star3:Node|any = this.gameOverLayer.node.getChildByName("star3");

        star1.active = false;
        star2.active = false;
        star3.active = false;

        let star:Node|any = star1;

        let repeatNum = 3 - this.miss;
        // if(this.bonusLevel){
        //     repeatNum = this.injectionsLeft + 1;
        // }
        
        let starCount = 1;

        if(repeatNum > 0){
            tween(this.bg)
            .call(()=>{
                if(starCount ==1){
                    star = star1;
                }
                else if(starCount ==2){
                    star = star2;
                }
                else if(starCount ==3){
                    star = star3;
                    
                }
                star.active = true;
                star.angle = 0;
                tween(star)
                .to(0,{scale : new Vec3(4,4,4)})
                .to(0.5,{angle : 360, scale : new Vec3(1,1,1)})
                .start();
                starCount++;
            })
            .delay(0.5)
            .union()
            .repeat(repeatNum)
            .start();
        }
        
    }
    breakAndBurnVirus(virusData:virus){
        let point:number = getVirusPoints(virusData.type!) * this.coinMultiplyFactor;

        let updatedScore = gameManager.getInstance().getCoins()+point

        gameManager.getInstance().setCoins(updatedScore);
        
        this.levelScore.string = updatedScore.toString();
        // this.progressbar.fillRange = this.progressbar.fillRange+ point/this.totalLevelPoints;

        let Position = this.rotator.getComponent(UITransform)?.convertToWorldSpaceAR(virusData.virus.position);
        Position = this.bg.getComponent(UITransform)?.convertToNodeSpaceAR(Position!);
        this.collectCoinsAnimation(point,Position);
        
        let virusBlastAnimation = instantiate(this.prefabAnimation);
        virusBlastAnimation.position.y = Position!.y;
        virusBlastAnimation.position.x = Position!.x;
        this.bg.node.addChild(virusBlastAnimation);
        
        virusBlastAnimation.getComponent(Animation)?.play(getVirusDestroyAnimationName(virusData.type!));
        // this.bonfire.getComponent(Animation)?.play();
        
        tween(virusBlastAnimation)
        .to(0.5,{position:this.bonfire.node.position})
        .call(()=>{
            SoundManager.getInstance().playSoundEffect(this.fire);
        })
        .delay(0)
        .call(()=>{
            virusBlastAnimation.removeFromParent();
        })
        .start();
    }

    getY(index:number,sizeN:number){
        let totalElements = sizeN*sizeN;
        let centerElement = Math.ceil(totalElements/2);
        let difference = centerElement - index;
        let upDown = 0;
        if(difference > 0){
            upDown = 1;
            difference += Math.floor(sizeN/2);
        }
        else if(difference < 0){
            upDown = -1;
            difference -= Math.floor(sizeN/2);
        }
        else{
            upDown = 0;
        }
        difference = Math.abs(difference);
        let lineNum = 0;
        if(sizeN>difference && difference >= Math.floor(sizeN/2)){
            lineNum = 1;//one Up,
        }
        if(Math.floor(sizeN/2) > difference){
            lineNum = 0;//on y Axix i.e zero up.
        }
        else{
            lineNum = Math.floor(difference/sizeN);
        }
        return lineNum*upDown;
    }

    getX(index:number,sizeN:number){
        let totalElements = sizeN*sizeN;
        let centerElement = Math.ceil(totalElements/2);
        let difference = centerElement - index;
        let up = false;
        if(index < centerElement){
            up = true;
        }
        difference = Math.abs(difference);
        let lineNum = 0;
        lineNum = Math.floor(difference%sizeN);
        if(up){
            if(lineNum > Math.floor(sizeN/2)){
                lineNum = sizeN - lineNum;
            }
            else{
                lineNum *= -1;
            }
        }
        else{
            if(lineNum > Math.floor(sizeN/2)){
                lineNum = sizeN - lineNum;
                lineNum *= -1;
            }
        }
        return lineNum;
    }
    touchEvents(){
        this.node.on(Node.EventType.TOUCH_START,this.itemTouchStartCallback,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.itemTouchMoveCallback,this);
        this.node.on(Node.EventType.TOUCH_END,this.itemTouchEndCallback,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.itemTouchEndCallback,this);
    }
    itemTouchStartCallback(event: { getUILocation: () => any; }){
        var eventLocation = event.getUILocation();

        let touchPointOnBg = this.bg!.getComponent(UITransform)?.convertToNodeSpaceAR(v3(eventLocation.x, eventLocation.y,0)); 

        if(this.arrow!.getComponent(UITransform)?.getBoundingBox().contains(v2(touchPointOnBg!.x, touchPointOnBg!.y))){
            // arrow touched  

            if(this.level == 1){
                this.fingerTap.active = false;
            }
            this.virusesDistroyedInOneShot = 0;  
            this.arrowTouchBeganPoint = eventLocation;
            this.canAccessArrow = true;
        }   
    }
    itemTouchMoveCallback(event: { getUILocation: () => any; }){
        var eventLocation = event.getUILocation();
        if (this.canAccessArrow)
        {
            // let touchPointOnBg = this.bg!.getComponent(UITransform)?.convertToNodeSpaceAR(v3(eventLocation.x, eventLocation.y,0));
            // this.xDifference = this.arrow.position.x -  touchPointOnBg!.x;
            // this.yDifference = this.arrow.position.y - touchPointOnBg!.y;
            // let size = Math.abs(this.xDifference)>Math.abs(this.yDifference) ? Math.abs(this.xDifference):Math.abs(this.yDifference);
            // let angle = Math.atan2(this.xDifference,this.yDifference)* 180 / Math.PI;
            // this.arrow.angle = angle*-1;
        }
    }
    itemTouchEndCallback(event: { getUILocation: () => any; }){
        var eventLocation = event.getUILocation();
        if (this.canAccessArrow)
        {
            tween(this.arrow)
            .call(()=>{
                SoundManager.getInstance().playSoundEffect(this.syringeFly);
            })
            .to(0.6, { position:new Vec3(0,1000)/*Vec3(this.xDifference*20,this.yDifference * 20,0)*/})
            .call(()=>{
                
                if(this.virusesDistroyedInOneShot ==0){
                    this.miss++;
                    this.toggleMissedInjections(this.miss);
                    this.showMessage("Ohh, You missed It..");
                    this.showRedWarning();
                }
                else{
                    if(1 <= this.virusesDistroyedInOneShot && this.virusesDistroyedInOneShot <=2)
                    {
                        this.showMessage("Awesome Kill!!");
                    }
                    else if(3 <= this.virusesDistroyedInOneShot && this.virusesDistroyedInOneShot <=4){
                        this.showMessage("What Shot!!");
                    }
                    else if(5 <= this.virusesDistroyedInOneShot){
                        this.showMessage("Killer Shot, Keep Going!!");
                    }
                }

                
                // if(this.bonusLevel){
                //     this.injectionsLeft--;
                //     if(this.injectionsLeft>0){
                //         this.injectionCount.getChildByName(String(this.injectionsLeft))?.removeFromParent();
                //         this.resetSyringePosition();
                //     }else{
                //         // gameOver
                //         if(this.virusArray.length!=0)
                //             this.updateGameOverLayer();
                //     }

                // }
                // else{
                    if(this.miss ==3){
                        if(this.virusArray.length!=0)
                            this.updateGameOverLayer();
                    }
                    else{
                        this.resetSyringePosition();
                    }  
                // }
            })
            .start();
            this.canAccessArrow = false;
        }
    }

    onReplay(){
        this.stopConfettie();
        this.gameOverLayer.node.active = false;
        this.resetScene();
        this.startLevel(this.level);
    }
    onGoToHome(){
        this.node.active = false;
        if(this.bonusLevel){

            this.bonusLevel = false;
            // this.injectionCount.removeAllChildren();
        }
        this.stopConfettie();
        this.gameOverLayer.node.active = false;
        this.resetScene();
        this.level=1;
        this.levelCount=1;
        this.startLevel(this.level);
        // director.loadScene("landingScene");
    }
    onRevive(){
        if(this.enableAPIs&& gameManager.getInstance().isWebBuild){
            this.onGameRevive();
        }


        if(!gameManager.getInstance().isWebBuild){
            if(!gameManager.getInstance().isWebBuild){
                this.showInterstitial();
            }
        }
        else{
            this.reviveMe();
        }
        
        
    }

    reviveMe(){
        this.miss = 0;
        this.gameOverLayer.node.active = false;
        this.arrow.removeFromParent();
        this.setUpInitialSyringe();
        this.enableAllToggleInjections();
        // if(this.bonusLevel){
        //     this.injectionCount.removeAllChildren();
        //     this.setInjectionCount();
        // }
    }

    createCoins(){
        for(let i = 0;i<100;i++){
            let coin = instantiate(this.prefabCoin);
            coin.active=false;
            this.unUsedCoins.push(coin);
            this.bg.node.addChild(coin);
        }
    }
    collectCoinsAnimation(coinsCount:number,position:Vec3|any){
        tween(this.bg)
        .call(()=>{
            let coin:Node|any = this.unUsedCoins.pop();
            coin.active=true;
            coin.setPosition(position);
            tween(coin)
            .to(0.5, { position:new Vec3(540,960,0)})
            .call(()=>{
                coin.active=false;
                this.unUsedCoins.push(coin);
            })
            .start();
        })
        .delay(0.1).union().repeat(coinsCount).start();
    }
    onRewardButton(event:any,  customEventData:any){
        if(customEventData!="close"){
            let touchRestriction:any = this.rewardLayer.node!.getChildByName("touchRestriction");
            touchRestriction.active = true;
            // letBg greyBg:any = this.rewardLayer.node!.getChildByName("GreyBg");
            // grey.active = true;

            this.rewardBox = instantiate(this.giftBox);
            
            this.rewardLayer.node.addChild(this.rewardBox);
            this.rewardBox.setPosition(new Vec3(0,0,0));
            this.rewardBox.getComponent("GiftBox")!.playAnimation(gameManager.getInstance().getRewardDetails().RewardText);

            this.rewardBox.getChildByName('text')!.getComponent(Animation)?.play();

            if(this.enableAPIs&& gameManager.getInstance().isWebBuild){
                this.onCompleteReward(gameManager.getInstance().getRewardDetails().RewardID);
            }
            
            // event.target.getChildByName("gift").active = true;
        }else{
            if(this.rewardBox){
                this.rewardBox.removeFromParent();
                this.rewardBox = null!;
            }
            
            let touchRestriction:any = this.rewardLayer.node!.getChildByName("touchRestriction");
            touchRestriction.active = false;
            
            // let greyBg:any = this.rewardLayer.node!.getChildByName("GreyBg");
            // greyBg.active = false;

            this.rewardLayer.node.active = false;
            this.showStarAnimation();

            this.onNext();
        }
    }

    onSingleBoxTouch(){
            if(this.enableAPIs&& gameManager.getInstance().isWebBuild){
                this.onCompleteReward(gameManager.getInstance().getRewardDetails().RewardID);
            }
            this.congratulationLayer.node.getChildByName('GiftBox')!.active = false;
            this.rewardBox = instantiate(this.giftBox);
            this.congratulationLayer.node.addChild(this.rewardBox);
            this.rewardBox.setPosition(new Vec3(0,0,0));
            this.rewardBox.getComponent("GiftBox")!.playAnimation(gameManager.getInstance().getRewardDetails().RewardText);
    }

    onSingleBoxClose(){

        if(this.rewardBox){
            this.rewardBox.removeFromParent();
            this.rewardBox = null!;
        }
        this.congratulationLayer.node.getChildByName('GiftBox')!.active = true;
        this.congratulationLayer.node.active = false;
        this.showStarAnimation();

        this.onNext();
    }

    onSyringeButton(){
        this.selectInjectionScript.updateCoins();
        this.selectInjection.active = true;
    }
    showMessage(message: string){
        this.message.string = message;
        tween(this.message.node)
        .to(0.2, { scale: new Vec3(1,1,1) })
        .delay(1)
        .to(0.2, { scale: new Vec3(0,0,0) })
        .start();
    }
    showRedWarning(){
        tween(this.redBg)
        .call(()=>{ this.redBg.active = true}).delay(0.7).call(()=>{ this.redBg.active = false})
        .start();
    }
    toggleMissedInjections(num:number){
        let toggleInjectionsScript:any = this.toggleInjections.getComponent("ToggleInjections");
        toggleInjectionsScript!.injectionsFired(num);
    }
    enableAllToggleInjections(){
        let toggleInjectionsScript:any = this.toggleInjections.getComponent("ToggleInjections");
        toggleInjectionsScript!.enableAllToggleInjections();
    }

//API CALLS

    initBlaashGameSDK(){
        // this.APIObject = new BlaashGameSDK("hfhdksiuaHb7a677693d2d4e69aafe5c6ee1b2b596en41EEQr7k2ENjdSM3rbz1col21F3Lrw9XEgmhkD5245665499");

        this.APIObject = new BlaashGameSDK(gameManager.getInstance().getToken());
    }

    onGameStart(){
        let prom1 =  this.APIObject.onGameStart();
        prom1.then((val:any)=> {
            this.initialDataFetched = true;
            console.log('onGameStart executed: ');
            gameManager.getInstance().setRewardDetails(val.RewardID, val.RewardLevel, val.RewardText);
            gameManager.getInstance().setCoins(val.CurrentScore);
            this.selectInjectionScript.updateCoins();
            console.log(val.RewardID,val.RewardLevel,val.RewardText);
            this.updateRewardLevelProgressBar();
          }).catch((err:any) => {
            console.log('onGameStart executed: ' + err);
          }).finally(() => {
            console.log('');
          });
    }

    onCompleteReward(rewardId:number){
        let prom3 =  this.APIObject.onCompleteReward(rewardId);
        prom3.then((val:any)=> {
            console.log('onCompleteReward executed: ');
            console.log(val);
            gameManager.getInstance().setRewardDetails(val.RewardID, val.RewardLevel, val.RewardText);

            console.log(val.RewardID,val.RewardLevel,val.RewardText);
            
        }).catch((err:any) => {
            console.log('onCompleteReward executed: ' + err);
        }).finally(() => {
            console.log('');
        });
    }

    onGameRevive(){
        this.APIObject.onGameRevive();
        // prom5.then((val:any)=> {
        //     console.log('onGameRevive executed: ');
        //     console.log(val);
            // gameManager.getInstance().setRewardDetails(val.RewardID, val.RewardLevel, val.RewardText);

            // console.log(val.RewardID,val.RewardLevel,val.RewardText);
        // }).catch((err:any) => {
        //     console.log('onGameRevive executed: ' + err);
        // }).finally(() => {
        //     console.log('');
        // });
    }
    
    onLevelComplete(level:number,score:number){
        console.log("Data Sent: ",level, score);
        this.APIObject.onLevelComplete(level, score);
    }

    onGameOver(level:number,score:number){
        console.log("Data Sent: ",level, score);
        this.APIObject.onGameOver(level, score);
    }

    onPurchase(score:number,amount:number){
        this.APIObject.onPurchase(score,amount);
    }

    //Ad methods for google play

    admobInit() {
        var self = this;
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name:any) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                    self.reviveButton.getComponent(Button)!.interactable = true;
                    self.reviveButton.getComponent(Sprite)!.grayscale = false;
                },
                adViewDidFailToReceiveAdWithError: function(name:any, msg:any) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                    self.cacheInterstitial();
                },
                adViewWillPresentScreen: function(name:any) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function(name:any) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                    self.reviveMe();
                },
                adViewWillDismissScreen: function(name:any) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                    self.reviveMe();
                },
                adViewWillLeaveApplication: function(name:any) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                    self.reviveMe();
                }
            });
            sdkbox.PluginAdMob.init();
    }

    cacheInterstitial() {
        sdkbox.PluginAdMob.cache('reward');
    }

    showInterstitial() {
        sdkbox.PluginAdMob.show('reward');
    }

    showInfo(msg:string){
        console.log(msg);
    }
}