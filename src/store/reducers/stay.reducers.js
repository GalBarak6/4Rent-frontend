const initialState = {
    stays: [],
    filterBy: {
        type: [],
        amenities: [],
        price: '',
        label: '',
        rating: ''
    },
    // reviews: []
}
export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    switch (action.type) {
        case 'SET_STAYS':
            newState = { ...state, stays: action.stays }
            break
        case 'REMOVE_STAY':
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case 'ADD_STAY':
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case 'UPDATE_STAY':
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case 'SET_STAYS_FILTER':
            return { ...state, filterBy: action.filterBy }
        case 'ADD_REVIEW':
            return { ...state, reviews: [...state.reviews, action.review] }
        default:
    }
    return newState
}
