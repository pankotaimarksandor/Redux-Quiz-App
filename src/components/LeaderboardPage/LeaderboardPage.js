import React from 'react'
import { useDispatch } from 'react-redux'
import Leaderboard from './Leaderboard'
import { Link } from 'react-router-dom'
import { clearLeaderboardAction, saveLeaderboardAction } from '../../redux/actions/leaderboardActions'

const LeaderboardPage = () => {
    const dispatch = useDispatch()

    const handleClear = () => {
        dispatch(clearLeaderboardAction())
        dispatch(saveLeaderboardAction())
    }

    return (
        <div>
            <h2>Leaderboard</h2>
            <div className='wrapper'>
                <Leaderboard />
                <div className='button-box right'>
                    <Link className='button link' to='/'>Back</Link>
                    <button className='button delete' onClick={handleClear}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPage
