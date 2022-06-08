import { orderService } from "../../services/order.service.js"

export function getActionRemoveOrder(orderId) {
    return {
        type: 'REMOVE_ORDER',
        orderId
    }
}
export function getActionAddOrder(order) {
    return {
        type: 'ADD_ORDER',
        order
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: 'UPDATE_ORDER',
        order
    }
}

export function loadOrders(filterBy) {
    return async (dispatch) => {
        try {
            let orders = await orderService.query(filterBy)
            orders = orders.reverse()
            console.log('Orders from DB:', orders)
            dispatch({
                type: 'SET_ORDERS',
                orders
            })
        } catch (err) {
            console.log('Cannot load orders', err)
        }
    }
}

export function removeOrder(orderId) {
    return async (dispatch) => {
        try {
            await orderService.remove(orderId)
            console.log('Deleted Succesfully!')
            dispatch(getActionRemoveOrder(orderId))
        } catch (err) {
            console.log('Cannot remove order', err)
        }
    }
}

export function addOrder(order) {
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.save(order)
            console.log('Added Order', savedOrder)
            dispatch(getActionAddOrder(savedOrder))
            return order
        } catch (err) {
            console.log('Cannot add order', err)
        }
    }
}

export function updateOrder(order) {
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.save(order)
            console.log('Updated Order:', savedOrder)
            dispatch(getActionUpdateOrder(savedOrder))
        } catch (err) {
            console.log('Cannot save order', err)
        }
    }
}

export function loadOrdersCount() {
    return async (dispatch) => {
        try {
            let orders = await orderService.query()
            console.log('Orders from DB:', orders)
            const ordersCount = orders.length
            dispatch({
                type: 'SET_ORDERS_COUNT',
                ordersCount
            })
        } catch (err) {
            console.log('Cannot load orders', err)
        }
    }
}