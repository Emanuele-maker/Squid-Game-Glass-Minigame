import { GLASS_PLANE_SIZE } from "./constants.js"

export default class GlassPlane {
    constructor(x, y, valid) {
        this.valid = valid
        this.scale = {
            width: GLASS_PLANE_SIZE,
            height: GLASS_PLANE_SIZE
        }
        this.position = { x, y }
    }
}