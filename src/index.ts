import { Assets, Ticker} from 'pixi.js'
import { MainScene } from './Scenes/MainScene';

Assets.addBundle("Skater", assets);
Assets.addBundle("SkateAnim", assets);
Assets.addBundle("Mosquito", assets);
import { assets } from './assets';
import { SceneManager } from './Scenes/SceneManager';
import { sound } from '@pixi/sound';


Assets.load(["SkateAnim0", "SkateAnim1", "SkateAnim2", "SkateAnim3", "SkateAnim4", "SkateAnim5", "SkateAnim6", "SkateAnim7", "SkateAnim8", "SkateAnim9", "SkateAnim10", "SkateAnim11", "Mosco1", "Banco1", "Fuente1", "Pilar1", "Bicic1","Bola1", "Baldosas1", "Builds1", "Asfalto1", "Cesped1", "SantaFe1"]).then(()=>{
	
	const OMainScene : MainScene = new MainScene();
	
	SceneManager.initialize();
	SceneManager.changeScene(OMainScene);
	SceneManager.music = sound.find("SantaFe1");
	Ticker.shared.add(function (deltaFrame){
		SceneManager.update(Ticker.shared.deltaMS, deltaFrame);
	})
	
});

