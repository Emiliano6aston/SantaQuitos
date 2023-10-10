import { IUpdate } from "./Interfaces/IUpdate";
import { Obstaculo } from "./Obstaculo";
import { Banco } from "./Obstaculos/Banco";
import { Bicicletero } from "./Obstaculos/Bicicletero";
import { Pilar } from "./Obstaculos/Pilar";
import { Skater } from "./Personaje";
import { checkCollision } from "./Interfaces/IHitbox";
import { Container } from "pixi.js";
import { SceneManager } from "../Scenes/SceneManager";
import { BancoLargo } from "./Obstaculos/BancoLargo";
import { Cartel } from "./Obstaculos/Cartel";

export class Mapa extends Container implements IUpdate{
    mapa : String;
    nextmap: String;
    Obstaculos : Array<Obstaculo>;
    Spawned: Array<Obstaculo>;
    c_obst: number = 0;
    f_obst: number = 5;
    sp_time: number = 2;
    faset: number = 2;
    spawned: number = 0;
    timer: number = 0;
    finished: boolean = false;
    worldspeed: number = 0;
    ground: number = 0;
    sp: boolean = false;
    endwave: number;

    constructor(mapa:String, ground:number){
        super();

        this.Obstaculos = new Array<Obstaculo>;
        this.Spawned = new Array<Obstaculo>;
        this.mapa = mapa;
        this.ground = ground;
        this.endwave = SceneManager.WX;
        this.nextmap = mapa;

        if (mapa == "Belgrano" ){ // obstaculos: bancos cemento - bicicletero - pilar alto
            const pilar1 = new Pilar();
            pilar1.scale.set(0.5);
            pilar1.position.y = this.ground;
            pilar1.startp = 1600;
            this.set(pilar1);

            const pilar2 = new Pilar();
            pilar2.scale.set(0.5);
            pilar2.position.y = this.ground;
            pilar2.startp = 1600;
            this.set(pilar2);

            const banco1 = new BancoLargo();
            banco1.position.y = this.ground;
            banco1.startp = 1400;
            this.set(banco1);

            const banco2 = new Banco();
            banco2.position.y = this.ground;
            banco2.startp = 2300;
            this.set(banco2);

            const especial1 = new Cartel();
            especial1.scale.x = 0.5;
            especial1.scale.y = 0.4;
            especial1.position.y = this.ground - 32;
            especial1.startp = 1800;
            this.set(especial1);

            const bicic1 = new Bicicletero();
            bicic1.position.y = this.ground;
            bicic1.startp = 2500;
            this.set(bicic1);

            this.f_obst = this.Obstaculos.length;
            this.sp = true;
            this.endwave = 0;
            this.faset = 3;
            this.nextmap = "End"
        }
    }

    update(deltaTime: number, _deltaFrame: number): void {
        this.timer += deltaTime;

        this.endwave -= this.worldspeed * deltaTime;

        if (this.mapa == "Belgrano") this.Belgrano();
        for (let O of this.Spawned){
            O.position.x -= this.worldspeed * deltaTime;
            if (this.endwave < -500) {
                O.restart();
            }
        }
        if (this.endwave < -500) this.endwave = 2000;
        if (this.finished){
            this.Spawned = new Array<Obstaculo>;
        }
    }

    private set(obst:Obstaculo){
        this.Obstaculos.push(obst);
    }

    private add(obst:Obstaculo){
        obst.vis = true;
        this.Spawned.push(obst);
        this.addChild(obst);
    }
    
    Belgrano():void{
        //0 - bola | 1 - banco | 2 - fuente
        if (this.sp && (this.c_obst < this.f_obst)){
            this.sp = false;
            this.add(this.Obstaculos[this.c_obst]);
            this.c_obst += 1;
        }
        if (this.timer > this.sp_time*1000 && (this.c_obst < this.f_obst)){
            if (this.Obstaculos.length > this.c_obst){
                this.add(this.Obstaculos[this.c_obst]);
                this.c_obst += 1;
                this.sp_time += this.faset;
            }
        }
    }

    checkCollision(player:Skater):void{
        for (let O of this.Spawned){
            if (O.vis){
                const c = checkCollision(player, O);
                if (c!= null) player.checkCollision(c, O);
            }
        }
    }
}