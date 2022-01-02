import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addResultAction, saveLeaderboardAction } from '../../redux/actions/leaderboardActions'
import { setQuizQuestionsAction } from '../../redux/actions/questionActions'
import AnswerButton from './AnswerButton'
import FinalScreen from './FinalScreen'
import './QuizPage.scss'

const MAX_POINT_PER_QUESTION = 30

const QuizPage = () => {
    const questions = useSelector(state => state.questionReducer.quizQuestions)
    const playerName = useSelector(state => state.playerReducer.player)
    const questionsToPlay = useSelector(state => state.questionReducer.questionsToPlay)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [reveal, setReveal] = useState(false)
    const [points, setPoints] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [totalTime, setTotalTime] = useState(0)
    const [isActiveTimer, setIsActiveTimer] = useState(false)
    const [endScreen, setEndScreen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setQuizQuestionsAction())
        setIsActiveTimer(true)
    }, [dispatch])

    useEffect(() => {
        let interval = null
        if(isActiveTimer){
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1)
            }, 1000)
        } else if (!isActiveTimer && seconds !== 0){
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActiveTimer, seconds])

    const resetTimer = () => {
        setSeconds(0)
    }

    const calculatePoints = (sec) => {
        let point = MAX_POINT_PER_QUESTION - sec
        if(point < 0) point = 0
        return point
    }

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(questions[currentQuestion].answers[index])
        setIsActiveTimer(false)
        setTimeout(() => {
            setReveal(true)
            if (questions[currentQuestion].answers[index] === questions[currentQuestion].correct){
                setCorrectAnswers(correctAnswers + 1)
                setPoints(calculatePoints(seconds) + points)
            } 
            setTotalTime(totalTime + seconds)
        }, 1000);
    }

    const handleNextClick = () => {
        if (currentQuestion === questionsToPlay - 1) {
            let newResult = {
                id: Date.now().toString(),
                name: playerName,
                correct: `${correctAnswers}/${questionsToPlay}`,
                points: points,
                time: totalTime.toString() + 's'
            }
            dispatch(addResultAction(newResult))
            dispatch(saveLeaderboardAction())
            resetTimer()
            setIsActiveTimer(false)
            setEndScreen(true)
        }
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer('')
        setReveal(false)
        resetTimer()
        setIsActiveTimer(true)
    }

    const playAgainHandler = () => {
        dispatch(setQuizQuestionsAction())
        setEndScreen(false)
        setCurrentQuestion(0)
        setReveal(false)
        setSeconds(0)
        setPoints(0)
        setCorrectAnswers(0)
        setTotalTime(0)
        setIsActiveTimer(true)
    }

    const canPlay = questions.length >= questionsToPlay && playerName !== ''

    return (
        <div>
            <h2>Quiz</h2>
            {endScreen && canPlay && (
                <div>
                <FinalScreen 
                    seconds={totalTime} 
                    questionsNumber={questionsToPlay} 
                    point={points} correct={correctAnswers} 
                    playAgainHandler={playAgainHandler}
                />
                </div>
            )}
            {!endScreen && canPlay && (
                <div>
                    <div className='wrapper quiz'>
                        {questions.length < 1 ? (
                            <h3>Loading...</h3>
                        ) : (
                            <div>
                                <div className='question'>{questions[currentQuestion].question}</div>
                                <div className='answers-box'>
                                    {questions[currentQuestion].answers.map((answer, index) => (
                                        <AnswerButton
                                            key={index}
                                            answer={answer}
                                            index={index}
                                            correct={questions[currentQuestion].correct}
                                            reveal={reveal}
                                            selected={selectedAnswer}
                                            handleSelect={handleAnswerSelect}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='button-box right'>
                            <button className={`button link ${!reveal ? 'disabled' : ''}`} onClick={handleNextClick}>Next</button>
                        </div>
                    </div>
                    <div className='scoreboard'>
                        <div className='item'>Time: {seconds}s</div>
                        <div className='item'>Question: {questionsToPlay}/{currentQuestion + 1}</div>
                        <div className='item'>Correct: {correctAnswers}/{questionsToPlay}</div>
                        <div className='item'>Points: {points}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuizPage
