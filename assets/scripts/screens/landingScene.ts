
import { _decorator, Component, Node, director, Toggle } from 'cc';
import { gameManager } from '../Common/gameManager';
const { ccclass, property } = _decorator;

@ccclass('LandingScene')
export class LandingScene extends Component {

    
    @property(Toggle) music : Toggle = null!;
    @property(Toggle) sound : Toggle = null!;
    

    @property(Node) settingLayer : Node = null!;

    start () {
        this.settingLayer.active = false;
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
        director.loadScene("gamePlay");
    }

}
