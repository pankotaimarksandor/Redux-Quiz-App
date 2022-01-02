import React from 'react'
import { Link } from 'react-router-dom'
import QuestionsList from './QuestionsList'

const QuestionsPage = () => {
    return (
        <div>
            <h2>Manage Questions</h2>
            <div className='wrapper'>
                <div className='subtext'>
                    Welcome to the question manager!<br/>
                    You can add, edit or remove questions.<br/>
                </div>
                <div className='button-box center'>
                    <Link className='button link' to='/'>Back</Link>
                    <Link className='button link' to='/questions/add'>Add new</Link>
                </div>
            </div>
            <h2>Questions</h2>
            <div className='wrapper'>
                <QuestionsList />
            </div>
        </div>
    )
}

export default QuestionsPage
