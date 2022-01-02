import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setPlayerNameAction } from '../../redux/actions/playerActions'
import SVG from '../SVG/SVG'
import './HomePage.scss'

const HomePage = () => {
    const [name, setName] = useState('')
    const [canPlay, setCanPlay] = useState(false)
    const totalQuestions = useSelector(state => state.questionReducer.totalQuestions)
    const questionsToPlay = useSelector(state => state.questionReducer.questionsToPlay)
    const playerName = useSelector(state => state.playerReducer.player)
    const dispatch = useDispatch()

    const handleBlur = () => {
        dispatch(setPlayerNameAction(name))
    }

    useEffect(() => {
        setName(playerName)
    }, [playerName])

    useEffect(() => {
        if(name === '' || totalQuestions < 5){
            setCanPlay(false)
        } else setCanPlay(true)
    }, [name, totalQuestions])

    return (
        <div>
            <h2>Quiz App</h2>
            <div className='wrapper'>
                <div className='title'>
                    <h2>Welcome to Quiz App!</h2><br/>
                    To play, You need to:
                    <div className={`check ${totalQuestions >= questionsToPlay ? 'correct' : 'incorrect'}`}>
                        - add at least 5 question 
                        {totalQuestions >= questionsToPlay ? <SVG name='CORRECT_ICON'/> : <SVG name='INCORRECT_ICON'/>}
                    </div>
                    <div className={`check ${name !== '' ? 'correct' : 'incorrect'}`}>
                        - set Your nickname
                        {name !== '' ? <SVG name='CORRECT_ICON'/> : <SVG name='INCORRECT_ICON'/>}
                    </div>
                </div>
                <div className='question'>
                    <input type='text' placeholder='Name..' value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur}/>
                </div>
                <div className='button-box center horizontal'>
                    <Link className={`button ${canPlay ? 'link' : 'disabled'}`} to='/quiz'>Play</Link>
                    <Link className='button link' to='/questions'>Questions</Link>
                    <Link className='button link' to='/leaderboard'>Leaderboard</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
