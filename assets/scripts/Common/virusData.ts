import { Prefab, SpriteFrame} from "cc";

export enum VIRUS_TYPE{
    NONE = 0,
    TYPE1 = 1,
    TYPE2 = 2,
    TYPE3 = 3,
    TYPE4 = 4,
    TYPE5 = 5,
    TYPE6 = 6
}

export function getVirusPower(virusType:VIRUS_TYPE) {
    let power:number = 0;
    switch (virusType){
        case VIRUS_TYPE.TYPE1 :
            power = 1;
            break;
        case VIRUS_TYPE.TYPE2 :
            power = 2;
            break;
        case VIRUS_TYPE.TYPE3 :
            power = 3;
            break;
        case VIRUS_TYPE.TYPE4 :
            power = 4;
            break;
        default :
            break;
    }
    return power;
}

export function getVirusPoints(virusType:VIRUS_TYPE) {
    let points:number = 0;
    switch (virusType){
        case VIRUS_TYPE.TYPE1 :
            points = 5;
            break;
        case VIRUS_TYPE.TYPE2 :
            points = 10;
            break;
        case VIRUS_TYPE.TYPE3 :
            points = 15;
            break;
        case VIRUS_TYPE.TYPE4 :
            points = 20;
            break;
        case VIRUS_TYPE.TYPE5 :
            points = 25;
            break;
        case VIRUS_TYPE.TYPE6 :
            points = 30;
            break;
        default :
            break;
    }
    return points;
}

//Row columns should be an odd number and n*n
export function getLevelData(level:number) {
    switch(level){
        case 1:return {
            levelNumber : 3,
            rowXCol : 3,
            injectionCount : 9,
            scale : 0.2,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 2
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 4
                },
                {
                    "type" : VIRUS_TYPE.TYPE5,
                    "index" : 6
                },
                {
                    "type" : VIRUS_TYPE.TYPE6,
                    "index" : 8
                },
            ]

        }
        case 2:return {
            levelNumber : 1,
            rowXCol : 3,
            injectionCount : 9,
            scale : 0.18,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 1,
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 3
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 4
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 6
                },
                {
                    "type" : VIRUS_TYPE.TYPE5,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.TYPE6,
                    "index" : 9
                }
            ]

        }
        case 3:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 15,
            scale : 0.12,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 1
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 2
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 3
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 4
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 5
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 8
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 9
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 13
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 17
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 18
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 19
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 21
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 22
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 23
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 24
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 25
                }
            ]

        }
        case 4:return {
            levelNumber : 4,
            rowXCol : 3,
            injectionCount : 9,
            scale : 0.2,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 1,
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 3
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 4
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 6
                },
                {
                    "type" : VIRUS_TYPE.TYPE5,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.TYPE6,
                    "index" : 9
                }
            ]

        }
    }
}

export class visurInfo
{
  public type           : VIRUS_TYPE | undefined;
  public spriteFrameFull    : SpriteFrame | undefined | any;
  public spriteFrameLeft    : SpriteFrame | undefined | any;
  public spriteFrameRight    : SpriteFrame | undefined | any;
  public prefabAnimation          : Prefab | any;
}

export class virus
{
  public type     : VIRUS_TYPE | undefined;
  public virus    : Node | undefined | any;
  public power    : number | undefined;
}