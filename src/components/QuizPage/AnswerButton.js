import React from 'react'

const AnswerButton = (props) => {
    const { answer, index, correct, reveal, selected, handleSelect } = props
    const letters = ['A', 'B', 'C', 'D']

    const correctStyle = reveal && correct === answer ? 'correct' : ''
    const inCorrectStyle = reveal && correct !== answer && selected === answer ? 'incorrect' : ''
    const selectedStyle = !reveal && selected === answer ? 'selected' : ''
    const disabled = selected !== '' ? 'disabled' : ''

    return (
        <div 
            onClick={() => handleSelect(index)} 
            className={`
                answer 
                ${correctStyle} 
                ${inCorrectStyle} 
                ${selectedStyle} 
                ${disabled} 
                ${index % 2 ? 'left' : 'right'}
            `}
            style={{cursor: 'pointer'}}
        >
            <div className='answer-letter'>{letters[index]}</div>
            <div className='answer-text'>{answer}</div>
        </div>
    )
}

export default AnswerButton
