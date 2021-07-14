
import { _decorator, Component, Node,director, Sprite, tween, Vec3 } from 'cc';
import { ResourceUtils } from '../Common/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {


    @property(Node) gameName : Node = null!;


    start () {
        
        

        
        tween(this.gameName)
        .repeatForever(
            tween()
            .by(0.4, { position: new Vec3(0, +50, 10) }, { easing: 'sineOut'})
            .by(0.4, { position: new Vec3(0, -50, 0) }, { easing: 'sineIn'})
        ).start();
        
        director.preloadScene("landingScene",(err,scene)=>{
            console.log("landingScene scene loaded");
            director.loadScene("landingScene");
            
        });    
    }
}

function interval(interval: any) {
    throw new Error('Function not implemented.');
}
