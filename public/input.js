export default class InputManager {
    constructor() {
        this.keysPressed = []
        window.addEventListener("keydown", event => {
            if (!this.keysPressed.includes(event.keyCode)) this.keysPressed.push(event.keyCode)
        })
        window.addEventListener("keyup", event => {
            const keyIndex = this.keysPressed.indexOf(event.keyCode)
            if (keyIndex === -1) return
            this.keysPressed.splice(keyIndex, 1)
        })
    }
    isKeyPressed(keyCode) {
        return this.keysPressed.includes(keyCode)
    }
}