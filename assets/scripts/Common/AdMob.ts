
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Admob')
export class Admob extends Component {
    

    start () {
        // this.admobInit();
    }

    admobInit() {
        var self = this;
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name:any) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                },
                adViewDidFailToReceiveAdWithError: function(name:any, msg:any) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                },
                adViewWillPresentScreen: function(name:any) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function(name:any) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                },
                adViewWillDismissScreen: function(name:any) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                },
                adViewWillLeaveApplication: function(name:any) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                }
            });
            sdkbox.PluginAdMob.init();
    }

    cacheInterstitial() {
        sdkbox.PluginAdMob.cache('reward');
    }

    showInterstitial() {
        sdkbox.PluginAdMob.show('reward');
    }

    showInfo(msg:string){
        console.log(msg);
    }
}

