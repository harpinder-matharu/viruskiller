
import { _decorator, Component, Node,director, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {
    

    @property(Sprite)
    progressbar:Sprite = null!;
    

    start () {

        // let gp = new BlaashGameSDK("hfhdksiuaHb7a677693d2d4e69aafe5c6ee1b2b596en41EEQr7k2ENjdSM3rbz1col21F3Lrw9XEgmhkD5245665499");

        
        

        // let prom2 =  gp.onLevelComplete(1, 100); // error in this
        // prom2.then((val:any)=> {
        //     console.log('onLevelComplete executed: ');
        //     console.log(val);
        // }).catch((err:any) => {
        //     console.log('onLevelComplete executed: ' + err);
        // }).finally(() => {
        //     console.log('onLevelComplete done executing');
        // });
        
        

        // let prom4 =  gp.onGameOver(2, 200);  // error
        // prom4.then((val:any)=> {
        //     console.log('onGameOver executed: ');
        //     console.log(val);
        // }).catch((err:any) => {
        //     console.log('onGameOver executed: ' + err);
        // }).finally(() => {
        //     console.log('onGameOver done executing');
        // });

        

        // 

        // let prom6 =  gp.onPurchase(500); //error
        // prom6.then((val:any)=> {
        //     console.log('onPurchase executed: ');
        //     console.log(val);
        // }).catch((err:any) => {
        //     console.log('onPurchase executed: ' + err);
        // }).finally(() => {
        //     console.log('onPurchase done executing');
        // });


        this.schedule(this.goToLandingScene, 0.1);
    }

    goToLandingScene(){
        this.progressbar.fillRange = this.progressbar.fillRange+ 0.1;
        if(this.progressbar.fillRange >= 1)
        {
            director.loadScene("landingScene");
        }  
    }

}