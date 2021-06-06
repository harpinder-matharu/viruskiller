
import { _decorator, Component, Node, Prefab, SpriteFrame, Enum, Sprite, tween, Vec3, math, instantiate, UITransform, size, assetManager, resources, director, Director, physics, PhysicsSystem, Intersection2D, v3, v2, Collider } from 'cc';

const { ccclass, property } = _decorator;
import {VIRUS_TYPE, getLevelData,visurInfo} from '../scripts/virusData'

@ccclass('GamePlay')
export class GamePlay extends Component {
    
    //touch points
    arrowTouchBeganPoint:any;
    canAccessArrow :Boolean = false;

    xDifference:number = 0;
    yDifference:number = 0;

    levelData :any;
    virus:Node = new Node();

    virusArray = new Array;
    arrow:Node = new Node();
    virusInfo : Array<visurInfo> = new Array();

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
        this.levelData = getLevelData(2);
        this.setVirusInfo();
        this.setUpViruses();
        this.setUpArrow();
        this.rotateRotator();

        this.schedule(this.checkCollision, 0.01);
        // this.unschedule(this.checkCollision);
    }
    touchEvents(){
        this.node.on(Node.EventType.TOUCH_START,this.itemTouchStartCallback,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.itemTouchMoveCallback,this);
        this.node.on(Node.EventType.TOUCH_END,this.itemTouchEndCallback,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.itemTouchEndCallback,this);
    }
    itemTouchStartCallback(event: { getLocation: () => any; }){
        var eventLocation = event.getLocation();
        let touchPointOnBg = this.bg!.getComponent(UITransform)?.convertToNodeSpaceAR(v3(eventLocation.x, eventLocation.y,0)); 
        // console.log(`Touch Point bg :  ${touchPointOnBg!.x} ${touchPointOnBg!.y}`);
        // console.log(`Bounding Box arrow :  ${this.arrow!.getComponent(UITransform)?.getBoundingBox()}`);
        
        if(this.arrow!.getComponent(UITransform)?.getBoundingBox().contains(v2(touchPointOnBg!.x, touchPointOnBg!.y))){
            // arrow touched    
            this.arrowTouchBeganPoint = eventLocation;
            console.log("Arrow Touched");
            this.canAccessArrow = true;
        }   
    }
    itemTouchMoveCallback(event: { getLocation: () => any; }){
        var eventLocation = event.getLocation();
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
    itemTouchEndCallback(event: { getStartLocation: () => any; }){
        var eventLocation = event.getStartLocation();
        if (this.canAccessArrow)
        {
            this.arrow.setAnchorPoint(new Vec3(0.5,1,0));
            tween(this.arrow)
            .to(4, { position:new Vec3(this.xDifference*9,this.yDifference * 9,0)})
            .start();
            this.canAccessArrow = false;
        }
    }
    setUpArrow(){
        this.arrow = instantiate(this.arrowPrefab);
        let scale = this.rotator.getComponent(UITransform)?.contentSize.width!  * 0.12/this.arrow.getComponent(UITransform)?.contentSize.width!;
        this.arrow.setScale(new Vec3(scale,scale,scale));
        this.arrow.position.y = this.bg.getComponent(UITransform)?.contentSize.height! * 0.3 *-1;
        this.arrow.position.x = 0;
        this.bg.node.addChild(this.arrow);
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
        let scale = this.rotator.getComponent(UITransform)?.contentSize.height!  * 0.09/this.virus.getComponent(UITransform)?.contentSize.height!;

        
        for(let j = 1; j <= numRowColumn*numRowColumn; j++){
            
            if(this.levelData.virus[j-1].type ===VIRUS_TYPE.NONE){
                continue;
            }
            this.virus = instantiate(this.virusPrefab); 
            this.virusArray.push(this.virus);
            this.virus.getComponent(Sprite).spriteFrame = this.virusInfo.find(i => i.type === this.levelData.virus[j-1].type)?.spriteFrame;
            
            this.virus.position = new Vec3(diffBtwnViruses * this.getX(j,numRowColumn), diffBtwnViruses * this.getY(j,numRowColumn),0);
            this.rotator.node.addChild(this.virus);
            this.virus.setScale(new Vec3(scale,scale,1));
        }
    }

    rotateRotator(){
        tween(this.rotator.node)
        .by(1, {  angle : 90 /*rotation: math.quat(1) */})
        .repeatForever()
        .start();
    }

    checkArrowIntersectWith(virus :any| Node){
        if(virus && this.arrow){
            return Intersection2D.rectRect(
                virus.getChildByName("collider").getComponent(UITransform)?.getBoundingBoxToWorld(),
                this.arrow.getChildByName("collider").getComponent(UITransform)?.getBoundingBoxToWorld()!
                );
        }
        else{
            return false;
        }
    }

    checkCollision(){
        this.virusArray.forEach((virus,index,aar) =>{
            if (this.checkArrowIntersectWith(virus)){
                console.log("Collision");
                virus.active = false;
            }
        })
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
}