import {AmbientLight, DirectionalLight, MeshStandardMaterial, Mesh, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { makeWorldTrees } from './scene/trees'
import {makeWorldStars, allStars} from './scene/stars'

export const scene = new Scene()

const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)
camera.position.z = 5
camera.position.y = 2
camera.lookAt(0,0,0)
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
    console.log('hello')
    ground.rotation.x = -Math.PI/2
    scene.add(ground)
}


const render = () => {
    requestAnimationFrame(render)
    allStars.forEach(star => star.rotation.y +=.01)
    renderer.render(scene, camera)
}

function init() {
    setLighting()
    makeGround()
    makeWorldTrees()
    makeWorldStars()
    render()
}

init()