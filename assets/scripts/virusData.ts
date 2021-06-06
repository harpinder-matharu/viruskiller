import { SpriteFrame} from "cc";

export enum VIRUS_TYPE{
    NONE = 0,
    TYPE1 = 1,
    TYPE2 = 2,
    TYPE3 = 3,
    TYPE4 = 4
}
//Row columns should be an odd number and n*n
export function getLevelData(level:number) {
    switch(level){
        case 1:return {
            levelNumber : 1,
            rowXCol : 3,
            virus : [
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 1
                },
                {
                    "type" : VIRUS_TYPE.NONE,
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
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 5
                },
                {
                    "type" : VIRUS_TYPE.TYPE2,
                    "index" : 6
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 7
                },
                {
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 8
                },
                {
                    "type" : VIRUS_TYPE.TYPE1,
                    "index" : 9
                }
            ]

        }
        case 2:return {
            levelNumber : 1,
            rowXCol : 5,
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
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 6
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
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 10
                },
                {
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 11
                },
                {
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 12
                },
                {
                    "type" : VIRUS_TYPE.TYPE3,
                    "index" : 13
                },
                {
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 14
                },
                {
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 15
                },
                {
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 16
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
                    "type" : VIRUS_TYPE.NONE,
                    "index" : 20
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
    }
}

export class visurInfo
{
  public type           : VIRUS_TYPE | undefined;
  public spriteFrame         : SpriteFrame | undefined | any;
}