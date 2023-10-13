import { Container, Texture, TilingSprite } from "pixi.js";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { SceneBase } from "./SceneBase";
import { SceneManager } from "./SceneManager";
import { Skater } from "../Types/Personaje";
import * as mosParticle from "../mosquitos.json";
import { sound } from "@pixi/sound";
import { GameUI, Score } from "../Types/Score";
import { MenuScene } from "./MenuScene";
import { Mapa } from "../Types/MapMaker";
import { EndScene } from "./EndScene";
import { Keyboard } from "../Types/Keyboard";

export class MapasScene extends SceneBase{

    private Skater1 : Skater;
    private ground : number;
    private gravity: number;
    worldspeed: number;

    //private Mapa: MapMaker;
    fg0:TilingSprite;
    bg1: TilingSprite;
    bg2: TilingSprite;
    bg3: TilingSprite;
    bg4: TilingSprite;
    moscos: Emitter;
    contMoscos: Container;
    //bancos: Obstaculo[];
    score: Score;
    GameUI: GameUI;
    Mapa: Mapa;

    constructor(score:Score){
        super();

        sound.find("SantaFe2").volume = 0.01;
        if (!sound.find("SantaFe2").isPlaying) sound.find("SantaFe2").play();

        this.score = score;
        //Constantes
        this.ground = 600;
        this.gravity = 0.004;
        this.worldspeed = 0.5;

        this.contMoscos = new Container();
        this.moscos = new Emitter(this.contMoscos, upgradeConfig(mosParticle, Texture.from("Mosco1")));

        //Fondo
        this.fg0 = new TilingSprite(Texture.from("Builds3"), SceneManager.WX,SceneManager.WY);
        //this.bg0.position.y = -256;
        this.fg0.position.y = -150;//Belgrano
        this.fg0.scale.x = 3.0;//Belgrano 3 | Parque 1 | Gobierno 3
        this.fg0.scale.y = 3.0;
        this.addChild(this.fg0);

        this.bg1 = new TilingSprite(Texture.from("Asfalto1"), SceneManager.WX, 128);
        this.bg1.position.y = 480;

        this.bg2 = new TilingSprite(Texture.from("Cesped1"), SceneManager.WX, 64);
        this.bg2.position.y = 420;

        this.bg4 = new TilingSprite(Texture.from("Cesped1"), SceneManager.WX, 64);
        this.bg4.position.y = 570;

        this.bg3 = new TilingSprite(Texture.from("Baldosas1"), SceneManager.WX, 128);
        this.bg3.position.y = 592;

        this.addChild(this.bg2);
        this.addChild(this.bg1);
        this.addChild(this.bg4);
        this.addChild(this.bg3);

        //Obstaculos

        this.Mapa = new Mapa("Belgrano", this.ground);
        this.Mapa.worldspeed = this.worldspeed;
        this.addChild(this.Mapa);

        this.Skater1 = new Skater(this.score);
        this.addChild(this.Skater1);

        //Seteamos los atributos globales en la clase skater
        this.Skater1.gravity = this.gravity;
        this.Skater1.ground = this.ground;
        this.Skater1.worldspeed = this.worldspeed;

        this.contMoscos.position.set(SceneManager.WX+3000,this.ground);
        //this.contMoscos.position.set(0,1000);
        this.addChild(this.contMoscos);

        //UI
        this.GameUI = new GameUI(this.score);
        this.GameUI.T_nombre.text = this.Mapa.mapa.toString();
        this.addChild(this.GameUI);

        //escape key
        Keyboard.down.on("Escape", this.onKeyEsc, this);
    }
    onKeyEsc() {
        sound.find("SantaFe2").stop();
        SceneManager.changeScene(new MenuScene(new Score));
    }

    public update(deltaTime : number, deltaFrame : number) : void{

        //Mapa
        this.Mapa.update(deltaTime, deltaFrame);
        this.Mapa.checkCollision(this.Skater1);
        this.Mapa.worldspeed = this.worldspeed;

        if (this.Skater1.reset){
            this.Skater1.reset = false;
            this.score.Tries -= 1;

            if (this.score.Tries < 0){
                sound.find("SantaFe2").stop();
                SceneManager.changeScene(new EndScene(this.score));
                return;
            }else{
                sound.find("SantaFe2").stop();
                SceneManager.changeScene(new MapasScene(this.score));
            }
        }

        if (this.Mapa.finished){
            sound.find("SantaFe2").stop();
            SceneManager.changeScene(new EndScene(this.score));
        }

        //KillConditions
        if (this.Skater1.position.x > this.contMoscos.position.x -3 && this.Skater1.position.x < this.contMoscos.position.x +3){
            if(this.Skater1.position.y > this.contMoscos.position.y){
                this.Skater1.onFall = true;
            }
        }

        //MoscoLogic
        this.moscos.update(deltaFrame/100);
        this.contMoscos.position.x -= this.worldspeed * deltaTime; 
        if (this.contMoscos.position.x < -100) this.contMoscos.position.x = SceneManager.WX + 3000;

        //World and background
        //Building
        if (this.Skater1.worldspeed < this.worldspeed) this.worldspeed = this.Skater1.worldspeed;

        this.fg0.tilePosition.x -= 0.005 * this.worldspeed * deltaTime;
        //Fondo
        this.bg1.tilePosition.x -= 0.75 * this.worldspeed * deltaTime;
        this.bg2.tilePosition.x -= 0.75 * this.worldspeed * deltaTime;
        this.bg3.tilePosition.x -= this.worldspeed * deltaTime;
        this.bg4.tilePosition.x -= this.worldspeed * deltaTime;

        //Fondo2
        
        //PlayerLogic
        this.Skater1.update(deltaTime, deltaFrame);

        //UI
        this.GameUI.update(deltaTime, deltaFrame);
    }
}
