import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'
const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addReview,
    getTotalGuestCount,
    getTotalReviewScore
}

async function query(filterBy = { type: [], amenities: [], price: '', label: '', rating: '', city: '' }) {
    let stays = await httpService.get(`stay/?type=${filterBy.type}&city=${filterBy.city}&price=${filterBy.price}&label=${filterBy.label}&rating=${filterBy.rating}&host=${filterBy.host}&capacity=${filterBy.capacity}`)
    return stays
}

async function getById(stayId) {
    // return storageService.get(STORAGE_KEY, stayId)
    let stay = await httpService.get(`stay/${stayId}`)
    return stay
}

async function remove(stayId) {
    // await storageService.remove(STORAGE_KEY, stayId)
    // return axios.delete(`/api/stay/${stayId}`)
    console.log(stayId);
    await httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        // savedStay = await storageService.put(STORAGE_KEY, stay)
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        // stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addReview(txt, stay, user) {
    const review = { id: utilService.makeId(), txt, date: 'June 2022', by: user }
    stay.reviews.unshift(review)
    const savedStay = save(stay)
    return savedStay
}

function getTotalGuestCount(guestCount) {
    let totalGuests = 0
    for (let value in guestCount) {
        totalGuests += guestCount[value]
    }
    return totalGuests
}

function getTotalReviewScore(reviewScores) {
    let totalScores = 0
    for (let value in reviewScores) {
        totalScores += reviewScores[value]
    }
    totalScores = totalScores / Object.keys(reviewScores).length
    return totalScores.toFixed(1)
}