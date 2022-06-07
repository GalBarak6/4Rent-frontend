import { userService } from '../../services/user.service.js'

const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'UPDATE_USER':
            // var users = state.users.map(user => (user._id === action.user._id) ? action.user : user)
            // console.log('users?' , users)
            newState =  { ...state, user: action.savedUser }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
