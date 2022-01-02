import { ADD_RESULT, CLEAR_LEADERBOARD, SAVE_LEADERBOARD } from '../types'

export const addResultAction = (newRecord) => {
    return { type: ADD_RESULT, payload: { newRecord } }
}

export const clearLeaderboardAction = () => {
    return { type: CLEAR_LEADERBOARD }
}

export const saveLeaderboardAction = () => {
    return { type: SAVE_LEADERBOARD }
}