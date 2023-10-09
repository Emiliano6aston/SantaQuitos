import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "./Interfaces/IHitbox";

//3 fases
//1_ un obstáculo por vez
//2_ tres obstáculos por vez -> aparece obstáculo especial de la zona - aparece un mosquito
//3_ cinco obstáculos por vez -> aparecen dos mosquitos

//7 obstáculos por fase
//5 tipos de obstaculos
//1 -> bancos
//2 -> transito
//3 -> pozos
//4 -> moscos
//5 -> especial mapa


export class Map{
    Obstaculos : Array<Obstaculo>;
    Spawned: Array<Obstaculo>;
    fase: number = 0;
    c_obst: number = 1;
    f_obst: number = 7;
    spawned: number = 0;

    constructor(mapa:String){

        this.Obstaculos = new Array<Obstaculo>;
        this.Spawned = new Array<Obstaculo>;

        // bancos cemento - bicicletero
        if (mapa == "Federal" ){
            this.spawn(1);
        }

    }

    private spawn(tipo:number){
        if (tipo == 0) this.Obstaculos.push();
    }

}

export class Obstaculo extends Container implements IHitbox{
    activo : boolean = true;
    puntaje : number = 0;
    tipo : number = 1; //0 = pj | 1 = plataforma | 2 = obstaculo alto | 3 = obstaculo bajo | 4 = mosquito
    speed: number = 0.1;
    hitbox: Graphics;
    constructor(){
        super();

        this.hitbox = new Graphics();
    }

    // private spawn(wx:number):void{
    //     this.position.x = wx;
    // }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}