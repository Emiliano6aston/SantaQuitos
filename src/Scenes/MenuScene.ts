import { Sound, sound } from "@pixi/sound";
import { SceneBase } from "./SceneBase";
import { MainScene } from "./MainScene";
import { Score } from "../Types/Score";
import { SceneManager } from "./SceneManager";
import { button } from "../UI/ButtonBase";
import { Sprite, Text, TextStyle } from "pixi.js";
import { Mosco } from "../Types/SP_Mosquito";

export class MenuScene extends SceneBase{
    a: number = 0;
    b: number = 0;
    musicMenu: Sound;
    musicGame: Sound;

    inGame:boolean = false;
    inMenu:boolean = true;
    OMainScene: any;
    BPlay: button;
    score:Score;
    Title: Text;
    Marco: any;
    mosco1: Mosco;
    mosco2: Mosco;

    constructor(score:Score){
        super();
        this.musicMenu = sound.find("SantaFe1");
        this.musicGame = sound.find("SantaFe2");
        
	    this.musicMenu.volume = 0.1;
	    this.musicMenu.loop = false;
	    this.musicMenu.stop();

        this.musicGame.volume = 0.05;
	    this.musicGame.loop = false;
	    this.musicGame.play();

	    this.score = score;
	    this.OMainScene = new MainScene(this.score, this.musicGame);

        this.Marco = Sprite.from("B_marco");
        this.Marco.scale.set(0.8);
        this.Marco.anchor.set(0.5);
        this.Marco.position.set(SceneManager.WX/2, SceneManager.WY/2);
        this.addChild(this.Marco);

        this.BPlay = new button('Play');
        this.BPlay.position.set(SceneManager.WX / 2, SceneManager.WY / 2);
	    this.addChild(this.BPlay);
        this.BPlay.on("mousedown", this.onMouseDown, this);
        this.BPlay.on("mouseover", this.BPlay.over, this.BPlay);
        this.BPlay.on("mouseleave", this.BPlay.nover, this.BPlay);

        const style1 = new TextStyle({
            fontFamily:"Painterz",
            fill: "White",
            strokeThickness: 1.0,
            fontSize:160,
        });

        this.Title = new Text('SantaQuitos', style1);
        this.Title.anchor.set(0.5);
        this.Title.position.set(SceneManager.WX/2, 150);
        this.addChild(this.Title);

        this.mosco1 = new Mosco();
        this.addChild(this.mosco1);
        this.mosco2 = new Mosco();
        this.mosco2.position.x += 300;
        this.mosco2.position.y -= 300;
        this.addChild(this.mosco2);

    }

    public override update(deltaFrame: number, deltaTime: number): void {

        this.mosco1.update(deltaTime, deltaFrame);
        this.mosco2.update(deltaTime, deltaFrame);
        
        this.a = deltaFrame;
        this.b = deltaTime;

        if (this.inGame){
            this.score.reset();
            SceneManager.changeScene(this.OMainScene);
        }
    }

    public onMouseDown(){
        this.BPlay.press();
        this.score.Tries = 5;
        this.inMenu = false;
        this.inGame = true;
    }

}
