import React from 'react'
import { useSelector } from 'react-redux'
import './Leaderboard.scss'

const Leaderboard = () => {
    const records = useSelector(state => state.leaderboardReducer)

    return (
        <div>
            {records.length === 0 ? (
                <div>No records added yet!</div>
            ) : (
                <div className='records'>
                    <div className='record'>
                        <div className='record-item'>Place</div>
                        <div className='record-item'>Name</div>
                        <div className='record-item'>Correct Answers</div>
                        <div className='record-item'>Time</div>
                        <div className='record-item'>Points</div>
                    </div>
                    {records.map((record, index) => (
                        <div key={record.id} className='record'>
                            <div className='record-item'>{index + 1}</div>
                            <div className='record-item'>{record.name}</div>
                            <div className='record-item'>{record.correct}</div>
                            <div className='record-item'>{record.time}</div>
                            <div className='record-item'>{record.points}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Leaderboard
