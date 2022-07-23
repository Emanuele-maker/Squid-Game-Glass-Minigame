import { createServer } from "http"
import { Server as SocketServer } from "socket.io"
import Game from "./game/game.js"

const server = createServer()
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
})

const PORT = process.env.PORT || 3000

const game = new Game()
let intervalId

io.on("connection", socket => {
    const uid = socket.id

    console.log(`A client just connnected! UID: ${uid}`)

    const gameInterval = () => {
        intervalId = setInterval(() => {
            game.update()
            io.emit("gameState", game)
        })
    }

    game.createPlayer(uid)
    socket.emit("playerUID", uid)
    if (io.sockets.sockets.size === 1) gameInterval()

    socket.on("playerKeybinds", keybinds => {
        game.movePlayer(uid, keybinds)
    })

    socket.on("disconnect", reason => {
        game.deletePlayer(uid)
        if (io.sockets.sockets.size === 0) {
            clearInterval(intervalId)
        }
        console.log(`A client with UID of ${uid} just disconnected. Reason: ${reason}`)
    })
})

server.listen(PORT, undefined, undefined, () => console.log(`Server started on port ${PORT}`))