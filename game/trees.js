import { ConeGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, Object3D } from "three"
import { scene } from "."


export const worldTrees = []

function makeTree(){
    const treeTopGeometry = new ConeGeometry(.5 , 2, 8, 8)
    const treeTopMaterial = new MeshStandardMaterial({color: 0x143306})
    const treeTop = new Mesh(treeTopGeometry, treeTopMaterial)
    treeTop.castShadow = true;
    treeTop.position.y = 1.5
    const treeTrunkGeometry = new CylinderGeometry(.1, .1, 1)
    const trunkMaterial = new MeshStandardMaterial({color: 0x886633})
    const treeTrunk = new Mesh(treeTrunkGeometry, trunkMaterial);
    treeTrunk.position.y = .5
    const tree = new Object3D()
    tree.add(treeTrunk)
    tree.add(treeTop)
    return tree;
}

export function makeWorldTrees() {
    while(worldTrees.length < 12){
        const newTree = makeTree()
        newTree.position.z = Math.random() * 20 - 10
        newTree.position.x = Math.random() * 20 - 10
        scene.add(newTree)
        worldTrees.push(newTree)
    }
}

export function addMoreTrees () {
    const newTree = makeTree()
    newTree.position.z = Math.random() * 20 - 10
    newTree.position.x = Math.random() * 20 - 10
    scene.add(newTree)
    worldTrees.push(newTree)
}