import { ADD_RESULT, CLEAR_LEADERBOARD, SAVE_LEADERBOARD } from '../types'

const INITIAL_STATE = localStorage.getItem('quizLeaderboard')
? JSON.parse(localStorage.getItem('quizLeaderboard'))
: []

export const leaderboardReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case ADD_RESULT:
            return state
                .concat(payload.newRecord)
                .sort((a, b) => b.points - a.points)
        case CLEAR_LEADERBOARD:
            alert('Cleared successfully!')
            return state = []
        case SAVE_LEADERBOARD:
            localStorage.setItem('quizLeaderboard', JSON.stringify(state))
            return state
        default:
            return state
    }
}