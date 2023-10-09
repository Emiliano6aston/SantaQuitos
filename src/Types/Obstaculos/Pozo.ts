import { Sprite } from "pixi.js";
import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../MapMaker";

export class Pozo extends Obstaculo{
    Visual: Sprite;
    nombre: string;
    constructor(){
        super();

        this.nombre = "Pozo";

        this.Visual = Sprite.from("Pozo1");
        this.Visual.anchor.set(0.5);
        this.addChild(this.Visual);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,64,32);
        this.hitbox.endFill();
        this.hitbox.x = 0;
        this.hitbox.y = -16;
        this.addChild(this.hitbox);
        this.tipo = 3;
    }
}