import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addQuestionAction, saveQuestionsToLocalAction } from '../../redux/actions/questionActions'

const AddQuestionPage = () => {
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState(['', '', '', ''])
    const [correct, setCorrect] = useState(0)
    const dispatch = useDispatch()
    const letters = ['A', 'B', 'C', 'D']

    const handleAnswers = (e) => {
        let newAnswers = [...answers]
        newAnswers[e.target.name] = e.target.value

        setAnswers(newAnswers)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let newQuestion = {
            id: Date.now().toString(),
            question: question,
            answers: [
                answers[0],
                answers[1],
                answers[2],
                answers[3],
            ],
            correct: answers[correct]
        }

        dispatch(addQuestionAction(newQuestion))
        dispatch(saveQuestionsToLocalAction())
    }

    return (
        <div>
            <div className='title'>Add Question</div>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='question'>
                        <input type='text' placeholder='Question..' value={question} onChange={e => setQuestion(e.target.value)}/>
                    </div>
                    <div className='answers-box'>
                        {answers.map((answer, index) => (
                            <div key={index} className={`answer ${index % 2 ? 'left' : 'right'}`}>
                                <div className='answer-letter'>{letters[index]}
                                    <input type='radio' checked={correct === index} onChange={() => setCorrect(index)}/> 
                                </div>
                                <input type='text' value={answer} name={index} onChange={(e) => handleAnswers(e)}/>
                            </div>
                        ))}
                    </div>
                    <div className='button-box right'>
                        <Link className='button link' to='/questions'>Back</Link>
                        <button className='button add'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddQuestionPage