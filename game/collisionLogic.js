import {camera, ball} from '.'
import { addMoreTrees } from "./trees"


const scoreBoard = document.getElementById('score')
let score = 0

export const starCollision = (star) => {
    const xPosition = star.position.x - ball.position.x
    const zPosition = star.position.z - ball.position.z
    if(xPosition < .2 && xPosition > -.2 && zPosition < .2 && zPosition > -.2){
        star.position.x = Math.random() *20 -10
        star.position.z = Math.random() *20 -10
        score += 20
        scoreBoard.innerText = score
        if(score > 200 && score%200 < 10){
            addMoreTrees()
        }
    }
}

export const treeCollision = (tree) => {
    const xPosition = tree.position.x - ball.position.x
    const zPosition = tree.position.z - ball.position.z
    if(xPosition < .2 && xPosition > -.2 && zPosition < .2 && zPosition > -.2){
        score -= 10
        scoreBoard.innerText = score
        ball.position.z = 0
        ball.position.x = 0
        camera.position.z = 5
        camera.position.x = 0
        camera.lookAt(ball.position)
    }
}