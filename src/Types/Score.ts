import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { IUpdate } from "./Interfaces/IUpdate";
import { SceneManager } from "../Scenes/SceneManager";

export class Score{
    Scored:number = 0;
    Score:number = 0;
    Timer:number = 0.0;
    Stars:number = 0;
    Tries:number = 5;
    KQuitos:number = 0;
    LastTrick:number = 0; //0 - none | 1 - Ollie | 2 - Flip | 3 - Grind | 4 - KillQuito | 5 - Fall
    Points:number[] = [0,5,75,50,100,-100];
    
    public reset(){
        this.Score = 0;
        this.Scored = 0;
        this.Timer = 0;
        this.Stars = 0;
        this.Tries = 5;
        this.LastTrick = 0;
    }
}

export class GameUI extends Container implements IUpdate{
    score: Score;
    T_tries: Text;
    T_min: Text;
    T_sec: Text;
    T_mili: Text;
    fondo1: any;
    fondo2: Sprite;
    fondo3: Sprite;
    T_score: Text;
    Marco: Sprite;
    constructor(score:Score){
        super();

        this.score = score;
        
        const style1 = new TextStyle({
            fontFamily:"FSA",
            fill: "White",
            strokeThickness: 1.0,
            fontSize:32,
        });

        const style2 = new TextStyle({
            fontFamily:"gomarice_simple_slum",
            strokeThickness: 1.0,
            fontSize:32,
            fill: "White",
        });

        const style3 = new TextStyle({
            fontFamily:"FSA",
            strokeThickness: 1.0,
            fontSize:32,
            fill: "0xFFFA00",
        });

        this.Marco = Sprite.from("B_marco");
        this.Marco.anchor.set(0.5);
        this.Marco.position.set(SceneManager.WX/2, SceneManager.WY/2);
        this.Marco.scale.x = 1.18;
        this.addChild(this.Marco);

        this.fondo1 = Sprite.from("B_basic");
        this.fondo1.position.set(16,32);
        this.fondo1.scale.x = 0.75;
        this.fondo1.scale.y = 0.5;
        this.addChild(this.fondo1);
        this.fondo2 = Sprite.from("B_long");
        this.fondo2.scale.x = 0.5;
        this.fondo2.position.set(SceneManager.WX - this.fondo2.width - 24, 16);
        this.addChild(this.fondo2);
        this.fondo3 = Sprite.from("B_fondo");
        this.fondo3.scale.x = 0.5;
        this.fondo3.scale.y = 0.2;
        this.fondo3.position.set(0, 130);
        this.addChild(this.fondo3);

        this.T_tries = new Text("Intentos: " + this.score.Tries.toString(), style1);
        this.T_tries.position.x = 48;
        this.T_tries.position.y = 48;
        this.addChild(this.T_tries);

        this.T_score = new Text("Puntaje: " + this.score.Score.toString(), style3);
        this.T_score.position.x = 32;
        this.T_score.position.y = 140;
        this.addChild(this.T_score);

        this.T_mili = new Text(this.score.Timer.toString(), style2);
        this.T_mili.position.x = SceneManager.WX - 128;
        this.T_mili.position.y = 32;
        this.T_sec = new Text('00', style2);
        this.T_sec.position.x = SceneManager.WX - 128 - 70;
        this.T_sec.position.y = 32;
        this.T_min = new Text('00', style2);
        this.T_min.position.x = SceneManager.WX - 128 - 70 -70;
        this.T_min.position.y = 32;

        this.addChild(this.T_mili);
        this.addChild(this.T_sec);
        this.addChild(this.T_min);
    }

    private time(){
        let milisegundos = this.score.Timer;
        const minutos = Math.floor(milisegundos/1000/60);
        milisegundos -= minutos * 60 * 1000;
        const segundos = Math.floor(milisegundos / 1000);
        milisegundos = Math.floor(milisegundos % 1000);

        this.T_min.text = minutos;
        this.T_sec.text = segundos;
        this.T_mili.text = milisegundos;
    }

    update(deltaTime: number, _deltaFrame: number): void {
        this.T_tries.text = "Intentos: " + this.score.Tries.toString();
        this.T_score.text = "Puntaje: " + this.score.Scored.toString();

        deltaTime;
        this.time();
    }

}
