import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PContainer } from "./PContainer";
import { Keyboard } from "./Keyboard";
import { IHitbox } from "./Interfaces/IHitbox";
//import { WY } from "..";

export class Skater extends PContainer implements IHitbox{
    //Actions
    AS_Run: AnimatedSprite;
    AS_Jump: AnimatedSprite;
    AS_Grind: AnimatedSprite;

    NOC: boolean;
    hitbox:Graphics;

    //Atributos
    JumpSpeed:number = 0.75;
    
    constructor(){
        super();
        
        this.AS_Run = new AnimatedSprite([
            Texture.from("SkateAnim0"),
            Texture.from("SkateAnim1"),
            Texture.from("SkateAnim2"),
            Texture.from("SkateAnim3"),
        ], true);

        this.AS_Jump = new AnimatedSprite([
            Texture.from("SkateAnim4"),
            Texture.from("SkateAnim6"),
        ], true);

        this.AS_Grind = new AnimatedSprite([
            Texture.from("SkateAnim10"),
        ], true);
        

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.01);
        this.hitbox.drawRect(0,0,64,128);
        this.hitbox.endFill();
        this.hitbox.x = -32;
        this.hitbox.y = -48;

        this.AS_Run.scale.set(0.25);
        this.AS_Run.anchor.x = 0.5;
        this.AS_Run.position.x = 5;
        this.AS_Run.position.y = -65;
        this.AS_Run.animationSpeed = 0.03;

        this.AS_Jump.loop = false;
        this.AS_Jump.scale.set(0.25);
        this.AS_Jump.anchor.x = 0.5;
        this.AS_Jump.position.x = 5;
        this.AS_Jump.position.y = -65;
        this.AS_Jump.animationSpeed = 0.01;

        this.AS_Grind.loop = false;
        this.AS_Grind.scale.set(0.25);
        this.AS_Grind.anchor.x = 0.5;
        this.AS_Grind.position.x = 5;
        this.AS_Grind.position.y = -40;
        this.AS_Grind.animationSpeed = 0.25;
        this.AS_Grind.currentFrame = 0;

        this.addChild(this.AS_Run);
        this.addChild(this.hitbox);

        this.NOC = true;
        Keyboard.down.on("Space", this.onJump, this);
        Keyboard.down.on("KeyA", this.onKeyA, this);
        Keyboard.up.on("KeyA", this.Reset, this);
        Keyboard.down.on("KeyD", this.onKeyD, this);
        Keyboard.up.on("KeyD", this.Reset, this);
        Keyboard.down.on("KeyE", this.onKeyE, this);

    }

    public override update(deltaTime : number, _deltaFrame : number): void {        
        super.update(deltaTime, _deltaFrame);

        this.AS_Run.play();
        this.AS_Grind.play();

        if (this.speed.y > 0){
            this.AS_Jump.currentFrame = 1;
        }

        if (!this.onPlat && this.jumping){
            this.scale.set(this.position.y / 550);
            this.AS_Jump.play();
        }

        if (!this.jumping){
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Run);
        }

        if (this.onPlat && !this.onGrind){
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Run);
        }
    }
    
    private Reset():void{
        this.NOC = true;
    }

    private onKeyA():void{
        if (this.onGround || this.onPlat && !this.onGrind){
            this.speed.x = -0.4;
            this.NOC = false;
        }
    }

    private onKeyD():void{
        if (this.onGround || this.onPlat && !this.onGrind){
            this.speed.x = 0.4;
            this.NOC = false;
        }
    }

    private onKeyE():void{

        if (this.jumping){
            this.onGrind = true;
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Jump);
            this.addChild(this.AS_Grind);
        }
    }

    private onJump():void{
        if (this.onGround || this.onPlat){
            this.AS_Jump.currentFrame = 0;
            this.jumping = true;
            this.onPlat = false;
            this.position.y -= 5;
            this.speed.y = -this.JumpSpeed - Math.abs((this.speed.x) * 0.5);
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Jump);
        }
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }
}

