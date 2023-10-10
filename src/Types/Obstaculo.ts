import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./Interfaces/IHitbox";

export class Obstaculo extends Container implements IHitbox{
    activo : boolean = true;
    puntaje : number = 0;
    startp:number = 0;
    tipo : number = 1; //0 = pj | 1 = plataforma | 2 = obstaculo alto | 3 = obstaculo bajo | 4 = mosquito
    speed: number = 0.1;
    hitbox: Graphics;
    visual: Sprite;
    nombre: string;
    vis: boolean;
    constructor(nombre:string, asset:string, tipo:number){
        super();

        this.position.x = -500;

        this.hitbox = new Graphics();
        this.nombre = nombre;
        this.tipo = tipo;
        this.vis = false;

        this.visual = Sprite.from(asset);
        this.visual.anchor.set(0.5);
        this.addChild(this.visual);
        
    }

    restart(){
        this.position.x = this.startp;
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}