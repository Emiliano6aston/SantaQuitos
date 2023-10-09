import { Assets, Ticker} from 'pixi.js'
import { assets } from './assets';

Assets.add("FSA", "./FSA.ttf", { "family": "FSA" });
Assets.add("Painterz", "./Painterz.ttf", { "family": "Painterz" });
Assets.add("gomarice_simple_slum", "./gomarice_simple_slum.ttf", { "family": "gomarice_simple_slum" });


Assets.addBundle("Skater", assets);
Assets.addBundle("SkateAnim", assets);
Assets.addBundle("Mosquito", assets);

import { SceneManager } from './Scenes/SceneManager';
import { MenuScene } from './Scenes/MenuScene';
import { Score } from './Types/Score';


Assets.load(["FSA", "Painterz", "gomarice_simple_slum", "B_marco", "B_long", "B_fondo", "B_basic", "B_over", "B_press", "SkateAnim0", "SkateAnim1", "SkateAnim2", "SkateAnim3", "SkateAnim4", "SkateAnim5", "SkateAnim6", "SkateAnim7", "SkateAnim8", "SkateAnim9", "SkateAnim10", "SkateAnim11", "SkateAnim12", "SkateAnim13", "SkateAnim14", "SkateAnim15", "SkateAnim16", "SkateAnim17", "SkateAnim18", "Mosco1", "Mosco2", "Mosco3", "Mosco4", "Mosco5", "Mosco6", "Banco1", "Fuente1", "Pilar1", "Bicic1","Bola1", "Pozo1", "Baldosas1", "Builds1", "Asfalto1", "Cesped1", "SantaFe1", "SantaFe2", "roll", "jump", "fall", "land", "flip","grind"]).then(()=>{
	
	SceneManager.initialize();

	let score = new Score();

	const OMenuScene : MenuScene = new MenuScene(score);

	SceneManager.changeScene(OMenuScene);

	Ticker.shared.add(function (deltaFrame){
		SceneManager.update(Ticker.shared.deltaMS, deltaFrame);
	})

});


