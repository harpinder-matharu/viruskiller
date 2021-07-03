
import { _decorator, Component, Node, Prefab, SpriteFrame, Enum, Sprite, tween, Vec3, math, instantiate, UITransform, size, assetManager, resources, director, Director, physics, PhysicsSystem, Intersection2D, v3, v2, Collider, Size, Vec2, Label, UI,Animation, AudioClip, AudioSource, AnimationClip, Button } from 'cc';
import {gameManager , IN_GAME_CURR_OP, SCENE_TYPE, SYRINGE_TYPE} from '../Common/gameManager';
const { ccclass, property } = _decorator;
import {VIRUS_TYPE, getLevelData,visurInfo,virus,getVirusPower,getVirusPoints} from '../Common/virusData'
import { SoundManager } from '../Common/SoundManager';

@ccclass('GamePlay')
export class GamePlay extends Component {
    
    //touch points
    arrowTouchBeganPoint:any;
    canAccessArrow :Boolean = false;
    coinMultiplyFactor:number=0;

    level:number = 0;
    maxLevel:number = 6;
    totalLevelPoints:number = 0;

    injectionsLeft:number = 0;
    miss:number = 0;
    virusesDistroyedInOneShot:number = 0;
    xDifference:number = 0;
    yDifference:number = 0;

    levelData :any;
    virus:Node  = null!;

    virusArray : Array<virus> = new Array(); //container 
    arrow:Node =  null!;
    virusInfo : Array<visurInfo> = new Array();
    unUsedCoins : Array<Node> = new Array();

    arrowPrefab = new Prefab();

    @property(Label)    levelNum :Label = null!;
    @property(Label)    levelScore :Label = null!;
    @property(Label)    cuponDiscount :Label = null!;
    @property(Label)    message :Label = null!;

    @property(Node)    injectionCount :Node = null!;
    @property(Node)    selectInjection :Node = null!;
    @property(Sprite)    bg :Sprite = null!;
    @property(Sprite)    bonfire :Sprite = null!;
    @property(Sprite)    rotator :Sprite = null!;
    @property(Sprite)    gameOverLayer :Sprite = null!;
    @property(Sprite)    congratulationLayer :Sprite = null!;
    @property(Sprite)    rewardLayer :Sprite = null!;
    @property(Sprite)    fireAnimation :Sprite = null!;
    @property(Sprite)    confettieAnimation :Sprite = null!;
    @property(Sprite)    progressbar:Sprite = null!;

    @property(Prefab)    prefabAnimation:Prefab = null!;
    @property(Prefab)    prefabCoin :Prefab = null!;
    @property(Prefab)    virusPrefab :Prefab = null!;
    @property(Prefab)    dotPrefab :Prefab = null!;

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
        SoundManager.getInstance().init(this.node.getComponent(AudioSource)!);
        this.gameOverLayer.node.active = false;
        this.confettieAnimation.node.active = false;
        this.rewardLayer.node.active = false;
        this.congratulationLayer.node.active = false;
        this.selectInjection.active =false;

        let selectInjectionScript:any = this.selectInjection.getComponent("ChooseInjection");
        selectInjectionScript!.setDelegate(this);

