import Player from "./player.js"
import GlassPlane from "./glassPlane.js"
import { GAME_WIDTH, GAME_HEIGHT, GLASS_PLANE_SIZE } from "./constants.js"

export default class Game {
    constructor() {
        this.players = []
        this.glassPlanes = []
        this.generatePlanes()
        this.objects = [this.glassPlanes, this.players]
    }
    detectCollision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {      
        return r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h
    }
    generatePlanes() {
        this.glassPlanes = []
        const numberOfRows = 10
        const gapX = 40
        const gapY = GLASS_PLANE_SIZE + 90
        const rowX = (GAME_WIDTH / 2 - gapX - GLASS_PLANE_SIZE)
        const startingY = 300
        
        for (let i = 0, y = startingY; i < numberOfRows; i++, y -= gapY) {
            const random = Math.round(Math.random())
            console.log(`Riga numero ${i} è quella a ${random === 0 ? "SINISTRA" : "DESTRA"}`)
            this.glassPlanes.push(new GlassPlane(rowX, y, random === 0))
            this.glassPlanes.push(new GlassPlane(rowX + GLASS_PLANE_SIZE + gapX, y, random === 1))
        }
    }
    createPlayer(uid) {
        this.players.push(new Player(uid))
    }
    deletePlayer(uid) {
        const playerIndex = this.players.findIndex(player => player.uid === uid)
        if (playerIndex === -1) return console.warn(`Could not delete a player with UID of ${uid}`)
        this.players.splice(playerIndex, 1)
    }
    movePlayer(uid, keybinds) {
        const player = this.players.find(player => player.uid === uid)
        if (!player) return console.warn(`Could not move a player with UID of ${uid}`)
        player.move(keybinds)
    }
    update() {
        this.objects.forEach(object => {
            if (Array.isArray(object)) return object.forEach(obj => obj.update && obj.update())
            object.update && object.update()
        })

        this.players.forEach(player => {
            this.glassPlanes.forEach((plane, planeIndex) => {
                if (this.detectCollision(player.position.x, player.position.y, player.scale.width, player.scale.height, plane.position.x, plane.position.y, plane.scale.width, plane.scale.height) && !plane.valid) {
                    this.glassPlanes.splice(planeIndex, 1)
                    player.position.x = (GAME_WIDTH / 2) - (player.scale.width / 2)
                    player.position.y = GAME_HEIGHT - player.scale.height * 2
                }
            })
        })
    }
}