const listeners = {}

export const eventBusService = {
    on,
    emit
}

function on(eventName, listener) {
    listeners[eventName] = listeners[eventName] || []
    listeners[eventName].push(listener)
    return () => {
        listeners[eventName] = listeners[eventName].filter(func => func !== listener)
    }
}

function emit(eventName, data) {
    if (!listeners[eventName]) return
    listeners[eventName].forEach(listener => listener(data))
}