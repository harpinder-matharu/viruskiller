
import { _decorator, Component, Node, Prefab, SpriteFrame, Enum, Sprite, tween, Vec3, math, instantiate, UITransform, size, assetManager, resources, director, Director, physics, PhysicsSystem, Intersection2D, v3, v2, Collider, Size, Vec2 } from 'cc';

const { ccclass, property } = _decorator;
import {VIRUS_TYPE, getLevelData,visurInfo,virus,getVirusPower} from '../scripts/virusData'

@ccclass('GamePlay')
export class GamePlay extends Component {
    
    //touch points
    arrowTouchBeganPoint:any;
    canAccessArrow :Boolean = false;

    injectionsLeft:number = 0;
    xDifference:number = 0;
    yDifference:number = 0;

    levelData :any;
    virus:Node = new Node();

    virusArray : Array<virus> = new Array(); //container 
    arrow:Node = new Node();
    virusInfo : Array<visurInfo> = new Array();

    @property(Node)
    injectionCount = new Node();

    @property(Prefab)
    virusPrefab = new Prefab();

    @property(Prefab)
    arrowPrefab = new Prefab();

    @property(Sprite)
    bg = new Sprite();

    @property(Sprite)
    rotator = new Sprite();

    @property(SpriteFrame)
    virusFrames = [];

    @property({type : Enum(VIRUS_TYPE)})
    virusFrameType   = [];

    start () {
        this.touchEvents();
        this.levelData = getLevelData(3);
        this.setVirusInfo();
        this.setUpViruses();
        this.setUpArrow();
        this.rotateRotator();
        this.setInjectionCount();
        // this.schedule(this.checkCollision, 0.001);
        // this.unschedule(this.checkCollision);
    }
    setUpArrow(){
        this.arrow = instantiate(this.arrowPrefab);
        let scale = this.rotator.getComponent(UITransform)?.contentSize.width!  * 0.12/this.arrow.getComponent(UITransform)?.contentSize.width!;
        this.arrow.setScale(new Vec3(scale,scale,scale));
        this.arrow.position.y = this.bg.getComponent(UITransform)?.contentSize.height! * 0.3 *-1;
        this.arrow.position.x = 0;
        this.bg.node.addChild(this.arrow);
    }
    resetArrow(){
        this.arrow.position.y = this.bg.getComponent(UITransform)?.contentSize.height! * 0.3 *-1;
        this.arrow.position.x = 0;
    }
    setVirusInfo(){
        this.virusFrames.forEach((itemFrame,index,aar) =>{
            this.virusInfo.push({ 
                type            : this.virusFrameType[index],
                spriteFrame     : itemFrame
            });
        });
    }
    setUpViruses(){
    
        this.getY(5,9);
        this.virus = instantiate(this.virusPrefab); 

        //difference between viruses
        let numRowColumn = this.levelData.rowXCol;
        let diffBtwnViruses = this.rotator.getComponent(UITransform)?.contentSize.height!  / (numRowColumn+2);

        //size of virus
        let scale = this.rotator.getComponent(UITransform)?.contentSize.height!  * this.levelData.scale/this.virus.getComponent(UITransform)?.contentSize.height!;

        
        for(let j = 1; j <= numRowColumn*numRowColumn; j++){
            
            if(this.levelData.virus[j-1].type ===VIRUS_TYPE.NONE){
                continue;
            }
            this.virus = instantiate(this.virusPrefab); 
            tween(this.virus)
            .repeatForever(
                tween()
                .by(1, {  angle : 180})
                .by(2, {  angle : 180})
                .by(0.5, {  angle : 10})
                .by(2, {  angle : -180})
                .by(1, {  angle : -180})
            ).start();
            this.virusArray.push({
                type : this.levelData.virus[j-1].type,
                virus : this.virus,
                power : getVirusPower(this.levelData.virus[j-1].type)
                });
            this.virus.getComponent(Sprite)!.spriteFrame = this.virusInfo.find(i => i.type === this.levelData.virus[j-1].type)?.spriteFrame;
            
            this.virus.position = new Vec3(diffBtwnViruses * this.getX(j,numRowColumn), diffBtwnViruses * this.getY(j,numRowColumn),0);
            this.rotator.node.addChild(this.virus);
            this.virus.setScale(new Vec3(scale,scale,1));
        }
    }

    setInjectionCount(){
        let spareArrow = instantiate(this.arrowPrefab);
        let scale = this.rotator.getComponent(UITransform)?.contentSize.width!  * 0.09/spareArrow.getComponent(UITransform)?.contentSize.width!;

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
            .by(1, {  angle : 180})
            .by(2, {  angle : 180})
            .by(0.5, {  angle : 10})
            .by(2, {  angle : -180})
            .by(1, {  angle : -180})
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
                    virusData.virus.active = false;
                    aar.splice(index, 1);
                }
            });
        }
        else{
            console.log("Game Over");
            this.unschedule(this.checkCollision);
        }
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
            this.arrowTouchBeganPoint = eventLocation;
            console.log("Arrow Touched");
            this.canAccessArrow = true;
        }   
    }
    itemTouchMoveCallback(event: { getUILocation: () => any; }){
        var eventLocation = event.getUILocation();
        if (this.canAccessArrow)
        {
            let touchPointOnBg = this.bg!.getComponent(UITransform)?.convertToNodeSpaceAR(v3(eventLocation.x, eventLocation.y,0));
            this.xDifference = this.arrow.position.x -  touchPointOnBg!.x;
            this.yDifference = this.arrow.position.y - touchPointOnBg!.y;
            let size = Math.abs(this.xDifference)>Math.abs(this.yDifference) ? Math.abs(this.xDifference):Math.abs(this.yDifference);
            let angle = Math.atan2(this.xDifference,this.yDifference)* 180 / Math.PI;
            this.arrow.angle = angle*-1;
        }
    }
    itemTouchEndCallback(event: { getUILocation: () => any; }){
        var eventLocation = event.getUILocation();
        if (this.canAccessArrow)
        {
            // this.arrow.getComponent(UITransform)!.setAnchorPoint(new Vec2(0.5,1));
            tween(this.arrow)
            .call(()=>{
                this.schedule(this.checkCollision, 0.001);
            })
            .to(0.6, { position:new Vec3(0,600)/*Vec3(this.xDifference*20,this.yDifference * 20,0)*/})
            .call(()=>{
                this.injectionsLeft--;
                if(this.injectionsLeft>0){
                    this.injectionCount.getChildByName(String(this.injectionsLeft))?.removeFromParent();
                    this.resetArrow();
                }
                this.unschedule(this.checkCollision);
            })
            .start();
            this.canAccessArrow = false;
        }
    }
}