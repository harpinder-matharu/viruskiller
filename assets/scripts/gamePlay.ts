
import { _decorator, Component, Node, Prefab, SpriteFrame, Enum, Sprite, tween, Vec3, math, instantiate, UITransform, size, assetManager, resources } from 'cc';
const { ccclass, property } = _decorator;
import {VIRUS_TYPE} from '../scripts/virusData'

@ccclass('GamePlay')
export class GamePlay extends Component {
    
    virus:Node = new Node();

    @property(Prefab)
    virusPrefab = new Prefab();

    @property(Sprite)
    rotator = new Sprite();

    @property(SpriteFrame)
    virusFrames = [];

    @property({type : Enum(VIRUS_TYPE)})
    virusFrameType   = [];

    start () {

        // this.virus = instantiate(this.virusPrefab); 
        // this.rotator.node.addChild(this.virus);

        this.setUpViruses();
        // this.rotator.node.setAnchorPoint(0.5, 0.5);
        tween(this.rotator.node)
        .to(2, {  angle : 360 /*rotation: math.quat(1) */})
        .repeatForever()
        .start();

        // for(let i = 1; i<=81;i++){
        //     console.log(`index ${i} id at line no. ${this.getY(i,9)}`);
        // }

        for(let i = 1; i<=81;i++){
            // console.log(`index ${i} id at line no. ${this.getX(i,9)}`);
            
            console.log(`index ${i} id at co-ordinate (${this.getX(i,9)},${this.getY(i,9)})`);
        }
    }

    setUpViruses(){
    
    this.getY(5,9);
    this.virus = instantiate(this.virusPrefab); 

    //difference between viruses
    let numRowColumn = 5; // 
    let diffBtwnViruses = this.rotator.getComponent(UITransform)?.contentSize.height!  / (numRowColumn+2);

    //size of virus
    let scale = this.rotator.getComponent(UITransform)?.contentSize.height!  * 0.05/this.virus.getComponent(UITransform)?.contentSize.height!;

        
        for(let j = 1; j <= numRowColumn*numRowColumn; j++){
            this.virus = instantiate(this.virusPrefab); 
            this.virus.position = new Vec3(diffBtwnViruses * this.getX(j,numRowColumn), diffBtwnViruses * this.getY(j,numRowColumn),0);
            this.rotator.node.addChild(this.virus);
            this.virus.setScale(new Vec3(scale,scale,1));
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
}