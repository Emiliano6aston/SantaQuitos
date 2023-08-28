import { Container } from "pixi.js";
import { IUpdate } from "../Types/IUpdate";
import { Skater } from "../Types/Personaje";
import { WX } from "..";

export class MainScene extends Container implements IUpdate{

    private Skater1 : Skater;

    private ground : number;
    private gravedad: number;

    constructor(){
        super();

        this.ground = 600;
        this.gravedad = 0.004;

        this.Skater1 = new Skater();

        this.addChild(this.Skater1);
    }

    public update(deltaTime : number, deltaFrame : number) : void{

        this.Skater1.update(deltaTime, deltaFrame);

        //Jump and gravity
        if (this.Skater1.position.y >= this.ground){
            this.Skater1.speed.y = 0;
            this.Skater1.accel.y = 0;
            this.Skater1.onGround = true;
        }else{
            this.Skater1.accel.y = this.gravedad;
            this.Skater1.onGround = false;
        }

        //Center on mid horizontal
        if (this.Skater1.NOC && this.Skater1.onGround){
            if (this.Skater1.position.x > (WX/2 + 3)){
                this.Skater1.speed.x = -0.3;
            }else{
                if (this.Skater1.position.x <= (WX/2 - 3)){
                    this.Skater1.speed.x = 0.3;
                }else{
                    this.Skater1.speed.x = 0;
                }
            }
        }

        if (this.Skater1.position.x > WX || this.Skater1.position.x < 0){
            this.Skater1.NOC = true;
        }
    }

}