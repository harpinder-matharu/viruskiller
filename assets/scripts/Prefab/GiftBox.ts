
import { _decorator, Component, Node, Label,Animation, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GiftBox')
export class GiftBox extends Component {
   
    @property(Label)    cuponDiscount :Label = null!;
    @property(Sprite)   cupon :Sprite = null!;
    @property(Sprite)   box   :Sprite = null!;
    
    start () {
        
    }

    setDiscountValue(discount:string){
        this.cuponDiscount.string = discount;
    }

    playAnimation(discount:string){
        this.cuponDiscount.string = discount;
        this.box!.getComponent(Animation)?.play();
        this.cupon!.getComponent(Animation)?.play();
    }
}
