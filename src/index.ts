import { Application , Assets} from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

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


Assets.addBundle("Skater", assets);
Assets.addBundle("SkateAnim", assets);
Assets.addBundle("Mosquito", assets);

import { assets } from './assets';
import { Skater } from './Types/Personaje';
import { Mosco } from './Types/SP_Mosquito';


Assets.load(["Skater1", "Skater2", "Skater3", "Skater4", "Skater5", "Skate1", "Skate2", "Skate3", "Skate4", "Mosco1", "Mosco2", "Mosco3", "Mosco4", "Mosco5", "Mosco6"]).then(()=>{

	const Skater0: Skater= new Skater();
	const p_mosco : Mosco = new Mosco();

	app.stage.addChild(p_mosco);
	app.stage.addChild(Skater0);
    
});