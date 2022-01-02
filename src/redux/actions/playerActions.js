import { SET_PLAYER_NAME } from '../types'

export const setPlayerNameAction = (newName) => {
    return { type: SET_PLAYER_NAME, payload: { newName } }
}