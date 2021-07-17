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
        case VIRUS_TYPE.TYPE1 : power = 1; break;
        case VIRUS_TYPE.TYPE2 : power = 2; break;
        case VIRUS_TYPE.TYPE3 : power = 3; break;
        case VIRUS_TYPE.TYPE4 : power = 4; break;
        default : break;
    }
    return power;
}

export function getVirusAnimationName(virusType:VIRUS_TYPE) {
    let animationName:string = "0";
    switch (virusType){
        case VIRUS_TYPE.TYPE11 : animationName = "sparkleVirus1"; break;
        case VIRUS_TYPE.TYPE12 : animationName = "sparkleVirus2"; break;
        case VIRUS_TYPE.TYPE13 : animationName = "sparkleVirus3"; break;
        default : break;
    }
    return animationName;
}

export function getVirusDestroyAnimationName(virusType:VIRUS_TYPE) {
    let animationName:string = "0";
    switch (virusType){
        case VIRUS_TYPE.TYPE1 : animationName = "virus1"; break;
        case VIRUS_TYPE.TYPE2 : animationName = "virus2"; break;
        case VIRUS_TYPE.TYPE3 : animationName = "virus3"; break;
        case VIRUS_TYPE.TYPE4 : animationName = "virus4"; break;
        case VIRUS_TYPE.TYPE5 : animationName = "virus5"; break;
        case VIRUS_TYPE.TYPE6 : animationName = "virus6"; break;
        case VIRUS_TYPE.TYPE7 : animationName = "virus7"; break;
        case VIRUS_TYPE.TYPE8 : animationName = "virus8"; break;
        case VIRUS_TYPE.TYPE9 : animationName = "virus9"; break;
        case VIRUS_TYPE.TYPE10 : animationName = "virus10"; break;
        case VIRUS_TYPE.TYPE11 : animationName = "virus11"; break;
        case VIRUS_TYPE.TYPE12 : animationName = "virus12"; break;
        case VIRUS_TYPE.TYPE13 : animationName = "virus13"; break;
        default : break;
    }
    return animationName;
}

