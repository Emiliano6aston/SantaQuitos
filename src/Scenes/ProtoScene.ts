import { Texture, TilingSprite } from "pixi.js";
//import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import { checkCollision } from "../Types/Interfaces/IHitbox";
import { SceneBase } from "./SceneBase";
import { SceneManager } from "./SceneManager";
import { Skater } from "../Types/Personaje";
import { Banco } from "../Types/Obstaculos/Banco";
import { Fuente } from "../Types/Obstaculos/Fuente";
import { Pilar } from "../Types/Obstaculos/Pilar";
import { BolaT } from "../Types/Obstaculos/BolaTransito";
import { Bicicletero } from "../Types/Obstaculos/Bicicletero";

//import * as mosParticle from "../mosquitos.json";
import { sound } from "@pixi/sound";
import { GameUI, Score } from "../Types/Score";
import { MenuScene } from "./MenuScene";
import { Pozo } from "../Types/Obstaculos/Pozo";
import { Obstaculo } from "../Types/Obstaculo";
import { Keyboard } from "../Types/Keyboard";

export class ProtoScene extends SceneBase{

    private Skater1 : Skater;
    private ground : number;
    private gravity: number;
    worldspeed: number;

    //private Mapa: MapMaker;
    bg0:TilingSprite;
    bg1: TilingSprite;
    bg2: TilingSprite;
    bg3: TilingSprite;
    bg4: TilingSprite;
    //moscos: Emitter;
    //contMoscos: Container;
    bancos: Obstaculo[];
    score: Score;
    GameUI: GameUI;

    constructor(score:Score){
        super();

        if (!sound.find("SantaFe1").isPlaying) sound.find("SantaFe1").play();
        sound.find("SantaFe1").volume = 0.1;

        this.score = score;
        //Constantes
        this.ground = 600;
        this.gravity = 0.004;
        this.worldspeed = 0.5;

        //this.contMoscos = new Container();
        //this.moscos = new Emitter(this.contMoscos, upgradeConfig(mosParticle, Texture.from("Mosco1")));

        //Fondo
        this.bg0 = new TilingSprite(Texture.from("Builds1"), SceneManager.WX,SceneManager.WY);
        //this.bg0.position.y = -256;
        this.bg0.position.y = -150;//Belgrano
        this.bg0.scale.x = 3.0;//Belgrano 3 | Parque 1 | Gobierno 3
        this.bg0.scale.y = 3.0;
        this.addChild(this.bg0);

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

        //this.Mapa = new MapMaker();

        this.bancos = [];
        const banco1 = new Banco();
        banco1.position.x = 500;
        banco1.position.y = this.ground;
        this.addChild(banco1);
        this.bancos.push(banco1);

        const banco2 = new Banco();
        banco2.position.x = 1000;
        banco2.position.y = this.ground;
        this.addChild(banco2);
        this.bancos.push(banco2);

        const fuente1 = new Fuente();
        fuente1.position.x = 1500;
        fuente1.position.y = this.ground - 100;
        this.addChild(fuente1);
        this.bancos.push(fuente1);

        const bicic1 = new Bicicletero();
        bicic1.position.x = 750;
        bicic1.position.y = this.ground;
        this.addChild(bicic1);
        this.bancos.push(bicic1);
        
        const bola1 = new BolaT();
        bola1.position.x = 100;
        bola1.position.y = this.ground + 20;
        this.addChild(bola1);
        this.bancos.push(bola1);

        const pozo1 = new Pozo();
        pozo1.scale.set(0.7);
        pozo1.position.x = 1200;
        pozo1.position.y = this.ground + 80;
        this.addChild(pozo1);
        this.bancos.push(pozo1);

        const pilar1 = new Pilar();
        pilar1.scale.set(0.5);
        pilar1.position.x = 1800;
        pilar1.position.y = this.ground - 20;
        this.addChild(pilar1);
        this.bancos.push(pilar1);

        this.Skater1 = new Skater(this.score);
        this.addChild(this.Skater1);

        //Seteamos los atributos globales en la clase skater
        this.Skater1.gravity = this.gravity;
        this.Skater1.ground = this.ground;
        this.Skater1.worldspeed = this.worldspeed;

        

        //this.contMoscos.position.set(SceneManager.WX+100,this.ground);
        //this.addChild(this.contMoscos);

        //UI
        this.GameUI = new GameUI(this.score);
        this.addChild(this.GameUI);

        Keyboard.down.on("Escape", this.onKeyEsc, this);
    }
    onKeyEsc(){
        sound.find("SantaFe1").stop();
        SceneManager.changeScene(new MenuScene(new Score));
    }

    public update(deltaTime : number, deltaFrame : number) : void{

        if (this.Skater1.reset){
            this.Skater1.reset = false;
            this.score.Tries -= 1;

            if (this.score.Tries < 0){
                sound.find("SantaFe1").stop();
                SceneManager.changeScene(new MenuScene(this.score));
                return;
            }else{
                SceneManager.changeScene(new ProtoScene(this.score));
            }
        }

        //KillConditions
        // if (this.Skater1.position.x > this.contMoscos.position.x -3 && this.Skater1.position.x < this.contMoscos.position.x +3){
        //     if(this.Skater1.position.y > this.contMoscos.position.y){
        //         this.Skater1.onFall = true;
        //     }
        // }

        // //MoscoLogic
        // this.moscos.update(deltaFrame/100);
        // this.contMoscos.position.x -= this.worldspeed * deltaTime; 
        // if (this.contMoscos.position.x < -100) this.contMoscos.position.x = SceneManager.WX + 1000;

        //CheckCollisions
        for (let B of this.bancos){

            //check collisions
            const c = checkCollision(this.Skater1 , B);
            if (c != null) this.Skater1.checkCollision(c, B);
            
            //Physics
            B.position.x -= this.worldspeed * deltaTime;
            if (B.position.x < -720){
                B.position.x = 1500;
            }
        }

        //World and background
        //Building
        if (this.Skater1.worldspeed < this.worldspeed) this.worldspeed = this.Skater1.worldspeed;

        this.bg0.tilePosition.x -= 0.005 * this.worldspeed * deltaTime;
        //Fondo
        this.bg1.tilePosition.x -= 0.75 * this.worldspeed * deltaTime;
        this.bg2.tilePosition.x -= 0.75 * this.worldspeed * deltaTime;
        this.bg3.tilePosition.x -= this.worldspeed * deltaTime;
        this.bg4.tilePosition.x -= this.worldspeed * deltaTime;
        
        //PlayerLogic
        this.Skater1.update(deltaTime, deltaFrame);

        //UI
        this.GameUI.update(deltaTime, deltaFrame);
    }
}
