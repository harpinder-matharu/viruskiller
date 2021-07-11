
import { _decorator, Component, Node,director, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SplashScreen')
export class SplashScreen extends Component {
    

    @property(Sprite)
    progressbar:Sprite = null!;
    

    start () {

        // let gp = new BlaashGameSDK("hfhdksiuaHb7a677693d2d4e69aafe5c6ee1b2b596en41EEQr7k2ENjdSM3rbz1col21F3Lrw9XEgmhkD5245665499");
        // console.log(gp);
        // let data:any = gp.onGameStart();
        // console.log(data);
        // console.log(JSON.stringify(data));

        // gp.onGameStart()
        // .then((data:any)=>{
        //     console.log(data);
        // })
        // .catch((error:any)=>{
        //     console.log("error while laoding game data",  error);
        // });
        
        // let prom =  gp.onGameStart();
        // prom.then((val) => {
        //     console.log('asynchronously executed: ' + val);
        //   }).catch((err) => {
        //     console.log('asynchronously executed: ' + err);
        //   }).finally(() => {
        //     console.log('promise done executing');
        //   });

        // fetch(gp.onGameStart(), {
        //     mode: "no-cors"
        // }).then((data:any)=>{
        //     console.log(data);
        // })
        // .catch((error:any)=>{
        //     console.log("error while laoding game data",  error);
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