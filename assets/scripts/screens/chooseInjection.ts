
import { _decorator, Component, Node ,director} from 'cc';
import {gameManager , IN_GAME_CURR_OP, SCENE_TYPE, SYRINGE_TYPE} from '../Common/gameManager';
const { ccclass, property } = _decorator;

@ccclass('ChooseInjection')
export class ChooseInjection extends Component {

    start () {
        gameManager.getInstance().setSceneType(SCENE_TYPE.SYRINGE_SELECTION);
        
    }

    onInjectionButton(event:any,  customEventData:any){
        console.log(event, customEventData);
        let syringeType:SYRINGE_TYPE = parseInt(customEventData);
        gameManager.getInstance().setSyringeType(syringeType);
    }

    onBackButton(){
        director.loadScene("landingScene");
    }
}

