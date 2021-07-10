import { AudioClip, AudioSource } from "cc";
import { gameManager } from "./gameManager";


export class SoundManager{

    private static _instance : SoundManager = null!;
    private  _audioSource: AudioSource = null!;
    public static getInstance(){
        if(!SoundManager._instance){
            SoundManager._instance  = new SoundManager();
        }
        return SoundManager._instance;
    }

    init(audioSource : AudioSource){
        this._audioSource  = audioSource;
        console.log("audio source", this._audioSource);
    }

    playSoundEffect(clip : AudioClip){ 

        if(gameManager.getInstance().getSound()){
            this._audioSource.playOneShot(clip, 1);
        }
        

    }


    stopSoundEffect(){
        this._audioSource.stop();
        console.log("stop sound", this._audioSource);
    }


    setEffectVolume(){

    }


    playMusic(loop :boolean){
        if(gameManager.getInstance().getMusic()){
            this._audioSource.loop = loop;
            console.log(" this._audioSource.play()");
            if(!this._audioSource.playing){
                this._audioSource.play();
            }
        }
    }

    stopMusic(){
        this._audioSource.stop();
    }






}