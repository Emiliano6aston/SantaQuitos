

export class MapMaker{
    Obstaculos : Array<Obstaculo>;
    constructor(){

        this.Obstaculos = new Array<Obstaculo>;
        this.Obstaculos[0] = new Obstaculo();

    }

}

export class Obstaculo{
    activo : boolean = true;
    puntaje : number = 0;
    tipo : number = 0; //0 = ninguno
    constructor(){

        //Se podría hacer random al crear entre los tipos definidos en este nivel
        
    }
}