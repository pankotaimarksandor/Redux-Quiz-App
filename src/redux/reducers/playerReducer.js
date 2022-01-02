import { SET_PLAYER_NAME } from '../types'

const INITIAL_STATE = {
    player: ''
}

export const playerReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case SET_PLAYER_NAME:
            return {
                ...state,
                player: payload.newName
            }
        default:
            return state
    }
}