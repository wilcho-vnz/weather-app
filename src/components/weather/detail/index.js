import React from 'react'
import './index.css'

const Detail = (props) => {

    const { data } = props

    return (
        ! data
        ? 'Loading...'
        : <div className="detail">
            <p className="description">{ data.description }</p>
            <p className="temp">{ data.temp }&deg;</p>
            <p className="location">{ data.location }</p>
        </div>
    )
}

export default Detail



