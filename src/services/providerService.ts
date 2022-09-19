import { HandlersSet } from './handlersSet'

export type ProviderHandler = (id: string) => () => void

interface MapDefaultObject {
    [key: string]: string
}

interface MapIntervalObject {
    [key: string]: ReturnType<typeof setInterval>
}

class Provider extends HandlersSet {
    private readonly INTERVAL_ID: MapIntervalObject
    private readonly USER_TABLE: MapDefaultObject
    private time: number
    private readonly handler: ProviderHandler
    constructor(handler: ProviderHandler, time: number = 10000 * 60 * 30) {
        super()
        this.USER_TABLE = {}
        this.INTERVAL_ID = {}
        this.time = time
        this.handler = handler
    }
    set timeSetter(time: number) {
        this.time = time
    }
    subscribe(id: string) {
        if (this.USER_TABLE[id]) return
        console.log(`Current time: ${this.time}`)
        this.USER_TABLE[id] = 'subscribed'
        this.INTERVAL_ID[id] = setInterval(this.handler(id), this.time)
    }
    unsubscribe(id: string) {
        clearInterval(this.INTERVAL_ID[id])
        delete this.USER_TABLE[id]
    }
}

export { Provider }
