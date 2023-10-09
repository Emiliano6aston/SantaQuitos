import { sound } from "@pixi/sound";
import { Container, Sprite, Text, TextStyle } from "pixi.js";

export class button extends Container{
    text: Text;
    image: Container;
    imageo: Sprite;
    imagep: Sprite;
    click: any;

    constructor(text:string){
        super();

        this.click = sound.find("jump");

        this.image = Sprite.from("B_basic");
        this.image.pivot.set(this.image.getBounds().width/2, this.image.getBounds().height/2);
        this.addChild(this.image);

        this.imageo = Sprite.from("B_over");
        this.imageo.pivot.set(this.image.getBounds().width/2, this.image.getBounds().height/2);
        this.imagep = Sprite.from("B_press");
        this.imagep.pivot.set(this.image.getBounds().width/2, this.image.getBounds().height/2);

        const style = new TextStyle({
            fontFamily:"FSA",
            fill: "White",
            strokeThickness: 3.0,
            fontSize:64,
        });
        this.text = new Text(text, style );
        this.text.pivot.set(this.text.getBounds().width/2, this.text.getBounds().height/2 + 8);
        this.addChild(this.text);
        this.interactive = true;
    }

    public over(){
        this.removeChild(this.image);
        this.removeChild(this.imageo);
        this.addChild(this.imagep);

        this.removeChild(this.text);
        this.addChild(this.text);

        this.text.style.fill = "Black";
    }

    public nover(){
        this.removeChild(this.imageo);
        this.removeChild(this.imagep);
        this.addChild(this.image);

        this.removeChild(this.text);
        this.addChild(this.text);

        this.text.style.fill = "White";
    }
    
    public press(){
        this.removeChild(this.image);
        this.removeChild(this.imageo);
        this.addChild(this.imagep);

        this.removeChild(this.text);
        this.addChild(this.text);

        this.click.play();
    }
    
}