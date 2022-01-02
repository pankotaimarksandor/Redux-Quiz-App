import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeQuestionAction, saveQuestionsToLocalAction } from '../../redux/actions/questionActions'

const QuestionCard = (props) => {
    const { question, answers, correct, id } = props
    const letters = ['A', 'B', 'C', 'D']
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(removeQuestionAction(id))
        dispatch(saveQuestionsToLocalAction())
    }

    return (
        <div>
            <div className='question'>{question}</div>
            <div className='answers-box'>
                {answers.map((answer, index) => (
                    <div key={index} className={`answer ${correct === answer ? 'correct' : ''} ${index % 2 ? 'left' : 'right'}`}>
                        <div className='answer-letter'>{letters[index]}</div>
                        <div className='answer-text'>{answer}</div>
                    </div>
                ))}
            </div>
            <div className='button-box right'>
                <Link className='button edit' to={`/questions/edit/${id}`}>Edit</Link>
                <button className='button delete' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default QuestionCard
