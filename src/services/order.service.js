import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
}

function query() {
    return storageService.query(STORAGE_KEY)
    // return axios.get(`/api/order`)
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
    // return axios.get(`/api/order/${orderId}`)
}

async function remove(orderId) {
    await storageService.remove(STORAGE_KEY, orderId)
    // return axios.delete(`/api/order/${orderId}`)
    // await httpService.delete(`review/${reviewId}`)
}

async function save(order) {
    var savedorder
    if (order._id) {
        savedorder = await storageService.put(STORAGE_KEY, order)

    } else {
        // order.owner = userService.getLoggedinUser()
        savedorder = await storageService.post(STORAGE_KEY, order)
    }
    return savedorder
}
