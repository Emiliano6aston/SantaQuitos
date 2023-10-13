import { Assets, Ticker} from 'pixi.js'
import { SceneManager } from './Scenes/SceneManager';
import { MenuScene } from './Scenes/MenuScene';
import { Score } from './Types/Score';
import { assets } from './assets';


Assets.add("FSA", "./FSA.ttf", { "family": "FSA" });
Assets.add("Painterz", "./Painterz.ttf", { "family": "Painterz" });
Assets.add("gomarice_simple_slum", "./gomarice_simple_slum.ttf", { "family": "gomarice_simple_slum" });

Assets.load("FSA");
Assets.load("Painterz");
Assets.load("gomarice_simple_slum");

Assets.init();
Assets.addBundle("Scene", assets);
Assets.loadBundle("Scene").then(()=>{
	
	SceneManager.initialize();

	let score = new Score();

	const OMenuScene : MenuScene = new MenuScene(score);

	SceneManager.changeScene(OMenuScene);

	Ticker.shared.add(function (deltaFrame){
		SceneManager.update(Ticker.shared.deltaMS, deltaFrame);
	})

});


