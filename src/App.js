import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import LeaderboardPage from './components/LeaderboardPage/LeaderboardPage'
import PageNotFound from './components/PageNotFound/PageNotFound'
import QuestionsPage from './components/QuestionsPage/QuestionsPage'
import QuizPage from './components/QuizPage/QuizPage'
import './styles/global.scss'
import AddQuestionPage from './components/AddQuestionPage/AddQuestionPage'
import EditQuestionPage from './components/EditQuestionPage/EditQuestionPage'

const App = () => {
    return (
        <div className='app'>
            <Router>
                <Routes>
                    <Route path='/' exact element={ <HomePage/> }/>
                    <Route path='/quiz' element={ <QuizPage/> }/>
                    <Route path='/leaderboard' element={ <LeaderboardPage/> }/>
                    <Route path='/questions' element={ <QuestionsPage/> }/>
                    <Route path='/questions/add' element={ <AddQuestionPage/> }/>
                    <Route path='/questions/edit/:id' element={ <EditQuestionPage/> }/>
                    <Route path='*' element={ <PageNotFound/> }/>
                </Routes>
            </Router>
        </div>
    )
}

export default App