import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PContainer } from "./PContainer";
import { Keyboard } from "./Keyboard";
import { IHitbox } from "./Interfaces/IHitbox";
//import { WY } from "..";

export class Skater extends PContainer implements IHitbox{
    ASkate: AnimatedSprite;
    ASkater: AnimatedSprite;
    NOC: boolean;
    hitbox:Graphics;

    //Atributos
    JumpSpeed:number = 0.75;
    constructor(){
        super();
        const ASkate = new AnimatedSprite([
            Texture.from("Skate1"),
            Texture.from("Skate2"),
            Texture.from("Skate3"),
            Texture.from("Skate4"),
        ], true);
        
        const ASkater = new AnimatedSprite([
            Texture.from("Skater1"),
            Texture.from("Skater2"),
            Texture.from("Skater3"),
            Texture.from("Skater4"),
            Texture.from("Skater5"),
        ], true);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.01);
        this.hitbox.drawRect(0,0,64,128);
        this.hitbox.endFill();
        this.hitbox.x = -32;
        this.hitbox.y = -48;

        ASkate.anchor.x = 0.5;
        ASkate.position.y = 0;
        ASkate.addChild(ASkater);

        ASkater.anchor.x = 0.5;
        ASkater.position.x = 5;
        ASkater.position.y = -65;
        ASkater.animationSpeed = 0.03;

        this.ASkate = ASkate;
        this.ASkater = ASkater;
        this.addChild(this.ASkate);

        this.addChild(this.hitbox);

        this.NOC = true;
        Keyboard.down.on("Space", this.onJump, this);
        Keyboard.down.on("KeyA", this.onKeyA, this);
        Keyboard.up.on("KeyA", this.Reset, this);
        Keyboard.down.on("KeyD", this.onKeyD, this);
        Keyboard.up.on("KeyD", this.Reset, this);

    }

    public override update(deltaTime : number, _deltaFrame : number): void {        
        super.update(deltaTime, _deltaFrame);

        this.ASkate.play();
        this.ASkater.play();
        if (!this.onPlat && this.jumping){
            this.scale.set(this.position.y / 550);
        }
    }
    
    private Reset():void{
        this.NOC = true;
    }

    private onKeyA():void{
        if (this.onGround || this.onPlat){
            this.speed.x = -0.4;
            this.NOC = false;
        }
    }

    private onKeyD():void{
        if (this.onGround || this.onPlat){
            this.speed.x = 0.4;
            this.NOC = false;
        }
    }

    private onJump():void{
        if (this.onGround || this.onPlat){
            this.jumping = true;
            this.position.y -= 5;
            this.speed.y = -this.JumpSpeed - Math.abs((this.speed.x) * 0.5);
        }
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }
}

