import { AnimationClip, Prefab, SpriteFrame} from "cc";

export enum VIRUS_TYPE{
    NONE = 0,
    TYPE1 = 1,
    TYPE2 = 2,
    TYPE3 = 3,
    TYPE4 = 4,
    TYPE5 = 5,
    TYPE6 = 6,
    TYPE7 = 7,
    TYPE8 = 8,
    TYPE9 = 9,
    TYPE10= 10,
    TYPE11= 11,
    TYPE12= 12,
    TYPE13= 13
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

export function getVirusAnimationName(virusType:VIRUS_TYPE) {
    let animationName:string = "0";
    switch (virusType){
        case VIRUS_TYPE.TYPE11 :
            animationName = "sparkleVirus1";
            break;
        case VIRUS_TYPE.TYPE12 :
            animationName = "sparkleVirus2";
            break;
        case VIRUS_TYPE.TYPE13 :
            animationName = "sparkleVirus3";
            break;
        default :
            break;
    }
    return animationName;
}

export function getVirusDestroyAnimationName(virusType:VIRUS_TYPE) {
    let animationName:string = "0";
    switch (virusType){
        case VIRUS_TYPE.TYPE1 :
            animationName = "virus1";
            break;
        case VIRUS_TYPE.TYPE2 :
            animationName = "virus2";
            break;
        case VIRUS_TYPE.TYPE3 :
            animationName = "virus3";
            break;
        case VIRUS_TYPE.TYPE4 :
            animationName = "virus4";
            break;
        case VIRUS_TYPE.TYPE5 :
            animationName = "virus5";
            break;
        case VIRUS_TYPE.TYPE6 :
            animationName = "virus6";
            break;
        case VIRUS_TYPE.TYPE7 :
            animationName = "virus7";
            break;
        case VIRUS_TYPE.TYPE8 :
            animationName = "virus8";
            break;
        case VIRUS_TYPE.TYPE9 :
            animationName = "virus9";
            break;
        case VIRUS_TYPE.TYPE10 :
            animationName = "virus10";
            break;
        case VIRUS_TYPE.TYPE11 :
            animationName = "virus11";
            break;
        case VIRUS_TYPE.TYPE12 :
            animationName = "virus12";
            break;
        case VIRUS_TYPE.TYPE13 :
            animationName = "virus13";
            break;
        default :
            break;
    }
    return animationName;
}

export function getVirusPoints(virusType:VIRUS_TYPE) {
    let points:number = 0;
    switch (virusType){
        case VIRUS_TYPE.TYPE1 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE2 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE3 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE4 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE5 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE6 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE7 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE8 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE9 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE10 :
            points = 1;
            break;
        case VIRUS_TYPE.TYPE11 :
            points = 2;
            break;
        case VIRUS_TYPE.TYPE12 :
            points = 2;
            break;
        case VIRUS_TYPE.TYPE13 :
            points = 2;
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
            rowXCol : 5,
            injectionCount : 15,
            scale : 0.12,
            bonusLevel : false,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 3
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 8
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 13
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 18
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 23
                }
            ]

        }
        case 2:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.12,
            bonusLevel: false,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 9
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 12
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 14
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 17
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 19
                }
            ]

        }
        case 3:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.12,
            bonusLevel: false,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 8
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 9
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 12
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 13
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 14
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
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 19
                }
            ]

        }
        case 4:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 15,
            scale : 0.12,
            bonusLevel: false,
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
        case 5:return {
            levelNumber : 4,
            rowXCol : 3,
            injectionCount : 9,
            scale : 0.2,
            bonusLevel : false,
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
        case 6:return {
            levelNumber : 5,
            rowXCol : 5,
            injectionCount : 15,
            scale : 0.12,
            bonusLevel : false,
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
                    "type" : VIRUS_TYPE.TYPE5,
                    "index" : 5
                },
                {
                    "type" : VIRUS_TYPE.TYPE6,
                    "index" : 6
                },
                {
                    "type" : VIRUS_TYPE.TYPE7,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.TYPE8,
                    "index" : 8
                },
                {
                    "type" : VIRUS_TYPE.TYPE9,
                    "index" : 9
                },
                {
                    "type" : VIRUS_TYPE.TYPE10,
                    "index" : 10
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 11
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 12
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 13
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 14
                },
                {
                    "type" : VIRUS_TYPE.TYPE5,
                    "index" : 15
                },
                {
                    "type" : VIRUS_TYPE.TYPE6,
                    "index" : 16
                },
                {
                    "type" : VIRUS_TYPE.TYPE7,
                    "index" : 17
                },
                {
                    "type" : VIRUS_TYPE.TYPE8,
                    "index" : 18
                },
                {
                    "type" : VIRUS_TYPE.TYPE9,
                    "index" : 19
                },
                {
                    "type" : VIRUS_TYPE.TYPE10,
                    "index" : 20
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 21
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 22
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 23
                },
                {
                    "type" : VIRUS_TYPE.TYPE4,
                    "index" : 24
                },
                {
                    "type" : VIRUS_TYPE.TYPE5,
                    "index" : 25
                }
            ]

        }
        case 7:return {
            levelNumber : 3,
            rowXCol : 5,
            injectionCount : 5,
            scale : 0.12,
            bonusLevel : true,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE11,
                    "index" : 3
                },
                {
                    "type" : VIRUS_TYPE.TYPE12,
                    "index" : 8
                },
                {
                    "type" : VIRUS_TYPE.TYPE13,
                    "index" : 13
                },
                {
                    "type" : VIRUS_TYPE.TYPE11,
                    "index" : 18
                },
                {
                    "type" : VIRUS_TYPE.TYPE12,
                    "index" : 23
                }
            ]

        }
    }
}

export class visurInfo
{
  public type           : VIRUS_TYPE | undefined;
  public spriteFrameFull    : SpriteFrame | undefined | any;
}

export class virus
{
  public type     : VIRUS_TYPE | undefined;
  public virus    : Node | undefined | any;
  public power    : number | undefined;
}