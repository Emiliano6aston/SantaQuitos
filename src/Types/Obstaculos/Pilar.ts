import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class Pilar extends Obstaculo{
    constructor(){
        super("Pilar", "Pilar1", 2);

        this.removeChild(this.hitbox);
        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(70,-50,60,160);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);
    }
}