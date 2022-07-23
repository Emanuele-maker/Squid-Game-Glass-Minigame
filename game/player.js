import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js"

export default class Player {
    constructor(uid) {
        this.uid = uid
        this.scale = {
            width: 60,
            height: 60
        }
        this.position = {
            x: (GAME_WIDTH / 2) - (this.scale.width / 2),
            y: GAME_HEIGHT - this.scale.height * 2
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.maxSpeed = 4
    }
    move(keybinds) {
        if (keybinds.includes(37) || keybinds.includes(65)) this.moveLeft()
        if (keybinds.includes(39) || keybinds.includes(68)) this.moveRight()
        if (keybinds.includes(38) || keybinds.includes(87)) this.moveUp()
        if (keybinds.includes(40) || keybinds.includes(83)) this.moveDown()

        if (!keybinds.includes(37) && !keybinds.includes(65) && !keybinds.includes(39) && !keybinds.includes(68)) this.stopX()
        if (!keybinds.includes(38) && !keybinds.includes(87) && !keybinds.includes(40) && !keybinds.includes(83)) this.stopY()
    }
    stopX() {
        this.speed.x = 0
    }
    stopY() {
        this.speed.y = 0
    }
    moveLeft() {
        this.speed.x = -this.maxSpeed
    }
    moveRight() {
        this.speed.x = this.maxSpeed
    }
    moveUp() {
        this.speed.y = -this.maxSpeed
    }
    moveDown() {
        this.speed.y = this.maxSpeed
    }
    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}