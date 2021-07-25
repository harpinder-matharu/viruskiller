
import { _decorator, Component, Node, director, Toggle, instantiate, Sprite, ProgressBar, Prefab, AudioSource } from 'cc';
import { gameManager } from '../Common/gameManager';
import { ResourceUtils } from '../Common/ResourceUtils';
import { SoundManager } from '../Common/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('LandingScene')
export class LandingScene extends Component {

    
    @property(Toggle) music : Toggle = null!;
    @property(Toggle) sound : Toggle = null!;
    @property(Sprite) progressbar:Sprite = null!;
    @property(Sprite) progressbarBg:Sprite = null!;

    @property(Node) settingLayer : Node = null!;
    @property(Node) playButton : Node = null!;
    
    currentGame:Prefab|any  = null!;
    interval:any;

    initialDataFetched :Boolean = false;
    initialResourcesFetched :Boolean = false;

    homeScene : any;

    enableAPIs :Boolean = false;
    APIObject:any;

    start () {

        if(gameManager.getInstance().getToken()){
            this.enableAPIs = true;
        }
        if(this.enableAPIs){
            this.initBlaashGameSDK();
            this.onGameStart();
        }

        SoundManager.getInstance().init(this.node.getComponent(AudioSource)!);
        this.settingLayer.active = false;
        this.playButton.active = false;

        let time = 0;
        this.interval = setInterval(()=>{
        time += 100;
        
        if(this.progressbar){
            this.progressbar.fillRange = Math.min(time/ 2000, 0.95) ;
            console.log("inside this", this.progressbar.fillRange );
        }
        }, 2000);

        ResourceUtils.getInstance().loadGameResources("virusKiller")
        .then((data)=>{
        console.log("data has been loaded");

            let prefab = ResourceUtils.getInstance().getGamePrefab("virusKiller" );
            this.currentGame = instantiate(prefab);
            this.currentGame.active = false;
            this.node.addChild( this.currentGame);

            let clip = ResourceUtils.getInstance().getGameResources("virusKiller", "music");
            if(clip){
                this.node.getComponent(AudioSource)!.clip = clip;
                SoundManager.getInstance().playMusic(true);
            }
            
            this.initialResourcesFetched = true;
        
        })
        .catch((error)=>{
        console.log("error while laoding game data",  error);
        });

        this.schedule(this.checkAllDataFetched,1);
    }

    checkAllDataFetched(){
        if(this.initialResourcesFetched && this.initialDataFetched){
            clearInterval(this.interval);
            this.progressbar.fillRange = 100;
            this.progressbar.node.active = false;
            this.progressbarBg.node.active = false;
            this.playButton.active = true;
        }
    }


    onClose(){
        gameManager.getInstance().setSound(!this.sound.isChecked);
        gameManager.getInstance().setMusic(!this.music.isChecked);
        
        console.log(!this.music.isChecked, !this.sound.isChecked);
        this.settingLayer.active = false;

        if(this.music.isChecked){
            SoundManager.getInstance().stopMusic();
        }
    }


    onSettingsButton(){
        this.settingLayer.active = true;
    }

    onPlayButton(){
        // director.loadScene("gamePlay");

        this.currentGame.active = true;
    }

    initBlaashGameSDK(){
        // this.APIObject = new BlaashGameSDK("hfhdksiuaHb7a677693d2d4e69aafe5c6ee1b2b596en41EEQr7k2ENjdSM3rbz1col21F3Lrw9XEgmhkD5245665499");

        this.APIObject = new BlaashGameSDK(gameManager.getInstance().getToken());
    }

    onGameStart(){
        let prom1 =  this.APIObject.onGameStart();
        prom1.then((val:any)=> {
            console.log('onGameStart executed: ');
            console.log(val);
            console.log("Info : ",val.RewardID,val.RewardLevel,val.RewardText);
            gameManager.getInstance().setRewardDetails(val.RewardID, val.RewardLevel, val.RewardText);
            // this.RewardID = val.RewardID;
            // this.RewardLevel = val.RewardLevel;
            // this.RewardText = val.RewardText;
            gameManager.getInstance().setCoins(val.CurrentScore);
            
            this.initialDataFetched = true;
          }).catch((err:any) => {
            console.log('onGameStart executed: ' + err);
          }).finally(() => {
            console.log('onGameStart done executing');
          });
    }
}
