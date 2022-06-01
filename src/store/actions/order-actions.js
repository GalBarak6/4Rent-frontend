import { orderService } from "../../services/order.service.js"
// import { userService } from "../../services/user.service.js"
// import { showErrorMsg } from '../../services/event-bus.service.js'


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

export function loadOrders() {
    return async (dispatch) => {
        try {
            const orders = await orderService.query()
            console.log('Orders from DB:', orders)
            dispatch({
                type: 'SET_ORDERS',
                orders
            })
        } catch (err) {
            // showErrorMsg('Cannot load orders')
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
            // showSuccessMsg('Order removed')
        } catch (err) {
            // showErrorMsg('Cannot remove order')
            console.log('Cannot remove order', err)
        }
    }
}

export function addOrder(order) {
    // console.log(order)
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.save(order)
            console.log('Added Order', savedOrder)
            dispatch(getActionAddOrder(savedOrder))
            // showSuccessMsg('Order added')
        } catch (err) {
            // showErrorMsg('Cannot add order')
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
            // showSuccessMsg('Order updated')
        } catch (err) {
            // showErrorMsg('Cannot update order')
            console.log('Cannot save order', err)
        }
    }
}