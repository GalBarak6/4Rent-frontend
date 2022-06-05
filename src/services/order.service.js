// import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getBtnMouseListener,
    getCalculatedPrice,
    getTotalAsNum,
    getNewOrder
}

async function query() {
    // return storageService.query(STORAGE_KEY)
    // return axios.get(`/api/order`)
    let orders = await httpService.get(`order/`)
    return orders
}

async function getById(orderId) {
    // return storageService.get(STORAGE_KEY, orderId)
    // return axios.get(`/api/order/${orderId}`)
    let order = await httpService.get(`order/${orderId}`)
    return order
}

async function remove(orderId) {
    // await storageService.remove(STORAGE_KEY, orderId)
    // return axios.delete(`/api/order/${orderId}`)
    await httpService.delete(`order/${orderId}`)
}

async function save(order) {
    var savedorder
    if (order._id) {
        // savedorder = await storageService.put(STORAGE_KEY, order)
        savedorder = await httpService.put(`order/${order._id}`, order)
    } else {
        // order.owner = userService.getLoggedinUser()
        // savedorder = await storageService.post(STORAGE_KEY, order)
        savedorder = await httpService.post(`order`, order)
    }
    return savedorder
}

function getBtnMouseListener() {
    let btn = document.querySelector('.mouse-cursor-gradient-tracking')
    btn.addEventListener('mousemove', e => {
        let rect = e.target.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        btn.style.setProperty('--x', x + 'px')
        btn.style.setProperty('--y', y + 'px')
    })
}

function getCalculatedPrice(type, price, nights) {
    let total = 0
    switch (type) {
        case 'night':
            total = price.toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return total
        case 'nights':
            total = (price * nights).toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return total
        case 'cleaning':
            total = (price * 0.04).toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return total
        case 'service':
            total = (price * 0.005).toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return total
        case 'sum':
            total = (price * nights + price * 0.04 + price * 0.005).toLocaleString('en-IN', { maximumFractionDigits: 0 })
            return total
    }
}

function getTotalAsNum(price, nights) {
    const total = +(price * nights + price * 0.04 + price * 0.005).toFixed()
    return total
}

function getNewOrder(order, guestCount, stay, total) {
    const newOrder = {
        startDate: order.startDate,
        endDate: order.endDate,
        guests: {
            adults: guestCount.adult,
            kids: guestCount.children,
            infants: guestCount.infant
        },
        dest: {
            country: stay.loc.country,
            countryCode: stay.loc.countryCode,
            address: stay.loc.address,
            lat: stay.loc.lat,
            lng: stay.loc.lan
        },
        host: {
            _id: '6294cc5df218f12d17952cc5',
            fullname: 'Linda-Lee',
            pictureUrl: 'https://randomuser.me/api/portraits/women/22.jpg'
        },
        booker: {
            _id: '6294d477f218f12d17a3c74b',
            fullname: 'Edgar',
            imgUrl: 'https://randomuser.me/api/portraits/men/52.jpg'
        },
        status: 'pending',
        stay: stay.name,
        total
    }
    return newOrder
}
