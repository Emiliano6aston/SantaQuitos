import { Application, Ticker } from "pixi.js";
import { Keyboard } from "../Types/Keyboard";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{
    let currentScene:SceneBase;
    let app:Application;

    export const WX = 1280;
    export const WY = 720;
    export const showHitBox = 0.5;

    export function initialize(){
        if (app != undefined){
            console.log("Ya se inició la aplicación.");
            return;
        }

        app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x6495ed,
            width: WX,
            height: WY,
        });
        
        Keyboard.initialize();
        
        window.addEventListener("resize", ()=> {
            console.log("resized!");
            const scaleX = window.innerWidth / app.screen.width;
            const scaleY = window.innerHeight / app.screen.height;
            const scale = Math.min(scaleX, scaleY);
        
            const screenWidth = Math.round(app.screen.width * scale);
            const screenHeight = Math.round(app.screen.height * scale);
        
            const marginHorizontal = Math.floor((window.innerWidth - screenWidth) / 2);
            const marginVertical = Math.floor((window.innerHeight - screenHeight) / 2);
        
            app.view.style!.width = screenWidth + "px";
            app.view.style!.height = screenHeight + "px";
        
            (app.view.style as any).marginLeft = marginHorizontal + "px";
            (app.view.style as any).marginRight = marginHorizontal + "px";
        
            (app.view.style as any).marginTop = marginVertical + "px";
            (app.view.style as any).marginBottom = marginVertical + "px";
        });

        window.dispatchEvent(new Event("resize"));
    }

    export function changeScene(newScene:SceneBase){
        if (currentScene){
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);
    }

    export function update(deltaFrame:number, _deltaTime:number ){
          currentScene?.update(deltaFrame, Ticker.shared.elapsedMS);
     }
}