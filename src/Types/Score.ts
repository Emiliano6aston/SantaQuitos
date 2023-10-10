import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { IUpdate } from "./Interfaces/IUpdate";
import { SceneManager } from "../Scenes/SceneManager";
import { TextUp } from "../UI/TextUp";

export class Score{
    Mapa:string = "Federal";
    Scored:number = 0;
    Score:number = 0;
    Timer:number = 0.0;
    Stars:number = 0;
    Tries:number = 5;
    KQuitos:number = 0;
    LastTrick:number = 0; //0 - none | 1 - Ollie | 2 - Flip | 3 - Grind | 4 - KillQuito | 5 - Fall
    TrickRep:number = 0;
    Points:number[] = [0,5,75,50,100,-100];
    
    public reset(){
        this.Mapa = "Federal";
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
    T_score: Text;
    T_nombre: Text;
    fondo1: any;
    fondo2: Sprite;
    fondo3: Sprite;
    Marco: Sprite;
    fondo4: Sprite;
    T_counter: TextUp;
    constructor(score:Score){
        super();

        this.score = score;

        const SPainter = new TextStyle({
            fontFamily:"Painterz",
            fill: "White",
            strokeThickness: 1.0,
            fontSize:80,
        });
        
        const Sfsa = new TextStyle({
            fontFamily:"FSA",
            fill: "White",
            strokeThickness: 1.0,
            fontSize:32,
        });

        const Swhite = new TextStyle({
            fontFamily:"gomarice_simple_slum",
            strokeThickness: 1.0,
            fontSize:32,
            fill: "White",
        });

        const Sblack = new TextStyle({
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
        this.fondo4 = Sprite.from("B_fondo");
        this.fondo4.anchor.set(0.5);
        this.fondo4.scale.x = 0.5;
        this.fondo4.scale.y = 0.2;
        this.fondo4.position.set(SceneManager.WX/2, 32);
        this.addChild(this.fondo4);

        this.T_nombre = new Text(this.score.Mapa, SPainter);
        this.T_nombre.anchor.set(0.5);
        this.T_nombre.position.x = SceneManager.WX/2;
        this.T_nombre.position.y = 32 ;
        this.addChild(this.T_nombre);

        this.T_tries = new Text("Intentos: " + this.score.Tries.toString(), Sfsa);
        this.T_tries.position.x = 48;
        this.T_tries.position.y = 48;
        this.addChild(this.T_tries);

        this.T_score = new Text("Puntaje: " + this.score.Score.toString(), Sblack);
        this.T_score.position.x = 32;
        this.T_score.position.y = 140;
        this.addChild(this.T_score);

        this.T_mili = new Text(this.score.Timer.toString(), Swhite);
        this.T_mili.position.x = SceneManager.WX - 128;
        this.T_mili.position.y = 32;
        this.T_sec = new Text('00', Swhite);
        this.T_sec.position.x = SceneManager.WX - 128 - 70;
        this.T_sec.position.y = 32;
        this.T_min = new Text('00', Swhite);
        this.T_min.position.x = SceneManager.WX - 128 - 70 -70;
        this.T_min.position.y = 32;
        
        this.addChild(this.T_mili);
        this.addChild(this.T_sec);
        this.addChild(this.T_min);

        this.T_counter = new TextUp("");
        this.T_counter.position.x = SceneManager.WX - this.T_counter.width - 128;
        this.T_counter.position.y = 128;
        this.addChild(this.T_counter);

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

        this.T_counter.update(deltaTime, _deltaFrame);

        if (this.)

    }

}
