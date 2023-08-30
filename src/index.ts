import { Application , Assets, Ticker} from 'pixi.js'

export const WX = 1280;
export const WY = 720;

const app = new Application({
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


Assets.addBundle("Skater", assets);
Assets.addBundle("SkateAnim", assets);
Assets.addBundle("Mosquito", assets);

import { assets } from './assets';
import { MainScene} from './Scenes/MainScene';
import { Keyboard } from './Types/Keyboard';


//Assets.load(["Skater1", "Skater2", "Skater3", "Skater4", "Skater5", "Skate1", "Skate2", "Skate3", "Skate4", "Mosco1", "Mosco2", "Mosco3", "Mosco4", "Mosco5", "Mosco6", "Banco1", "Baldosas1", "Builds1", "Asfalto1", "Cesped1"]).then(()=>{
Assets.load(["SkateAnim0", "SkateAnim1", "SkateAnim2", "SkateAnim3", "SkateAnim4", "SkateAnim5", "SkateAnim6", "SkateAnim7", "SkateAnim8", "SkateAnim9", "SkateAnim10", "SkateAnim11", "Mosco1", "Mosco2", "Mosco3", "Mosco4", "Mosco5", "Mosco6", "Banco1", "Baldosas1", "Builds1", "Asfalto1", "Cesped1"]).then(()=>{

	

	const OMainScene : MainScene = new MainScene();
	app.stage.addChild(OMainScene);

	Ticker.shared.add( function (_deltaFrame){
		OMainScene.update(Ticker.shared.deltaMS, _deltaFrame);
	})
});