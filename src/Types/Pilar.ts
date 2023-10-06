import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./Interfaces/IHitbox";
import { SceneManager } from "../Scenes/SceneManager";
import { Obstaculo } from "./MapMaker";

export class Pilar extends Obstaculo implements IHitbox{
    hitbox: Graphics;
    Visual: Sprite;
    nombre: string;
    constructor(){
        super();

        this.nombre = "Pilar";

        this.Visual = Sprite.from("Pilar1");
        this.Visual.anchor.set(0.5);
        this.addChild(this.Visual);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(48,-80,96,160);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);
        this.tipo = 2;
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}