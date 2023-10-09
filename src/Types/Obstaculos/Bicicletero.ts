import { Sprite } from "pixi.js";
import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../MapMaker";

export class Bicicletero extends Obstaculo{
    Visual: Sprite;
    nombre: string;
    constructor(){
        super();

        this.nombre = "Bicic";

        this.Visual = Sprite.from("Bicic1");
        this.Visual.anchor.set(0.5);
        this.addChild(this.Visual);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(64,-20,30,20);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);
        this.tipo = 2;
    }
}