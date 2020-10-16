import {AmbientLight, DirectionalLight, MeshStandardMaterial, Mesh, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer, SphereGeometry} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { makeWorldTrees, worldTrees } from './trees'
import {makeWorldStars, allStars} from './stars'
import { starCollision, treeCollision } from './collisionLogic'

export const scene = new Scene()

export const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)
camera.position.z = 5
camera.position.y = 2

const renderer = new WebGLRenderer()
renderer.setClearColor(0xfffafa, 1)
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('game').appendChild(renderer.domElement)

//adding camera control
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableZoom = false

function setLighting() {
    const ambientLight = new AmbientLight(0x666666)
    scene.add(ambientLight)
    const directionlight = new DirectionalLight(0xdfebff, 1)
    directionlight.position.set(50,200,100)
    directionlight.castShadow = true
    scene.add(directionlight)
}

const makeGround = () => {
    const groundGeometry = new PlaneGeometry(20,20)
    const groundMaterial = new MeshStandardMaterial({color: 0x7cfc00})
    const ground = new Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI/2
    scene.add(ground)
}

export let ball
const makeBall = () => {
    const ballGeometry = new SphereGeometry(.25)
    const ballMaterial = new MeshStandardMaterial({color: 0x0000ff})
     ball = new Mesh(ballGeometry, ballMaterial)
     ball.position.y = .25
    scene.add(ball)
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
})

let changeXPosition = 0
let changeZPosition = 0
function checkKey(event){
    switch(event.key){
        case 'ArrowRight':
            changeXPosition = .1
            changeZPosition = 0
            break
        case 'ArrowLeft':
            changeXPosition = -.1
            changeZPosition = 0
            break
        case 'ArrowDown':
            changeXPosition = 0
            changeZPosition = .1
            break
        case 'ArrowUp':
            changeXPosition = 0
            changeZPosition = -.1
            break
        default:
            changeXPosition = 0
            changeZPosition = 0
    }
}

window.addEventListener('keydown', checkKey)
window.addEventListener('keyup', () => {
    changeZPosition = 0
    changeXPosition = 0
})
const render = () => {
    requestAnimationFrame(render)
    allStars.forEach(star => star.rotation.y +=.01)
    ball.rotation.x += changeXPosition
    ball.rotation.z += changeZPosition
    ball.position.x += changeXPosition
    ball.position.z += changeZPosition
    camera.position.x += changeXPosition
    camera.position.z += changeZPosition
    allStars.forEach(star => starCollision(star))
    worldTrees.forEach(tree => treeCollision(tree))
    renderer.render(scene, camera)
}

function init() {
    setLighting()
    makeGround()
    makeWorldTrees()
    makeWorldStars()
    makeBall()
    camera.lookAt(ball.position)
    render()
}

init()