export function getVirusPoints(virusType:VIRUS_TYPE) {
    let points:number = 0;
    switch (virusType){
        case VIRUS_TYPE.TYPE1 : points = 1; break;
        case VIRUS_TYPE.TYPE2 : points = 1; break;
        case VIRUS_TYPE.TYPE3 : points = 1; break;
        case VIRUS_TYPE.TYPE4 : points = 1; break;
        case VIRUS_TYPE.TYPE5 : points = 1; break;
        case VIRUS_TYPE.TYPE6 : points = 1; break;
        case VIRUS_TYPE.TYPE7 : points = 1; break;
        case VIRUS_TYPE.TYPE8 : points = 1; break;
        case VIRUS_TYPE.TYPE9 : points = 1; break;
        case VIRUS_TYPE.TYPE10 : points = 1; break;
        case VIRUS_TYPE.TYPE11 : points = 2; break;
        case VIRUS_TYPE.TYPE12 : points = 2; break;
        case VIRUS_TYPE.TYPE13 : points = 2; break;
        default : break;
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
            scale : 0.14,
            bonusLevel : false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE1,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 23}
            ]
        }
        case 2:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE2,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 19}
            ]
        }
        case 3:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE3,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 19}
            ]
        }
        case 4:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE5,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 24}
            ]
        }
        case 5:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE5,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 24}
            ]
        }
        case 6:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE7,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 25}
            ]
        }
        case 7:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE8,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE8,"index" : 25}
            ]
        }
        case 8:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE9,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 25}
            ]
        }
        case 9:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 15,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE9,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 25}
            ]
        }
        case 10:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE10,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE10,"index" : 25}
            ]
        }
        case 11:return {
            levelNumber : 1,
            rowXCol : 5,
            injectionCount : 9,
            scale : 0.14,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE11,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 25}
            ]
        }
        case 12:return {
            levelNumber : 1,
            rowXCol : 7,
            injectionCount : 9,
            scale : 0.125,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE1,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 29},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 31},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 32},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 33},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 35},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 39},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 41},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 42},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 43},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 49}
            ]
        }
        case 13:return {
            levelNumber : 1,
            rowXCol : 7,
            injectionCount : 9,
            scale : 0.125,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE3,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 26},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 27},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 30},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 32},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 34},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 38},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 39},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 40},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 46}
            ]
        }
        case 14:return {
            levelNumber : 1,
            rowXCol : 7,
            injectionCount : 9,
            scale : 0.125,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE3,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 29},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 31},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 33},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 35},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 41},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 42},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 43},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 44},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 45},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 47},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 48},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 49}
            ]
        }
        case 15:return {
            levelNumber : 1,
            rowXCol : 7,
            injectionCount : 9,
            scale : 0.125,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE5,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 13},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 15},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 26},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 29},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 30},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 32},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 34},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 35},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 38},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 40},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 41},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 45},
                {"type" : VIRUS_TYPE.TYPE5,"index" : 47}
            ]
        }
        case 16:return {
            levelNumber : 1,
            rowXCol : 7,
            injectionCount : 9,
            scale : 0.125,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE7,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 17},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 27},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 31},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 33},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 39},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 42},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 43},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 44},
                {"type" : VIRUS_TYPE.TYPE6,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 48},
                {"type" : VIRUS_TYPE.TYPE7,"index" : 49}
            ]
        }
        case 17:return {
            levelNumber : 1,
            rowXCol : 7,
            injectionCount : 9,
            scale : 0.125,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE9,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 11},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 14},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 26},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 27},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 29},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 32},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 39},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 43},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 47},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 48},
                {"type" : VIRUS_TYPE.TYPE9,"index" : 49}
            ]
        }
        case 18:return {
            levelNumber : 1,
            rowXCol : 9,
            injectionCount : 9,
            scale : 0.11,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE1,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 26},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 45},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 54},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 56},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 62},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 66},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 70},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 76},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 77},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 78}
            ]
        }
        case 19:return {
            levelNumber : 1,
            rowXCol : 9,
            injectionCount : 9,
            scale : 0.11,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE1,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 12},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 16},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 20},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 26},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 45},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 54},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 56},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 62},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 66},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 70},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 76},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 77},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 78},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 41},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 57},
                {"type" : VIRUS_TYPE.TYPE1,"index" : 61},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 31},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 33},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 49},
                {"type" : VIRUS_TYPE.TYPE3,"index" : 51}
            ]
        }
        case 20:return {
            levelNumber : 1,
            rowXCol : 9,
            injectionCount : 9,
            scale : 0.11,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE2,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 55},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 64},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 73},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 74},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 75},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 76},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 77},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 78},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 79},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 80},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 81},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 27},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 45},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 54},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 63},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 72},
                {"type" : VIRUS_TYPE.TYPE2,"index" : 81},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 30},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 34},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 39},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 43},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 48},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 52},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 57},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 58},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 59},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 60},
                {"type" : VIRUS_TYPE.TYPE4,"index" : 61}
            ]
        }
        case 21:return {
            levelNumber : 1,
            rowXCol : 9,
            injectionCount : 9,
            scale : 0.11,
            bonusLevel: false,
            virus : [
                {"type" : VIRUS_TYPE.TYPE11,"index" : 1},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 2},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 3},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 4},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 5},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 6},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 7},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 8},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 9},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 10},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 19},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 28},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 37},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 46},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 55},
                {"type" : VIRUS_TYPE.TYPE11,"index" : 64},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 73},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 74},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 75},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 76},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 77},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 78},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 79},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 80},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 81},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 18},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 27},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 36},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 45},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 54},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 63},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 72},
                {"type" : VIRUS_TYPE.TYPE12,"index" : 81},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 21},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 22},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 23},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 24},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 25},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 30},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 34},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 39},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 43},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 48},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 52},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 57},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 58},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 59},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 60},
                {"type" : VIRUS_TYPE.TYPE13,"index" : 61}
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