        this.startLevel(1);
        this.createCoins();
    }

    startLevel(levelNum:number){
        this.miss = 0;
        this.coinMultiplyFactor = gameManager.getInstance().getSyringeType();
        
        this.arrowPrefab = this.syringes[this.syringesType.indexOf(this.coinMultiplyFactor)];
        
        if(this.maxLevel < levelNum){
            console.log("Maximum Level reached");
            return;
        }
        this.level = levelNum;
        this.touchEvents();
        this.updateLevelData();
        this.updateLevelNum();
        this.setVirusInfo();
        this.setUpViruses();
        this.setUpInitialSyringe();
        this.rotateRotator();
        // this.setInjectionCount();
        this.schedule(this.checkCollision, 0.001);
        console.log("Syringe Type : "+gameManager.getInstance().getSyringeType());
    }

    updateSyringeType(){ 
        this.coinMultiplyFactor = gameManager.getInstance().getSyringeType();
        this.arrowPrefab = this.syringes[this.syringesType.indexOf(this.coinMultiplyFactor)];
        this.setUpInitialSyringe();

        console.log("i tyep "+this.coinMultiplyFactor);
    }

    resetScene(){
        this.rotator.node.removeAllChildren();
        // this.injectionCount.removeAllChildren();
        this.arrow.removeFromParent();
    }

    updateLevelData(){
        this.levelData = getLevelData(this.level);
    }
    setUpInitialSyringe(){

        if(this.arrow)
            this.arrow.removeFromParent();

        this.arrow = instantiate(this.arrowPrefab);
        let scale = this.bg.getComponent(UITransform)?.contentSize.height!  * 0.2/this.arrow.getComponent(UITransform)?.contentSize.height!;
        this.arrow.setScale(new Vec3(scale,scale,scale));
        this.arrow.position.y = this.bg.getComponent(UITransform)?.contentSize.height! * 0.3 *-1;
        this.arrow.position.x = 0;
        this.bg.node.addChild(this.arrow);

        tween(this.arrow)
        .repeatForever(
            tween()
            .by(0.5, { position: new Vec3(0, +50, 10) }, { easing: 'sineOut'})
            .by(0.5, { position: new Vec3(0, -50, 0) }, { easing: 'sineIn'})
        ).start();
    }
    resetSyringePosition(){
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
    
        this.getY(5,9);
        this.virus = instantiate(this.virusPrefab); 

        //difference between viruses
        let numRowColumn = this.levelData.rowXCol;
        let diffBtwnViruses = this.rotator.getComponent(UITransform)?.contentSize.height!  / (numRowColumn+2);

        //size of virus
        let scale = this.rotator.getComponent(UITransform)?.contentSize.height!  * this.levelData.scale/this.virus.getComponent(UITransform)?.contentSize.height!;
        this.totalLevelPoints = 0;
        this.progressbar.fillRange = 0;
        this.levelScore.string = "0";
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
            this.virusArray.push({
                type : virus.type,
                virus : this.virus,
                power : getVirusPower(virus.type)
                });
            this.virus.getComponent(Sprite)!.spriteFrame = this.virusInfo.find(i => i.type === virus.type)?.spriteFrameFull;
            
            let virusPosition = new Vec3(diffBtwnViruses * this.getX(virus.index,numRowColumn), diffBtwnViruses * this.getY(virus.index,numRowColumn),0);

            this.virus.position = virusPosition;
            dot.position = virusPosition;
            this.rotator.node.addChild(dot);
            this.rotator.node.addChild(this.virus);
            this.virus.setScale(new Vec3(scale,scale,1));
        });

        this.totalLevelPoints = this.totalLevelPoints * this.coinMultiplyFactor;
        console.log("Points "+this.totalLevelPoints);
    }

    updateLevelNum(){
        this.levelNum.string = String("LEVEL"+this.level);
    }
    setInjectionCount(){
        let spareArrow = instantiate(this.arrowPrefab);
        let scale = this.rotator.getComponent(UITransform)?.contentSize.width!  * 0.06/spareArrow.getComponent(UITransform)?.contentSize.width!;

        spareArrow.setScale(new Vec3(scale,scale,scale));

        this.injectionsLeft = this.levelData.injectionCount;
        let width = spareArrow.getComponent(UITransform)?.contentSize.width! * this.injectionsLeft*scale;
        let height = spareArrow.getComponent(UITransform)?.contentSize.height!*scale;
        this.injectionCount.getComponent(UITransform)?.setContentSize(new Size(width,height)); 

        for(let i=1;i<this.injectionsLeft;i++){
            console.log("Adding injection");
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
            .by(Math.floor(Math.random() * 1)+ 2, {  angle : 360})
            .by(Math.floor(Math.random() * 2)+ 2, {  angle : 360})
            .by(Math.floor(Math.random() * 1)+ 2, {  angle : 10})
            .by(Math.floor(Math.random() * 2)+ 2, {  angle : -360})
            .by(Math.floor(Math.random() * 1)+ 2, {  angle : -360})
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
                    console.log("Collision");
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

            this.rewardLayer.node.active = true;
            // this.onGameWin();
        }
    }

    onNext(){
        this.stopConfettie();
        this.gameOverLayer.node.active = false;
        console.log("Level Complete, Move to next Level");
        this.resetScene();
        this.level++
        this.startLevel(this.level);
    }

    stopConfettie(){
        this.confettieAnimation.getComponent(Animation)?.stop();
        this.confettieAnimation.node.active = false;
    }

    updateGameWinLayer(){
        let levelNumber:Label|any = this.gameOverLayer.node.getChildByName("level")?.getComponent(Label);
        levelNumber.string = String("LEVEL "+this.level);

        let scoreValue:Label|any = this.gameOverLayer.node.getChildByName("scoreValue")?.getComponent(Label);
        scoreValue.string = String(this.levelScore.string);

        let reviveButton:Button|any = this.gameOverLayer.node.getChildByName("revive");
        reviveButton.active = false;

        let nextButton:Button|any = this.gameOverLayer.node.getChildByName("next");
        nextButton.active = true;

        this.gameOverLayer.node.active = true;
    }
    // if(this.virusArray.length>0)
    updateGameOverLayer(){
          
        let levelNumber:Label|any = this.gameOverLayer.node.getChildByName("level")?.getComponent(Label);
        levelNumber.string = String("LEVEL "+this.level);

        let scoreValue:Label|any = this.gameOverLayer.node.getChildByName("scoreValue")?.getComponent(Label);
        scoreValue.string = String(this.levelScore.string);

        let reviveButton:Button|any = this.gameOverLayer.node.getChildByName("revive");
        reviveButton.active = true;

        let nextButton:Button|any = this.gameOverLayer.node.getChildByName("next");
        nextButton.active = false;

        this.gameOverLayer.node.active = true;
    }

    breakAndBurnVirus(virusData:virus){

        let point:number = getVirusPoints(virusData.type!) * this.coinMultiplyFactor;
        
        this.levelScore.string = String(parseInt(this.levelScore.string) + point);
        this.progressbar.fillRange = this.progressbar.fillRange+ point/this.totalLevelPoints;
        

        let scale = this.rotator.getComponent(UITransform)?.contentSize.height!  * this.levelData.scale/virusData.virus.getComponent(UITransform)?.contentSize.height!;

        let Position = this.rotator.getComponent(UITransform)?.convertToWorldSpaceAR(virusData.virus.position);
        Position = this.bg.getComponent(UITransform)?.convertToNodeSpaceAR(Position!);

        this.collectCoinsAnimation(point,Position);
        
        let virusBlastAnimation = instantiate(this.prefabAnimation);
        let virusIndex = this.virusInfo.findIndex(i => i.type === virusData.type) +1;
        


        virusBlastAnimation.position.y = Position!.y;
        virusBlastAnimation.position.x = Position!.x;

        this.bg.node.addChild(virusBlastAnimation);
        
        virusBlastAnimation.getComponent(Animation)?.play("virus"+virusIndex);
        this.fireAnimation.getComponent(Animation)?.play();
        
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
        // console.log(`index ${index} difference  ${difference} upDown: ${upDown}`);
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
            this.virusesDistroyedInOneShot = 0;  
            this.arrowTouchBeganPoint = eventLocation;
            console.log("Arrow Touched");
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
                // this.injectionsLeft--;
                // if(this.injectionsLeft>0){
                //     // this.injectionCount.getChildByName(String(this.injectionsLeft))?.removeFromParent();
                //     this.resetSyringePosition();
                // }else{
                //     // gameOver
                //     if(this.virusArray.length!=0)
                //         this.updateGameOverLayer();
                // }

                if(this.virusesDistroyedInOneShot ==0){
                    this.miss++;
                    this.showMessage("Miss!");
                }
                else{
                    this.showMessage("Great!");
                }
                
                if(this.miss ==3){
                    if(this.virusArray.length!=0)
                        this.updateGameOverLayer();
                }
                else{
                    this.resetSyringePosition();
                }

                console.log(`MISS : ${this.miss}, Collisions : ${this.virusesDistroyedInOneShot}`);
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
        director.loadScene("landingScene");
    }
    onRevive(){
        this.miss = 0;
        this.gameOverLayer.node.active = false;
        // this.injectionCount.removeAllChildren();
        this.arrow.removeFromParent();
        this.setUpInitialSyringe();
        // this.setInjectionCount();
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
        .delay(0.1)
        .union()
        .repeat(coinsCount)
        .start();
    }

    onRewardButton(event:any,  customEventData:any){
        console.log(event, customEventData);
        parseInt(customEventData);
        this.rewardLayer.node.active = false;
        tween(this.bg)
        .call(()=>{
            this.cuponDiscount.string = String(Math.floor(Math.random() * parseInt(this.levelScore.string)))+"%";
            this.congratulationLayer.node.active = true;
            this.congratulationLayer.node.getChildByName('GiftBox')!.getComponent(Animation)?.play();
            this.congratulationLayer.node.getChildByName('Cupon')!.getComponent(Animation)?.play();
        })
        .delay(6)
        .call(()=>{
            this.congratulationLayer.node.active = false;
        })
        .start();
    }

    onSyringeButton(){
        this.selectInjection.active = true;
    }

    showMessage(message: string){
        this.message.string = message;

        tween(this.message.node)
        .to(0.2, { scale: new Vec3(1,1,1) })
        .delay(0.4)
        .to(0.2, { scale: new Vec3(0,0,0) })
        .start();
    }
}