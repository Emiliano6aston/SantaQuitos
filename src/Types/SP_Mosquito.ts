import { AnimatedSprite, Sprite, Texture, Ticker} from "pixi.js";

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
        AMosco.position.y = 300

        this.AMosco = AMosco;
        this.addChild(this.AMosco);
        Ticker.shared.add(this.update, this);
    }

    public update(_deltaTime: number, _deltaFrame?: number): void {
        this.time += _deltaTime;
        this.AMosco.position.x += 0.5 * _deltaTime;
        this.AMosco.position.y += _deltaTime * 1 * Math.sin(this.time * 0.01 );
        this.AMosco.play();
    }
}
