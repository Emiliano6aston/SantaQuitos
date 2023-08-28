import { Container, Point } from "pixi.js";

export class PContainer extends Container{

    public speed : Point = new Point();
    public accel : Point = new Point();
    public onGround : boolean = false;

    public update(deltaTime : number, _deltaFrame : number){
        this.x += this.speed.x * deltaTime + 1/2 * this.accel.x * deltaTime * deltaTime;
        this.y += this.speed.y * deltaTime + 1/2 * this.accel.y * deltaTime * deltaTime;

        this.speed.x += this.accel.x * deltaTime;
        this.speed.y += this.accel.y * deltaTime;
    }


}
