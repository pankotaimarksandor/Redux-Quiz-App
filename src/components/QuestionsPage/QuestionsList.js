import React from 'react'
import { useSelector } from 'react-redux'
import QuestionCard from './QuestionCard'

const QuestionsList = () => {
    const questions = useSelector(state => state.questionReducer.questions)

    return (
        <div>
            {questions.length < 1 ? (
                <div>No questions found!</div>
            ) : (
                questions.map((question, index) => (
                    <QuestionCard key={index} {...question} />
                ))
            )}
        </div>
    )
}

export default QuestionsList
