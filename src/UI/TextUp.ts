import { Container, Text, TextStyle } from "pixi.js";
import { IUpdate } from "../Types/Interfaces/IUpdate";

export class TextUp extends Container implements IUpdate{
    T: Text;
    speed: number = 0.01;

    constructor(texto:string){
        super();

        const style = new TextStyle({
            fontFamily:"FSA",
            fill: "White",
            strokeThickness: 3.0,
            fontSize:32,
        });

        this.T = new Text(texto, style);
        this.addChild(this.T);
    }
    update(deltaTime: number, _deltaFrame: number): void {
        
        this.T.position.y -= this.speed * deltaTime;
    }

}