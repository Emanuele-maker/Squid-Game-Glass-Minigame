export default class Wall {
    constructor(x, y, w, h) {
        this.position = {
            x,
            y
        }
        this.scale = {
            width: w,
            height: h
        }
    }
}