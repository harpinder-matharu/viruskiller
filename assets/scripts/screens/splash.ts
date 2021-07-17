
import { _decorator, Component, Node,director, Sprite, tween, Vec3 } from 'cc';
import { gameManager } from '../Common/gameManager';
import { ResourceUtils } from '../Common/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {


    @property(Node) gameName : Node = null!;


    start () {
        
        var parameters  =   new URL(window.location.toString()).searchParams;
        var token       =   parameters.get("token");
        if(token){
            gameManager.getInstance().setToken(token!);
        }
        else{
            gameManager.getInstance().setToken("hfhdksiuaHb7a677693d2d4e69aafe5c6ee1b2b596en41EEQr7k2ENjdSM3rbz1col21F3Lrw9XEgmhkD5245665499");
        }


        
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
