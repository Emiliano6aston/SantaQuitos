import { AnimatedSprite, Sprite, Texture} from "pixi.js";

export class Mosco extends Sprite{
    AMosco: AnimatedSprite;
    time : number = 0;
    constructor(){
        super();
        const AMosco = new AnimatedSprite([
            Texture.from("Mosco1"),
            Texture.from("Mosco2"),
            Texture.from("Mosco3"),
            Texture.from("Mosco4"),
            Texture.from("Mosco5"),
            Texture.from("Mosco6"),
        ], true);

        AMosco.animationSpeed = 1.0;
        AMosco.position.x = 1300;
        AMosco.position.y = 300;

        this.AMosco = AMosco;
        this.addChild(this.AMosco);
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.time += deltaTime;
        this.AMosco.position.x -= 0.1 * deltaTime;
        this.AMosco.position.y += deltaTime * 0.5 * Math.sin(this.time * 0.005 );
        this.AMosco.play();

        if (this.AMosco.position.x < 0) this.AMosco.position.x = 1300;
    }
}
