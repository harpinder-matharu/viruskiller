
import { _decorator, Component, Node,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {
    

    start () {
        this.schedule(this.goToLandingScene, 10);
    }

    goToLandingScene(){
        director.loadScene("landingScene");
    }

}