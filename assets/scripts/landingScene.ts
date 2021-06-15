
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LandingScene')
export class LandingScene extends Component {

    start () {
        
    }

    onSyringeButton(){
        director.loadScene("chooseInjection");
    }

    onPlayButton(){
        director.loadScene("gamePlay");
    }

}
