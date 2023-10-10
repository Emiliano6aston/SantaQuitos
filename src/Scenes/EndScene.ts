import { SceneBase } from "./SceneBase";
import { Score } from "../Types/Score";
import { SceneManager } from "./SceneManager";
import { button } from "../UI/ButtonBase";
import { Sprite, Text, TextStyle } from "pixi.js";
import { Mosco } from "../Types/SP_Mosquito";
import { MenuScene } from "./MenuScene";

export class EndScene extends SceneBase{
    
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
	    this.score = score;

        this.Marco = Sprite.from("B_marco");
        this.Marco.scale.set(0.7);
        this.Marco.anchor.set(0.5);
        this.Marco.position.set(SceneManager.WX/2, SceneManager.WY/2);
        this.addChild(this.Marco);

        this.BPlay = new button('Menu');
        this.BPlay.position.set(SceneManager.WX / 2, SceneManager.WY / 2 + 200);
	    this.addChild(this.BPlay);
        this.BPlay.on("mousedown", this.onMouseDown, this);
        this.BPlay.on("mouseover", this.BPlay.over, this.BPlay);
        this.BPlay.on("mouseleave", this.BPlay.nover, this.BPlay);

        const SPainter = new TextStyle({
            fontFamily:"Painterz",
            fill: "White",
            strokeThickness: 1.0,
            fontSize:160,
        });

        this.Title = new Text('GameOver', SPainter);
        this.Title.anchor.set(0.5);
        this.Title.position.set(SceneManager.WX/2, SceneManager.WY/2);
        this.addChild(this.Title);

        this.mosco1 = new Mosco();
        this.addChild(this.mosco1);
        this.mosco2 = new Mosco();
        this.mosco2.position.x += 300;
        this.mosco2.position.y -= 300;
        this.addChild(this.mosco2);
    }

    public update(deltaFrame: number, deltaTime: number): void {
        this.mosco1.update(deltaTime, deltaFrame);
        this.mosco2.update(deltaTime, deltaFrame);
    }

    onMouseDown() {
        this.OMainScene = new MenuScene(this.score);
        SceneManager.changeScene(this.OMainScene);
    }
}