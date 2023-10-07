import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "./Interfaces/IHitbox";


export class MapMaker{
    Obstaculos : Array<Obstaculo>;
    constructor(){

        this.Obstaculos = new Array<Obstaculo>;
        this.Obstaculos[0] = new Obstaculo();

    }

}

export class Obstaculo extends Container implements IHitbox{
    activo : boolean = true;
    puntaje : number = 0;
    tipo : number = 1; //0 = pj | 1 = plataforma | 2 = obstaculo | 3 = mosquitos
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