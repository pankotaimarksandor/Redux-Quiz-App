import React from 'react'
import { Link } from 'react-router-dom'
import Leaderboard from '../LeaderboardPage/Leaderboard'

const FinalScreen = (props) => {
    const { point, correct, seconds, questionsNumber, playAgainHandler } = props
    return (
        <div>
            <div className='wrapper'>
                Congratulations!<br/>
                You scored <b>{correct}/{questionsNumber}</b> correct questions in just <b>{seconds}s</b><br/>
                Total points earned: <b>{point}</b>
                <div className='button-box right'>
                    <Link className='button link' to='/'>Home</Link>
                    <button className='button link' onClick={playAgainHandler}>Play again</button>
                </div>
                <Leaderboard />
            </div>
        </div>
    )
}

export default FinalScreen
