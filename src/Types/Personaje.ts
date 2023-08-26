import { AnimatedSprite, Sprite, Texture, Ticker } from "pixi.js";

export class Skater extends Sprite{
    ASkate: AnimatedSprite;
    ASkater: AnimatedSprite;
    speed: number = 0.5;
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

        
        ASkate.position.y = 500;
        ASkate.addChild(ASkater);

        ASkater.position.x = 5;
        ASkater.position.y = -65;
        ASkater.animationSpeed = 0.03;

        this.ASkate = ASkate;
        this.ASkater = ASkater;
        this.addChild(this.ASkate);
        Ticker.shared.add(this.update, this);
    }

    public update(_deltaTime: number, _deltaFrame?: number): void {
        this.ASkate.position.x += this.speed * _deltaTime;
        this.ASkate.play();
        this.ASkater.play();
    }
}

