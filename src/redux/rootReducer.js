import { combineReducers } from 'redux'
import { questionReducer } from './reducers/questionReducer'
import { playerReducer } from './reducers/playerReducer'
import { leaderboardReducer } from './reducers/leaderboardReducer'

const rootReducer = combineReducers({
    questionReducer,
    playerReducer,
    leaderboardReducer
})

export default rootReducer