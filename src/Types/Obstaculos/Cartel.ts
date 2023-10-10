import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class Cartel extends Obstaculo{
    constructor(){
        super("Cartel", "Cartel1", 1);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,400,16);
        this.hitbox.endFill();
        this.hitbox.x = -180;
        this.hitbox.y = -220;
        this.addChild(this.hitbox);
    }
}