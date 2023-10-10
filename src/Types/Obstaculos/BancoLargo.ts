import { SceneManager } from "../../Scenes/SceneManager";
import { Obstaculo } from "../Obstaculo";

export class BancoLargo extends Obstaculo{
    constructor(){
        super("BancoLargo", "Banco2", 1);

        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(0,0,342,16);
        this.hitbox.endFill();
        this.hitbox.x = -208;
        this.hitbox.y = -8;
        this.addChild(this.hitbox);
    }
}