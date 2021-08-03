
import { _decorator, Component, Node,director, Sprite, tween, Vec3 } from 'cc';
import { gameManager } from '../Common/gameManager';
import { ResourceUtils } from '../Common/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {


    @property(Node) gameName : Node = null!;


    start () {
        
        if(gameManager.getInstance().isWebBuild){
            var parameters  =   new URL(window.location.toString()).searchParams;
            var token       =   parameters.get("token");
            console.log({token});
            if(token){
                console.log("check 1");
                gameManager.getInstance().setToken(token!);
            }
            else{
                console.log("check 2");
                gameManager.getInstance().setToken("LVAOHCHurk35bb1f0b844b493199316b6b2e8b7dc5jfvVfOe3bm5oEvY9yn0Ar9FUPLAvpMzu7HPb8XRwTENANT1234lkjhiuhhnj");
            }
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
