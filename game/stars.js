import { ExtrudeBufferGeometry, Mesh, MeshStandardMaterial, Shape, ShapeBufferGeometry } from "three"
import {scene} from '.'


export const allStars = []

function makeAStar () {
    const StarShape = new Shape()
    .moveTo(0,3)
    .lineTo(.65,2)
    .lineTo(2,2)
    .lineTo(1, 1.25)
    .lineTo(1.5 ,0)
    .lineTo(0,1)
    .lineTo(-1.5, 0)
    .lineTo(-1, 1.25)
    .lineTo(-2,2)
    .lineTo(-.65,2)
    .lineTo(0,3)
    const starGeo = new ExtrudeBufferGeometry(StarShape,{ depth: .25, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: .5, bevelThickness: .5 })
    const starMatarial = new MeshStandardMaterial({color:0xff0000})
    const star = new Mesh(starGeo, starMatarial)
    star.scale.multiplyScalar(1/8) 
    star.rotation.y = Math.random()*2*Math.PI
    return star  
}

export function makeWorldStars(){
    while(allStars.length < 20){
        const newStar = makeAStar()
        newStar.position.z = Math.random() * 20 - 10
        newStar.position.x = Math.random() * 20 - 10
        scene.add(newStar)
        allStars.push(newStar)
    }
}