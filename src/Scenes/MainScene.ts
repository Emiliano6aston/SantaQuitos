import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdate } from "../Types/Interfaces/IUpdate";
import { Skater } from "../Types/Personaje";
import { Banco } from "../Types/Banco";
import { WX,WY } from "..";
import { checkCollision } from "../Types/Interfaces/IHitbox";
import { Mosco } from "../Types/SP_Mosquito";


export class MainScene extends Container implements IUpdate{

    private Skater1 : Skater;
    private ground : number;
    private gravedad: number;
    worldspeed: number;

    private bancos: Banco[];
    bg0:TilingSprite;
    bg1: TilingSprite;
    bg2: TilingSprite;
    bg3: TilingSprite;
    bg4: TilingSprite;
    p_mosco: any;

    constructor(){
        super();
        //Constantes
        this.ground = 600;
        this.gravedad = 0.004;
        this.worldspeed = 0.5;

        //Fondo
        this.bg0 = new TilingSprite(Texture.from("Builds1"), WX,WY);
        this.bg0.position.y = -260;
        this.addChild(this.bg0);

        this.bg1 = new TilingSprite(Texture.from("Asfalto1"), WX, 128);
        this.bg1.position.y = 480;

        this.bg2 = new TilingSprite(Texture.from("Cesped1"), WX, 64);
        this.bg2.position.y = 420;

        this.bg4 = new TilingSprite(Texture.from("Cesped1"), WX, 64);
        this.bg4.position.y = 570;

        this.bg3 = new TilingSprite(Texture.from("Baldosas1"), WX, 128);
        this.bg3.position.y = 592;

        this.addChild(this.bg2);
        this.addChild(this.bg1);
        this.addChild(this.bg4);
        this.addChild(this.bg3);

        //Obstaculos
        this.bancos = [];
        const banco1 = new Banco();
        banco1.position.x = 500;
        banco1.position.y = this.ground;
        this.addChild(banco1);
        this.bancos.push(banco1);

        const banco2 = new Banco();
        banco2.position.x = 1000;
        banco2.position.y = this.ground;
        this.addChild(banco2);
        this.bancos.push(banco2);
        
        this.Skater1 = new Skater();
        this.addChild(this.Skater1);

        this.p_mosco = new Mosco();
        this.addChild(this.p_mosco);
    }

    public update(deltaTime : number, deltaFrame : number) : void{

        this.p_mosco.update();

        //CheckCollisions
        for (let B of this.bancos){
            //check collisions
            const c = checkCollision(this.Skater1 , B);
            if (c != null && this.Skater1.speed.y > 0){
                this.Skater1.position.y -= c.height - 1;
                this.Skater1.speed.y = 0;
                this.Skater1.onPlat = true;
            };

            B.position.x -= this.worldspeed * deltaTime;

            if (B.position.x < -720){
                B.position.x = 1500;
            }
        }

        //World and background
        this.bg0.tilePosition.x -= 0.5 * this.worldspeed * deltaTime;
        this.bg1.tilePosition.x -= 0.75 * this.worldspeed * deltaTime;
        this.bg2.tilePosition.x -= 0.75 * this.worldspeed * deltaTime;
        this.bg3.tilePosition.x -= this.worldspeed * deltaTime;
        this.bg4.tilePosition.x -= this.worldspeed * deltaTime;
        

        this.Skater1.update(deltaTime, deltaFrame);

        //Jump and gravity
        if (this.Skater1.position.y >= this.ground){
            this.Skater1.speed.y = 0;
            this.Skater1.accel.y = 0;
            this.Skater1.onGround = true;
            this.Skater1.onPlat = false;
            this.Skater1.jumping = false;
            this.Skater1.scale.set(1);
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

        if (this.Skater1.position.x > WX || this.Skater1.position.x < 16){

            if (this.Skater1.position.x < 16) this.Skater1.position.x = 17;

            this.Skater1.NOC = true;
        }
    }
}