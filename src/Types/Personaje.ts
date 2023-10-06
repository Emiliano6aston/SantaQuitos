import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PContainer } from "./PContainer";
import { Keyboard } from "./Keyboard";
import { IHitbox } from "./Interfaces/IHitbox";
import { SceneManager } from "../Scenes/SceneManager";
//import { WY } from "..";

export class Skater extends PContainer implements IHitbox{
    //Actions
    AS_Run: AnimatedSprite;
    AS_Jump: AnimatedSprite;
    AS_Grind: AnimatedSprite;

    centered: boolean;
    hitbox:Graphics;

    //Atributos globales
    gravity:number = 0.0;
    ground:number = 0.0;
    worldspeed:number = 0.0;

    //Atributos de clase
    JumpSpeed:number = 0.75;
    ScaleJump:number = 1;
    minScale: number = 0.85;
    
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

        this.centered = true;
        Keyboard.down.on("Space", this.onJump, this);
        Keyboard.down.on("KeyA", this.onKeyA, this);
        Keyboard.up.on("KeyA", this.Reset, this);
        Keyboard.down.on("KeyD", this.onKeyD, this);
        Keyboard.up.on("KeyD", this.Reset, this);
        Keyboard.down.on("KeyE", this.onKeyE, this);

    }

    public override update(deltaTime : number, _deltaFrame : number): void {        
        super.update(deltaTime, _deltaFrame);

        if (this.centered && (this.onPlat ||  this.onGround)){
            if (this.position.x > (SceneManager.WX/2 + 3)){
                this.speed.x = -0.3;
            }else{
                if (this.position.x <= (SceneManager.WX/2 - 3)){
                    this.speed.x = 0.3;
                }else{
                    this.speed.x = 0;
                }
            }
        }

        if (this.position.y >= this.ground){
            //Physics
            this.speed.y = 0;
            this.accel.y = 0;

            //States
            this.onGround = true;
            this.onPlat = false;
            this.onGrind = false;
            this.JumpIn = false;
            this.JumpOut = false;
            this.scale.set(1);

        }else{
            this.accel.y = this.gravity;
            this.onGround = false;

            if (this.JumpIn && !this.onPlat){
                if (this.speed.y < 0) this.ScaleJump -= 0.01;
                if (this.speed.y > 0.5) this.ScaleJump += 0.01;
            }
            if (this.JumpOut){
                this.ScaleJump += 0.01;
            }
            if (this.ScaleJump < this.minScale) this.ScaleJump = this.minScale;
            if (this.ScaleJump > 1.0) this.ScaleJump = 1.0;
            this.scale.set(this.ScaleJump);
        }

        this.AS_Run.play();
        this.AS_Grind.play();

        if (this.speed.y > 0){ //fix?
            this.AS_Jump.currentFrame = 1;
        }

        if ((this.JumpIn || this.JumpOut)){
            this.AS_Jump.play();
        }

        if (!this.onGrind && (!this.JumpIn || !this.JumpOut)){ //Run
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Run);
        }

        if (this.onPlat && !this.onGrind){ //RunOnPlat
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Run);
        }
    }
    
    private Reset():void{
        this.centered = true;
    }

    private onKeyA():void{
        if ((this.onGround || this.onPlat) && !this.onGrind){
            this.speed.x = -0.4;
            this.centered = false;
        }
    }

    private onKeyD():void{
        if ((this.onGround || this.onPlat) && !this.onGrind){
            this.speed.x = 0.4;
            this.centered = false;
        }
    }

    private onKeyE():void{

        if ( this.JumpIn || this.JumpOut){
            //Physics
            this.speed.y = 0;

            //States
            this.onGrind = true;
            this.JumpIn = false;
            this.JumpOut = false;

            //Animations
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Jump);
            this.addChild(this.AS_Grind);
        }
    }

    private onJump():void{
        if (this.onGround){
            //Physics
            this.speed.y = -this.JumpSpeed - Math.abs((this.speed.x) * 0.5);
            this.position.y -= 5;

            //States    
            this.JumpIn = true;
            this.JumpOut = false;
        
            //Animation
            this.AS_Jump.currentFrame = 0;
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Jump);
        }
        if (this.onPlat || this.onGrind){
            //Physics
            this.speed.y = -this.JumpSpeed - Math.abs((this.speed.x) * 0.5);
            this.position.y -= 5;
            
            //States
            this.JumpIn = false;
            this.JumpOut = true;

            //Animation
            this.AS_Jump.currentFrame = 0;
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Jump);
        }
    }

    public checkCollision(c:any, b:any):void{
        if ( c != null){
            if (b.tipo != 2 && (this.JumpIn || this.JumpOut || this.onGrind || !this.onPlat)){
                if (this.speed.y > 0 && this.position.y < (b.position.y + c.height)){
                    //Physics
                    this.speed.y = 0;
                    this.position.y -= c.height - 1;

                    //States
                    this.onPlat = true;
                    this.scale.set(this.minScale);
                }
            }
        }
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }
}



