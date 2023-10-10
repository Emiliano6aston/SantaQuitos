import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PContainer } from "./PContainer";
import { Keyboard } from "./Keyboard";
import { IHitbox } from "./Interfaces/IHitbox";
import { SceneManager } from "../Scenes/SceneManager";
import { Score } from "./Score";
import { Sound, filters, sound } from "@pixi/sound";
import { Obstaculo } from "./Obstaculo";

export class Skater extends PContainer implements IHitbox{
    //Actions
    AS_Run: AnimatedSprite;
    AS_Jump: AnimatedSprite;
    AS_Grind: AnimatedSprite;
    AS_Fall: AnimatedSprite;
    AS_Flip: AnimatedSprite;

    //States
    centered: boolean;
    hitbox:Graphics;

    //Sounds
    roll:Sound;
    jump:Sound;
    fall:Sound;

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
    lastrick:number = 0;
    land: Sound;
    flip: Sound;
    grind: Sound;
    panner: filters.StereoFilter;
    volume: number = 0.1;
    
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
            Texture.from("SkateAnim12"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
            Texture.from("SkateAnim13"),
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
        this.AS_Fall.animationSpeed = 0.1;

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

        //Sounds
        this.panner = new filters.StereoFilter();
        this.panner.pan = 2;


        this.roll = sound.find("roll");
        this.roll.loop = false;
        this.roll.volume = this.volume;
        this.roll.filters = [this.panner];
        this.jump = sound.find("jump");
        this.jump.volume = this.volume;
        this.jump.filters = [this.panner];
        this.fall = sound.find("fall");
        this.fall.loop = false;
        this.fall.volume = this.volume;
        this.fall.filters = [this.panner];
        this.land = sound.find("land");
        this.land.loop = false;
        this.land.volume = this.volume;
        this.land.filters = [this.panner];
        this.flip = sound.find("flip");
        this.flip.loop = false;
        this.flip.volume = this.volume;
        this.flip.filters = [this.panner];
        this.grind = sound.find("grind");
        this.grind.loop = false;
        this.grind.volume = this.volume;
        this.grind.filters = [this.panner];

    }

    public override update(deltaTime : number, _deltaFrame : number): void {     
        super.update(deltaTime, _deltaFrame);

        //Atributos de juego update
        this.Score.Timer += deltaTime;
        if (this.Score.LastTrick != this.lastrick){
            this.lastrick = this.Score.LastTrick;
            if (this.lastrick != this.Score.TrickRep) {
                this.Score.TrickRep = this.lastrick;
            }else{
                this.Score.TrickRep = this.lastrick;
                this.Score.Score += this.Score.Points[this.lastrick];
            }

        }
        if (!this.onGround && !this.onGrind && !this.onPlat) this.Score.Score += 1;

        this.panner.pan = (this.position.x / SceneManager.WX) - 0.35;

        //Center on Screen
        if (this.centered && (this.onPlat ||  this.onGround)){
            this.vroll();
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

            //Sound
            if (!this.land.isPlaying && (this.JumpIn || this.JumpOut || this.onGrind || this.onFlip)) this.land.play();
            this.grind.stop();

            //States
            this.onGround = true;
            this.onPlat = false;
            this.onGrind = false;
            this.JumpIn = false;
            this.JumpOut = false;
            this.scale.set(1);

            //Score
            this.Score.LastTrick = 0;
            this.Score.Scored += this.Score.Score;
            this.Score.Score = 0;

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
            //Score
            this.Score.LastTrick = 5;

            //Physics
            if (this.speed.x > 0) this.speed.x -= 0.0003 * deltaTime;
            if (this.speed.x < 0) this.speed.x = 0;
            if (this.worldspeed > 0) this.worldspeed -= 0.001 * deltaTime;
            if (this.worldspeed < 0) this.worldspeed = 0;
            
            //States
            this.centered = false;
            if (this.AS_Fall.currentFrame == 10){
                this.reset = true;
                this.onFall = false;
            }
            this.onGround = true;

            //Animation
            this.removeChild(this.AS_Run);
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Fall);
            this.AS_Fall.play();

            //Sounds
            if(!this.fall.isPlaying && this.AS_Fall.currentFrame < 2){
                this.fall.play();
                this.roll.stop();
                this.grind.stop();
            }
        }
        
        if (this.onFlip){
            this.AS_Flip.play();
            if (this.AS_Flip.currentFrame == 2 ){
                this.onFlip = false;
            }
            if (!this.flip.isPlaying) this.flip.play();
        }

        if ( this.speed.y > 0 && (this.JumpIn || this.JumpOut )){ //fix?
            this.AS_Jump.currentFrame = 1;
        }

        if (this.onGround && !this.onFall){ //Run
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Run);

            //sounds
            if(!this.roll.isPlaying){
                this.vroll();
                this.roll.play();
            }
        }

        if (this.onPlat && !this.onGrind && !this.onFall){ //RunOnPlat
            this.removeChild(this.AS_Jump);
            this.removeChild(this.AS_Grind);
            this.removeChild(this.AS_Flip);
            this.addChild(this.AS_Run);
            this.scale.set(this.minScale);

            //sounds
            if(!this.roll.isPlaying){
                this.vroll();
                this.roll.play();
            }
        }
    }
    
    private Reset():void{
        this.centered = true;
    }

    private onKeyA():void{
        if ((this.onGround || this.onPlat) && !this.onGrind){
            this.speed.x = -0.4;
            this.centered = false;
            this.vroll();
        }
    }

    private onKeyD():void{
        if ((this.onGround || this.onPlat) && !this.onGrind){
            this.speed.x = 0.4;
            this.centered = false;
            this.vroll();
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
        if (this.JumpIn || this.JumpOut && !this.onFlip){
            //Score
            this.Score.LastTrick = 2;

            //States
            this.onFlip = true;

            //Animations
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

            //Score
            this.Score.LastTrick = 1;

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

            //Sound
            this.roll.stop();
            this.grind.stop();
            this.jump.play();
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

            //Sound
            this.roll.stop();
            this.grind.stop();
            this.jump.play();
        }
    }

    public checkCollision(c:Rectangle, b:Obstaculo):void{
        if ( c != null && b != null){
            if (b.tipo != 2 && (this.JumpIn || this.JumpOut || this.onGrind || !this.onPlat || !this.onFall)){
                if (this.speed.y > 0 && this.position.y < (b.position.y + c.height)){
                    //Physics
                    this.speed.y = 0;
                    this.position.y -= c.height - 1;

                    //Score
                    if (this.onGrind){
                        this.Score.LastTrick = 3;
                        this.Score.Score += 1;
                        if (!this.grind.isPlaying) this.grind.play();
                    }

                    //States
                    this.onPlat = true;
                    this.scale.set(this.minScale);
                }
            }
            if (b.tipo == 2 && !this.onGround){
                this.onFall = true;
                console.log(b.nombre);
            }
            if (b.tipo == 3){
                this.onFall = true;
                console.log(b.nombre);
            }
        }
    }
    private vroll(){
        this.roll.speed = 1 + (this.speed.x / 2);
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }
}
