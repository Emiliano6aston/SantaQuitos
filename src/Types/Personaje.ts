import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PContainer } from "./PContainer";
import { Keyboard } from "./Keyboard";
import { IHitbox } from "./Interfaces/IHitbox";
import { SceneManager } from "../Scenes/SceneManager";

export class Skater extends PContainer implements IHitbox{
    //Actions
    AS_Run: AnimatedSprite;
    AS_Jump: AnimatedSprite;
    AS_Grind: AnimatedSprite;
    AS_Fall: AnimatedSprite;
    AS_Flip: AnimatedSprite;

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

    //Atributos de juego
    reset: boolean = false;
    Score: Score;
    
    constructor(score:Score){
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

        this.AS_Fall = new AnimatedSprite([
            Texture.from("SkateAnim12"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
        ], true);

        this.AS_Flip = new AnimatedSprite([
            Texture.from("SkateAnim14"),
            Texture.from("SkateAnim15"),
            Texture.from("SkateAnim16"),
            Texture.from("SkateAnim17"),
            Texture.from("SkateAnim18"),
        ], true);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, SceneManager.showHitBox);
        this.hitbox.drawRect(8,96,64,32);
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

        this.AS_Flip.loop = false;
        this.AS_Flip.scale.set(0.25);
        this.AS_Flip.anchor.x = 0.5;
        this.AS_Flip.position.x = 5;
        this.AS_Flip.position.y = -40;
        this.AS_Flip.animationSpeed = 0.5;
        //this.AS_Flip.currentFrame = 0;

        this.AS_Fall.loop = false;
        this.AS_Fall.scale.set(0.25);
        this.AS_Fall.anchor.x = 0.5;
        this.AS_Fall.position.x = 5;
        this.AS_Fall.position.y = -40;
        this.AS_Fall.animationSpeed = 0.05;

        this.addChild(this.AS_Run);
        this.addChild(this.hitbox);

        this.centered = true;
        Keyboard.down.on("Space", this.onJump, this);
        Keyboard.down.on("KeyA", this.onKeyA, this);
        Keyboard.up.on("KeyA", this.Reset, this);
        Keyboard.down.on("KeyD", this.onKeyD, this);
        Keyboard.up.on("KeyD", this.Reset, this);
        Keyboard.down.on("KeyE", this.onKeyE, this);
        Keyboard.down.on("KeyQ", this.onKeyQ, this);

        //Atributos de juego init
        this.Score = score;
        //this.Score.Timer = 0.0;
    }

    public override update(deltaTime : number, _deltaFrame : number): void {        
        super.update(deltaTime, _deltaFrame);

        //console.log(this.Score.Timer);

        //Atributos de juego update
        this.Score.Timer += deltaTime;
        //console.log(this.Timer);

        //Center on Screen
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

        if (this.position.x > SceneManager.WX || this.position.x < 16){

            if (this.position.x < 16) this.position.x = 17;
            this.centered = true;
        }

        //Gravity and ground collision
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

        //Animations and states
        this.AS_Run.play();
        this.AS_Grind.play();
        this.AS_Jump.play();

        if (this.onFall){
            this.speed.x = -0.1 ;
            this.worldspeed = 0.3;
            this.centered = false;
            if (this.AS_Fall.currentFrame == 4){
                this.reset = true;
                this.onFall = false;
            }
            this.onGround = true;
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Fall);
            this.AS_Fall.play();
        }
        
        if (this.onFlip){
            
            this.AS_Flip.play();
            if (this.AS_Flip.currentFrame == 2 ){
                this.onFlip = false;
            }
        }

        if ( this.speed.y > 0 && (this.JumpIn || this.JumpOut )){ //fix?
            this.AS_Jump.currentFrame = 1;
        }

        if (this.onGround && !this.onFall){ //Run
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Run);
        }

        if (this.onPlat && !this.onGrind && !this.onFall){ //RunOnPlat
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Run);
            this.scale.set(this.minScale);
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

        if (this.JumpIn || this.JumpOut || !this.onFlip){
            //Physics
            this.speed.y = 0;

            //States
            this.onGrind = true;
            this.JumpIn = false;
            this.JumpOut = false;

            //Animations
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Grind);
        }
    }
    private onKeyQ():void{
        if (this.JumpIn || this.JumpOut){
            this.onFlip = true;
            this.AS_Flip.currentFrame = 0;
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.addChild(this.AS_Flip);
        }
    }

    private onJump():void{
        if (this.onGround && !this.onFlip){
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
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Jump);

            //Score
            this.Score.LastTrick = 1;
        }
        if (this.onPlat && !this.onFlip){
            //Physics
            this.speed.y = -this.JumpSpeed - Math.abs((this.speed.x) * 0.5);
            this.position.y -= 5;
            
            //States
            this.JumpIn = false;
            this.JumpOut = true;
            this.onPlat = false;

            //Animation
            this.AS_Jump.currentFrame = 0;
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Jump);

            //Score
            this.Score.LastTrick = 1;
        }
    }

    public checkCollision(c:any, b:any):void{
        if ( c != null){
            if (b.tipo != 2 && (this.JumpIn || this.JumpOut || this.onGrind || !this.onPlat || !this.onFall)){
                if (this.speed.y > 0 && this.position.y < (b.position.y + c.height)){
                    //Physics
                    this.speed.y = 0;
                    this.position.y -= c.height - 1;

                    //States
                    this.onPlat = true;
                    this.scale.set(this.minScale);
                }
            }
            if (b.tipo == 2 && !this.onGround){
                this.onFall = true;
            }
            if (b.tipo == 3){
                this.onFall = true;
            }
        }
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }
}

export class Score{
    Score:number = 0;
    Timer:number = 0.0;
    Stars:number = 0;
    Tries:number = 3;
    KQuitos:number = 0;
    LastTrick:number = 0; //0 - none | 1 - Ollie | 2 - Flip | 3 - Grind | 4 - KillQuito
}
