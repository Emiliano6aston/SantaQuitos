import { Rectangle } from "pixi.js";

export interface IHitbox{
    getHitbox():Rectangle;
}

export function checkCollision(objA:IHitbox, objB:IHitbox):Rectangle | void{
    const rA = objA.getHitbox();
    const rB = objB.getHitbox();

    const dmasizq = rA.left < rB.left ? rB.left : rA.left;
    const imasder = rA.right > rB.right ? rB.right : rA.right;
    const bmasa = rA.top < rB.top ? rB.top : rA.top;
    const amasb = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    if ( dmasizq < imasder && bmasa < amasb ){
        const retval = new Rectangle();
        retval.x = dmasizq;
        retval.y = bmasa;
        retval.width = imasder - dmasizq;
        retval.height = amasb - bmasa;
        return retval;
    }

}