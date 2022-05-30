import { stayService } from "../../services/stay.service.js";
// import { userService } from "../../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


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
            console.log('Stays from DB:', stays)
            dispatch({
                type: 'SET_STAYS',
                stays
            })
        } catch (err) {
            showErrorMsg('Cannot load stays')
            console.log('Cannot load stays', err)
        }
    }
}

export function removeStay(stayId) {
    return async (dispatch) => {
        try {
            await stayService.remove(stayId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveStay(stayId))
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
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
            showSuccessMsg('Stay added')
        } catch (err) {
            showErrorMsg('Cannot add stay')
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
            showSuccessMsg('Stay updated')
        } catch (err) {
            showErrorMsg('Cannot update stay')
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

export function addReviewToStay(txt, stay) {
    return async (dispatch) => {
        try {
            console.log('hi')
            const savedStay = await stayService.addReview(txt, stay)
            console.log('Updated Stay', savedStay)
            dispatch(getActionUpdateStay(savedStay))
            showSuccessMsg('Stay updated')
        } catch (err) {
            showErrorMsg('Cannot update stay')
            console.log('Cannot update stay', err)
        }
    }
}
