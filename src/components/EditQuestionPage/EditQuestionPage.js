import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { editQuestionAction, removeSelectedQuestionAction, selectedQuestionAction, saveQuestionsToLocalAction } from '../../redux/actions/questionActions'

const EditQuestionPage = () => {
    const { id } = useParams()
    const selectedQuestion = useSelector(state => state.questionReducer.selectedQuestion)
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState(['', '', '', ''])
    const [correct, setCorrect] = useState(0)
    const dispatch = useDispatch()
    const letters = ['A', 'B', 'C', 'D']

    useEffect(() => {
        dispatch(selectedQuestionAction(id))
        
        return () => {
            dispatch(removeSelectedQuestionAction())
        }
    }, [dispatch, id])

    useEffect(() => {
        if(Object.keys(selectedQuestion).length > 0){
            const q = selectedQuestion.question
            const a = selectedQuestion.answers
            const c = a.indexOf(selectedQuestion.correct)

            setQuestion(q)
            setAnswers(a)
            setCorrect(c)
        }
    }, [selectedQuestion])

    const handleAnswers = (e) => {
        let newAnswers = [...answers]
        newAnswers[e.target.name] = e.target.value

        setAnswers(newAnswers)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(question === '' || answers[0] === '' || answers[1] === '' || answers[2] === '' || answers[3] === '' ) return alert('All fields must be filled!')

        let editedQuestion = {
            id: id,
            question: question,
            answers: [
                answers[0],
                answers[1],
                answers[2],
                answers[3],
            ],
            correct: answers[correct]
        }

        dispatch(editQuestionAction(id, editedQuestion))
        dispatch(saveQuestionsToLocalAction())
    }

    return (
        <div>
            {Object.keys(selectedQuestion).length < 1 ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className='title'><h2>Edit Question</h2></div>
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
                                <button className='button add'>Save</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditQuestionPage
