import { ADD_QUESTION, EDIT_QUESTION, REMOVE_QUESTION, REMOVE_SELECTED_QUESTION, SAVE_QUESTIONS_TO_LOCAL, SELECTED_QUESTION, SET_QUIZ_QUESTIONS } from '../types'
import { defaultQuestions } from '../../questions/defaultQuestions'

const INITIAL_STATE = localStorage.getItem('quizQuestions')
    ? JSON.parse(localStorage.getItem('quizQuestions'))
    : {
        questions: defaultQuestions,
        totalQuestions: 5,
        questionsToPlay: 5,
        selectedQuestion: {},
        quizQuestions: []
    }

const shuffleQuestions = (questions, number) => {
    const shuffled = questions.sort(() => 0.5 - Math.random())
    const shuffledQuestions = shuffled.slice(0, number)
    console.log(shuffledQuestions[0].answers)
    return shuffledQuestions
}

export const questionReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case ADD_QUESTION:
            return {
                ...state,
                questions: state.questions.concat(payload.newQuestion),
                totalQuestions: state.totalQuestions + 1,
            }
        case REMOVE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter((question) => question.id !== payload.id),
                totalQuestions: state.totalQuestions - 1
            }
        case SELECTED_QUESTION: 
            const question = state.questions.filter((question) => question.id === payload.id)
            return {
                ...state,
                selectedQuestion: question[0]
            }
        case REMOVE_SELECTED_QUESTION:
            return {
                ...state,
                selectedQuestion: {}
            }
        case EDIT_QUESTION:
            return {
                ...state,
                questions: state.questions.map((q) => 
                    q.id === payload.id ? {...q, ...payload.editedQuestion} : q
                )
            }
        case SET_QUIZ_QUESTIONS:
            const shuffledQuizQuestions = shuffleQuestions([...state.questions], state.minimumQuestions)
            return {
                ...state,
                quizQuestions: shuffledQuizQuestions
            }
        case SAVE_QUESTIONS_TO_LOCAL:
            localStorage.setItem('quizQuestions', JSON.stringify(state))
            return state
        default:
            return state
    }
}