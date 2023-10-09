import { IUpdate } from "./Interfaces/IUpdate";
import { Obstaculo } from "./Obstaculo";
import { Banco } from "./Obstaculos/Banco";
import { Bicicletero } from "./Obstaculos/Bicicletero";
import { Pilar } from "./Obstaculos/Pilar";

//3 fases
//1_ un obstáculo por vez
//2_ tres obstáculos por vez -> aparece obstáculo especial de la zona - aparece un mosquito
//3_ cinco obstáculos por vez -> aparecen dos mosquitos

//7 obstáculos por fase
//5 tipos de obstaculos
//1 -> bancos
//2 -> transito
//3 -> pozos
//4 -> moscos
//5 -> especial mapa


export class Map implements IUpdate{
    Obstaculos : Array<Obstaculo>;
    Spawned: Array<Obstaculo>;
    fase: number = 0;
    c_obst: number = 1;
    f_obst: number = 7;
    spawned: number = 0;
    timer: number = 0;
    finished: boolean = false;

    constructor(mapa:String){

        this.Obstaculos = new Array<Obstaculo>;
        this.Spawned = new Array<Obstaculo>;

        
        if (mapa == "Federal" ){ // obstaculos: bancos cemento - bicicletero - pilar alto
            this.add(new Banco());
            this.add(new Bicicletero());
            this.add(new Pilar());
        }

    }
    update(deltaTime: number, _deltaFrame: number): void {
        this.timer += deltaTime;

        if (this.timer > 30 * 1000){
            this.timer = 0;
            this.fase += 1;
            this.c_obst += 2;
        }

        if (this.fase > 2) this.finished = true;

        if (!this.finished){
            
            this.Spawned = new Array<Obstaculo>;
        }

    }

    private add(obst:Obstaculo){
        this.Obstaculos.push(obst);
    }

}

