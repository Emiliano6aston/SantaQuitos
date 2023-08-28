import { AnimatedSprite, Texture } from "pixi.js";
import { PContainer } from "./PContainer";
import { Keyboard } from "./Keyboard";

export class Skater extends PContainer{
    ASkate: AnimatedSprite;
    ASkater: AnimatedSprite;
    NOC: boolean;
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

        this.NOC = true;
        Keyboard.down.on("Space", this.onJump, this);
        Keyboard.down.on("KeyA", this.onKeyA, this);
        Keyboard.up.on("KeyA", this.Reset, this);
        Keyboard.down.on("KeyD", this.onKeyD, this);
        Keyboard.up.on("KeyD", this.Reset, this);

    }
    
    private Reset():void{
        this.NOC = true;
    }

    private onKeyA():void{
        if (this.onGround){
            this.speed.x = -0.4;
            this.NOC = false;
        }
    }

    private onKeyD():void{
        if (this.onGround){
            this.speed.x = 0.4;
            this.NOC = false;
        }
    }

    private onJump():void{
        if (this.onGround){
            this.position.y -= 5;
            this.speed.y = -1.0 - (this.speed.x) * 0.25;
        }
    }
}

