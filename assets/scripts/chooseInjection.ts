
import { _decorator, Component, Node ,director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChooseInjection')
export class ChooseInjection extends Component {

    start () {
        
    }

    onInjectionButton(event:any,  customEventData:any){
        console.log(event, customEventData);
    }
}

