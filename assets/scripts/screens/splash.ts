
import { _decorator, Component, Node,director, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {
    

    @property(Sprite)
    progressbar:Sprite = null!;
    

    start () {
        this.schedule(this.goToLandingScene, 0.1);
    }

    goToLandingScene(){
        this.progressbar.fillRange = this.progressbar.fillRange+ 0.1;
        if(this.progressbar.fillRange >= 1)
        {
            director.loadScene("landingScene");
        }  
    }

}