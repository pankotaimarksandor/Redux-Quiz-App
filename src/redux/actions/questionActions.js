import { ADD_QUESTION, EDIT_QUESTION, REMOVE_QUESTION, REMOVE_SELECTED_QUESTION, SAVE_QUESTIONS_TO_LOCAL, SELECTED_QUESTION, SET_QUIZ_QUESTIONS } from '../types'

export const addQuestionAction = (newQuestion) => {
    return { type: ADD_QUESTION, payload: { newQuestion } }
}

export const removeQuestionAction = (id) => {
    return { type: REMOVE_QUESTION, payload: { id } }
}

export const selectedQuestionAction = (id) => {
    return { type: SELECTED_QUESTION, payload: { id } }
}

export const removeSelectedQuestionAction = () => {
    return { type: REMOVE_SELECTED_QUESTION }
}

export const editQuestionAction = (id, editedQuestion) => {
    return { type: EDIT_QUESTION, payload: { id, editedQuestion } }
}

export const setQuizQuestionsAction = () => {
    return { type: SET_QUIZ_QUESTIONS }
}

export const saveQuestionsToLocalAction = () => {
    return { type: SAVE_QUESTIONS_TO_LOCAL }
}