import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
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

// async function query(filterBy) {
//     // console.log('from stay.service', { filterBy })

//     let stays = await storageService.query(STORAGE_KEY)
//     // console.log('from stay.service.query', { stays })

//     if (filterBy.type.length > 0) {
//         stays = stays.filter(stay =>
//             filterBy.type.includes(stay.type))
//     }
//     if (filterBy.amenities.length > 0) {
//         stays = stays.filter(stay =>
//             filterBy.amenities.every(amenity => { return stay.amenities.includes(amenity) }))
//     }

//     if (filterBy.price) {
//         stays = stays.filter(stay => stay.price >= filterBy.price)
//     }
//     if (filterBy.label) {
//         // stays = stays.filter(stay => filterBy.label.includes(stay.labels))
//         stays = stays.filter(stay => {
//             // console.log(stay.labels)
//             return stay.labels.includes(filterBy.label)
//         })
//     }

//     if (filterBy.rating) {
//         stays = stays.filter(stay => stay.reviewScores.rating >= filterBy.rating)
//     }
//     return stays

//     // return storageService.query(STORAGE_KEY)
//     // return axios.get(`/api/stay`)
//     // await httpService.get(`stay/`)
// }



async function query(filterBy = { type: [], amenities: [], price: '', label: '', rating: '', city:'' }) {
    let stays = await httpService.get(`stay/?type=${filterBy.type}&city=${filterBy.city}&price=${filterBy.price}&label=${filterBy.label}&rating=${filterBy.rating}&host=${filterBy.host}`)
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
    console.log(savedStay);
    return savedStay
}

async function addReview(txt, stay) {
    console.log('addreview')
    const review = { id: utilService.makeId(), txt, date: 'June 2022', by: { _id: '6295ce47c5274e3f84a8c2b5', fullname: 'Edgar', imgUrl: 'https://randomuser.me/api/portraits/men/52.jpg' } }
    stay.reviews.push(review)
    const savedStay = save(stay)
    return savedStay
}

function getTotalGuestCount(guestCount) {
    // const totalCount = guestCount.adult + guestCount.children + guestCount.infant
    // return totalCount
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
    // const totalScores = ((reviewScores.accuracy + reviewScores.cleanliness +
    //     reviewScores.communication + reviewScores.checkin + reviewScores.location + reviewScores.value) / Object.keys(reviewScores).length).toFixed(1)
    return totalScores.toFixed(1)
}