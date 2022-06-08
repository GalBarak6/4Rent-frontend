const initialState = {
    orders: [],
    count: ''
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    switch (action.type) {
        case 'SET_ORDERS':
            newState = { ...state, orders: action.orders }
            break
        case 'REMOVE_ORDER':
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case 'ADD_ORDER':
            newState = { ...state, orders: [action.order,...state.orders] }
            break
        case 'UPDATE_ORDER':
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        case 'SET_ORDERS_COUNT':
            newState = { ...state, count: action.ordersCount }
            break
        default:
    }
    return newState
}
