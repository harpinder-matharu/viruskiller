
import { _decorator, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleInjections')
export class ToggleInjections extends Component {
    
    @property(Toggle) injection1 : Toggle = null!;
    @property(Toggle) injection2 : Toggle = null!;
    @property(Toggle) injection3 : Toggle = null!;

    start () {
        
    }

    injectionsFired(num:number){
        switch(num){
            case 1:{
                this.injection3.isChecked = false;
            }
            break;
            case 2:{
                this.injection2.isChecked = false;
            }
            break;
            case 3:{
                this.injection1.isChecked = false;
            }
            break;
        }
    }

    enableAllToggleInjections(){
        this.injection1.isChecked = true;
        this.injection2.isChecked = true;
        this.injection3.isChecked = true;
    }
}

