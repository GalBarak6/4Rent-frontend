import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy) {
    console.log('from stay.service', { filterBy })

    let stays = await storageService.query(STORAGE_KEY)
    console.log('from stay.service.query', { stays })

    if (filterBy.type.length > 0) {
        stays = stays.filter(stay =>
            filterBy.type.includes(stay.type))
    }
    if (filterBy.amenities.length > 0) {
            stays = stays.filter(stay => 
                filterBy.amenities.every(amenity=> {return   stay.amenities.includes(amenity) }))
             
                // Array.from(stay.amenities).filter(amenity => filterBy.amenities.includes(amenity)).length > 0)
                // stay.amenities.filter(amenity => filterBy.amenities.includes(amenity)).length > 0)
    }


    console.log({ stays })
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
