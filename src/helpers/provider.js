const Provider = (intervalHandler, time = 1000 * 60 * 60 * 12) => {
    let INTERVAL_ID = {}
    let USER_TABLE = {}
    return (id) => {
        return {
            subscribe: () => {
                if (USER_TABLE[id]) return
                USER_TABLE[id] = 'subscribed'
                INTERVAL_ID[id] = setInterval(intervalHandler(id), time)
            },
            unsubscribe: () => {
                clearInterval(INTERVAL_ID[id])
                delete USER_TABLE[id]
            },
        }
    }
}

module.exports = { Provider }
