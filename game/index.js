import {AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer} from 'three'

const scene = new Scene()

const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('game').appendChild(renderer.domElement)

function setLighting() {
    const ambientLight = new AmbientLight(0x666666)
    scene.add(ambientLight)
    const directionlight = new DirectionalLight(0xdfebff, 1)
    directionlight.position.set(50,200,100)
    directionlight.castShadow = true
    scene.add(directionlight)
}


const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

function init() {
    setLighting()
}