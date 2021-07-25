
import { _decorator, Component, Node ,director, Label} from 'cc';
import {gameManager , IN_GAME_CURR_OP, SCENE_TYPE, SYRINGE_TYPE} from '../Common/gameManager';
const { ccclass, property } = _decorator;

@ccclass('ChooseInjection')
export class ChooseInjection extends Component {

    _delagateScript: Component | undefined;

    injectionPrice :Array<number> = [100,200,300,400,500,600,700,800,900];

    start () {
        gameManager.getInstance().setSceneType(SCENE_TYPE.SYRINGE_SELECTION); 
    }

    @property(Label)    totalCoins :Label = null!;
    
    setDelegate(delegate: Component){
        this._delagateScript = delegate;
    }

    onInjectionButton(event:any,  customEventData:any){

        let coins:number = gameManager.getInstance().getCoins();
        let injectionPrice:number = this.injectionPrice[parseInt(customEventData)-1] ;

        if(injectionPrice< coins){
            console.log(event, customEventData);
            let syringeType:SYRINGE_TYPE = parseInt(customEventData);
            gameManager.getInstance().setSyringeType(syringeType);

            gameManager.getInstance().setCoins(coins - injectionPrice);
            this._delagateScript!.updateSyringeType(false,"",injectionPrice);
            this.node.active =false;
        }
        else{
            this._delagateScript!.updateSyringeType(true,"No Enough Coins to change chnage injeciton!",0);
        }
        
    }

    onCloseButton(){
        this.node.active = false;
    }

    updateCoins(){
        let coins:number = gameManager.getInstance().getCoins();
        this.totalCoins.string = coins.toString();
    }
}