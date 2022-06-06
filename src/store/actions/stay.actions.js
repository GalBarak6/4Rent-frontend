import { stayService } from "../../services/stay.service.js";

export function getActionRemoveStay(stayId) {
    return {
        type: 'REMOVE_STAY',
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: 'ADD_STAY',
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: 'UPDATE_STAY',
        stay
    }
}

export function loadStays() {
    return async (dispatch, getState) => {
        const filterBy = getState().stayModule.filterBy
        try {
            const stays = await stayService.query(filterBy)
            dispatch({
                type: 'SET_STAYS',
                stays
            })
        } catch (err) {
            console.log('Cannot load stays', err)
        }
    }
}

export function removeStay(stayId) {
    return async (dispatch) => {
        try {
            await stayService.remove(stayId)
            console.log('Deleted Succesfully!')
            dispatch(getActionRemoveStay(stayId))
        } catch (err) {
            console.log('Cannot remove stay', err)
        }
    }
}

export function addStay(stay) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.save(stay)
            console.log('Added Stay', savedStay)
            dispatch(getActionAddStay(savedStay))
        } catch (err) {
            console.log('Cannot add stay', err)
        }
    }
}

export function updateStay(stay) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.save(stay)
            console.log('Updated Stay:', savedStay)
            dispatch(getActionUpdateStay(savedStay))
        } catch (err) {
            console.log('Cannot save stay', err)
        }
    }
}

export function setFilter(filterBy) {
    return dispatch => {
        dispatch({
            type: 'SET_STAYS_FILTER',
            filterBy
        })
    }
}

export function addReviewToStay(txt, stay, user) {
    return async (dispatch) => {
        try {
            const savedStay = await stayService.addReview(txt, stay, user)
            console.log('Updated Stay', savedStay)
            dispatch(getActionUpdateStay(savedStay))
        } catch (err) {
            console.log('Cannot update stay', err)
        }
    }
}
