import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class Cartel extends Obstaculo{
    constructor(){
        super("Cartel", "Cartel1", 1);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,200,16);
        this.hitbox.endFill();
        this.hitbox.x = -96;
        this.hitbox.y = -128;
        this.addChild(this.hitbox);
    }
}