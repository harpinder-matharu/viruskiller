export enum SCENE_TYPE {
    NONE = 0,
    SPLASH = 1,
    HOME = 2,
    GAME = 3,
    SYRINGE_SELECTION = 4
}

export enum SYRINGE_TYPE {
    NONE  = 0,
    TYPE1 = 1,
    TYPE2 = 2,
    TYPE3 = 3,
    TYPE4 = 4,
    TYPE5 = 5,
    TYPE6 = 6,
    TYPE7 = 7,
    TYPE8 = 8,
    TYPE9 = 9
}

export enum IN_GAME_CURR_OP{
    INCRESE  = 1,
    DECREASE = 2,
    RESET    = 3
}

export class gameManager{

    sceneType: SCENE_TYPE = SCENE_TYPE.NONE;
    syringeType: SYRINGE_TYPE = SYRINGE_TYPE.TYPE1;
    coins : number = 0;
    token : string = null!;

    rewardDetails: { RewardID: number; RewardLevel: number; RewardText: string } =
    {RewardID:0,RewardLevel:0,RewardText:""};

    music : boolean = true;
    sound : boolean = true;
    isWebBuild : boolean = true;

    gameManager(){
        this.sceneType = SCENE_TYPE.NONE;
    }

    private static _instance : gameManager;

    static getInstance(): gameManager{
        if(!gameManager._instance){
            gameManager._instance = new gameManager();
        }
        return gameManager._instance;
    }

    setMusic(music:boolean){
        this.music = music;
    }
    getMusic(){
        return this.music;
    }

    setToken(token:string){
        this.token = token;
    }
    getToken(){
        return this.token;
    }

    setRewardDetails(RewardID: number, RewardLevel: number, RewardText: string){
        this.rewardDetails.RewardID = RewardID;
        this.rewardDetails.RewardLevel = RewardLevel;
        this.rewardDetails.RewardText = RewardText;
    }

    getRewardDetails(){
        return this.rewardDetails;
    }

    setSound(sound:boolean){
        this.sound = sound;
    }
    getSound(){
        return this.sound;
    }

    setSyringeType(syringeType : SYRINGE_TYPE){
        this.syringeType = syringeType;
    }
    getSyringeType(): SYRINGE_TYPE{
        return this.syringeType;
    }

    getSceneType () : SCENE_TYPE{
        return this.sceneType;
    }
    setSceneType (pSceneType : SCENE_TYPE){
        this.sceneType = pSceneType;
    }

    setCoins(coin : number){
        this.coins = coin;
    }
    getCoins(): number{
        return this.coins;
    }
}