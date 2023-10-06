import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./Interfaces/IHitbox";
import { SceneManager } from "../Scenes/SceneManager";
import { Obstaculo } from "./MapMaker";

export class Fuente extends Obstaculo implements IHitbox{
    hitbox: Graphics;
    Visual: Sprite;
    nombre: string;
    constructor(){
        super();

        this.nombre = "Fuente";

        this.Visual = Sprite.from("Fuente1");
        this.Visual.anchor.set(0.5);
        this.addChild(this.Visual);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,32,168,16);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);

        this.tipo = 1;
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}