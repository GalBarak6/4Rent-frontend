import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addReview,
    getNewOrder,
    getTotalGuestCount
}

async function query(filterBy) {
    // console.log('from stay.service', { filterBy })

    let stays = await storageService.query(STORAGE_KEY)
    // console.log('from stay.service.query', { stays })

    if (filterBy.type.length > 0) {
        stays = stays.filter(stay =>
            filterBy.type.includes(stay.type))
    }
    if (filterBy.amenities.length > 0) {
        stays = stays.filter(stay =>
            filterBy.amenities.every(amenity => { return stay.amenities.includes(amenity) }))
    }

    if (filterBy.price) {
        stays = stays.filter(stay => stay.price >= filterBy.price)
    }
    if (filterBy.label) {
        // stays = stays.filter(stay => filterBy.label.includes(stay.labels))
        stays = stays.filter(stay => {
            // console.log(stay.labels)
            return stay.labels.includes(filterBy.label)
        })
    }
    return stays

    // return storageService.query(STORAGE_KEY)
    // return axios.get(`/api/stay`)
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
    // return axios.get(`/api/stay/${stayId}`)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
    // return axios.delete(`/api/stay/${stayId}`)
    // await httpService.delete(`review/${reviewId}`)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)

    } else {
        // stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}


async function addReview(txt, stay) {
    console.log('addreview')
    const review = { id: utilService.makeId(), txt, date: 'March 2022', by: { _id: '622f3407e36c59e6164fbe6a', fullname: 'Mike', imgUrl: 'https://randomuser.me/portraits/men/69.jpg' } }
    stay.reviews.push(review)
    const savedStay = save(stay)
    return savedStay
}

function getNewOrder(order, guestCount, stay) {
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
        stay: stay.name
    }
    return newOrder
}

function getTotalGuestCount(guestCount) {
    const totalCount = guestCount.adult + guestCount.children + guestCount.infant
    return totalCount
}