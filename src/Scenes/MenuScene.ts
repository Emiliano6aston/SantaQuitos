import { Sound, sound } from "@pixi/sound";
import { SceneBase } from "./SceneBase";
import { Score } from "../Types/Score";
import { SceneManager } from "./SceneManager";
import { button } from "../UI/ButtonBase";
import { Sprite, Text, TextStyle } from "pixi.js";
import { Mosco } from "../Types/SP_Mosquito";
import { MapasScene } from "./MapasScene";
import { ProtoScene } from "./ProtoScene";

export class MenuScene extends SceneBase{
    a: number = 0;
    b: number = 0;
    musicMenu: Sound;

    inGame:boolean = false;
    inMenu:boolean = true;
    BPlay: button;
    score:Score;
    Title: Text;
    Marco: any;
    mosco1: Mosco;
    mosco2: Mosco;
    BPlay2: button;

    constructor(score:Score){
        super();
        this.musicMenu = sound.find("SantaFe1");
	    this.musicMenu.volume = 0.1;
	    this.musicMenu.loop = false;
	    this.musicMenu.play();

	    this.score = score;

        this.Marco = Sprite.from("B_marco");
        this.Marco.scale.set(0.8);
        this.Marco.anchor.set(0.5);
        this.Marco.position.set(SceneManager.WX/2, SceneManager.WY/2);
        this.addChild(this.Marco);

        this.BPlay = new button('Play');
        this.BPlay.position.set(SceneManager.WX / 2, SceneManager.WY / 2);
	    this.addChild(this.BPlay);
        this.BPlay.on("mousedown", this.onPlay, this);
        this.BPlay.on("mouseover", this.BPlay.over, this.BPlay);
        this.BPlay.on("mouseleave", this.BPlay.nover, this.BPlay);

        
        this.BPlay2 = new button('Proto');
        this.BPlay2.position.set(SceneManager.WX / 2, SceneManager.WY / 2 + 150);
	    this.addChild(this.BPlay2);
        this.BPlay2.on("mousedown", this.onProto, this);
        this.BPlay2.on("mouseover", this.BPlay2.over, this.BPlay2);
        this.BPlay2.on("mouseleave", this.BPlay2.nover, this.BPlay2);

        const SPainter = new TextStyle({
            fontFamily:"Painterz",
            fill: "White",
            strokeThickness: 1.0,
            fontSize:160,
        });

        this.Title = new Text('SantaQuitos', SPainter);
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
            this.musicMenu.stop();
            SceneManager.changeScene(new MapasScene(this.score));
        }
    }

    public onPlay(){
        this.BPlay.press();
        this.score.Tries = 5;
        this.inMenu = false;
        this.inGame = true;
    }

    public onProto(){
        this.BPlay2.press();
        this.score.Tries = 5;
        this.inMenu = false;
        this.inGame = true;
        this.musicMenu.stop();
        SceneManager.changeScene(new ProtoScene(this.score));
    }

}
