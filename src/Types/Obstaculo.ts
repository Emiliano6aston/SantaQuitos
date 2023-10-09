import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./Interfaces/IHitbox";
import { SceneManager } from "../Scenes/SceneManager";

export class Obstaculo extends Container implements IHitbox{
    activo : boolean = true;
    puntaje : number = 0;
    tipo : number = 1; //0 = pj | 1 = plataforma | 2 = obstaculo alto | 3 = obstaculo bajo | 4 = mosquito
    speed: number = 0.1;
    hitbox: Graphics;
    visual: Sprite;
    nombre: string;
    constructor(nombre:string, asset:string, tipo:number){
        super();

        this.hitbox = new Graphics();
        this.nombre = nombre;
        this.tipo = tipo;

        this.visual = Sprite.from(asset);
        this.visual.anchor.set(0.5);
        this.addChild(this.visual);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,8,8);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
        
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}