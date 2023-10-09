import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class Fuente extends Obstaculo{
    constructor(){
        super("Fuente", "Fuente1", 1);

        this.removeChild(this.hitbox);
        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,32,168,16);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);
    }
}