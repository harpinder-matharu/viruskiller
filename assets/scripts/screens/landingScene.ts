
import { _decorator, Component, Node, director, Toggle, instantiate, Sprite, ProgressBar, Prefab } from 'cc';
import { gameManager } from '../Common/gameManager';
import { ResourceUtils } from '../Common/ResourceUtils';
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

    homeScene : any;

    start () {
        this.settingLayer.active = false;
        this.playButton.active = false;

        let time = 0;
        let interval = setInterval(()=>{
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
            
            clearInterval(interval);
            this.progressbar.fillRange = 100;
            this.progressbar.node.active = false;
            this.progressbarBg.node.active = false;
            this.playButton.active = true;
        
        })
        .catch((error)=>{
        console.log("error while laoding game data",  error);
        });
        
        // director.preloadScene("gamePlay",(err,scene)=>{
        //     console.log("gamePlay scene loaded");
        //     clearInterval(interval);
            
        //     this.progressbar.fillRange = 100;
        //     this.progressbar.node.active = false;
        //     this.progressbarBg.node.active = false;
        //     this.playButton.active = true;
        // });
    }


    onClose(){
        gameManager.getInstance().setSound(!this.sound.isChecked);
        gameManager.getInstance().setMusic(!this.music.isChecked);
        
        console.log(!this.music.isChecked, !this.sound.isChecked);
        this.settingLayer.active = false;
    }


    onSettingsButton(){
        this.settingLayer.active = true;
    }

    onPlayButton(){
        // director.loadScene("gamePlay");

        this.currentGame.active = true;
    }

    onEducation(){
        let prefab = ResourceUtils.getInstance().getGamePrefab("Education" );
        this.currentGame = instantiate(prefab);
        this.currentGame.active = false;
        this.node.addChild( this.currentGame);
    }
}
