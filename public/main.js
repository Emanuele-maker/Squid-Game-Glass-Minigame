import InputManager from "./input.js"

const socket = io("https://3ymqx8.sse.codesandbox.io/")
let game, uid

socket.on("gameState", state => game = state)
socket.on("playerUID", id => uid = id)

const canvas = document.body.appendChild(document.createElement("canvas"))
const ctx = canvas.getContext("2d")

const input = new InputManager()

let CANVAS_WIDTH
let CANVAS_HEIGHT
const GAME_WIDTH = 1280
const GAME_HEIGHT = 720
const ratio = 16 / 9

const resize = () => {
    CANVAS_WIDTH = window.innerWidth - 4
    CANVAS_HEIGHT = window.innerHeight - 4

    if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio) {
        CANVAS_WIDTH = CANVAS_HEIGHT * ratio
    } else {
        CANVAS_HEIGHT = CANVAS_WIDTH / ratio
    }
    canvas.style.aspectRatio = "16 / 9"

    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    canvas.style.width = `${CANVAS_WIDTH}px`
    canvas.style.height = `${CANVAS_HEIGHT}px`
    canvas.style.position = "absolute"
    canvas.style.left = "50%"
    canvas.style.top = "50%"
    canvas.style.transform = "translate(-50%, -50%)"
}

resize()
window.addEventListener("resize", resize)

ctx.font = "100px Comic Sans MS"
ctx.textAlign = "center"

const gameUpdate = () => {
    const clientPlayer = game.players.find(player => player.uid === uid)
    const otherPlayers = game.players.filter(player => player.uid !== uid)
    const glassPlanes = game.glassPlanes

    const camera = {
        get x() {
            return -(canvas.width / 2 - (clientPlayer.position.x + clientPlayer.scale.width / 2))
        },
        get y() {
            return -(canvas.height / 2 - (clientPlayer.position.y + clientPlayer.scale.height / 2))
        }
    }

    ctx.fillStyle = "yellow"
    glassPlanes.forEach(plane => {
        ctx.fillRect(plane.position.x - camera.x, plane.position.y - camera.y, plane.scale.width, plane.scale.height)
    })

    ctx.fillStyle = "red"
    ctx.fillRect(clientPlayer.position.x - camera.x, clientPlayer.position.y - camera.y, clientPlayer.scale.width, clientPlayer.scale.height)

    ctx.fillStyle = "blue"
    otherPlayers.forEach(player => {
        ctx.fillRect(player.position.x - camera.x, player.position.y - camera.y, player.scale.width, player.scale.height)
    })
}

const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#161616"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    socket.emit("playerKeybinds", input.keysPressed)

    if (game) gameUpdate()

    requestAnimationFrame(render)
}
render()