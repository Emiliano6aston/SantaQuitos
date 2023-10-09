import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class Banco extends Obstaculo{
    constructor(){
        super("Banco", "Banco1", 1);

        this.removeChild(this.hitbox);
        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,168,16);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);
    }
}