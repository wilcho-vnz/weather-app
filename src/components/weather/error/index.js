import React from 'react'
import './index.css'

const Error = (props) => {
    const {message} = props
    const {show} = props

    return (
        <div className={(show) ? 'alert alert--error show' : 'alert alert--error'}>
            {message}
        </div>
    )
}

export default Error