import React from 'react'
import { icons } from './Icons'

const SVG = (props) => {
    const { name } = props
    if(!icons[name]) return null
    const { content } = icons[name]

    return (
        <div>
            { content }
        </div>
    )
}

export default SVG
