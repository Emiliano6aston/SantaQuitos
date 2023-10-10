import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class Pozo extends Obstaculo{
    constructor(){
        super("Pozo", "Pozo1", 3);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,16,32);
        this.hitbox.endFill();
        this.hitbox.x = -16;
        this.hitbox.y = -16;
        this.addChild(this.hitbox);
    }
}