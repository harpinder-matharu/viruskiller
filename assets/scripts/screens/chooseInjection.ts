
import { _decorator, Component, Node ,director, Label} from 'cc';
import {gameManager , IN_GAME_CURR_OP, SCENE_TYPE, SYRINGE_TYPE} from '../Common/gameManager';
const { ccclass, property } = _decorator;

@ccclass('ChooseInjection')
export class ChooseInjection extends Component {

    _delagateScript: Component | undefined;

    start () {
        gameManager.getInstance().setSceneType(SCENE_TYPE.SYRINGE_SELECTION);
        
    }

    @property(Label)    totalCoins :Label = null!;
    
    setDelegate(delegate: Component){
        this._delagateScript = delegate;
    }

    onInjectionButton(event:any,  customEventData:any){
        console.log(event, customEventData);
        let syringeType:SYRINGE_TYPE = parseInt(customEventData);

        
        gameManager.getInstance().setSyringeType(syringeType);
        this._delagateScript!.updateSyringeType();
        this.node.active =false;
    }



    onCloseButton(){
        this.node.active = false;
    }
}

