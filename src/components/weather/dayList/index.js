import React from 'react'
import './index.css'

const Hour = (props) => {
    const { temp, time } = props

    return (
        <li className="hour__item">
            <p className="time">{ time }</p>
            <p className="temperature">{ temp } &deg;</p>
        </li>
    )
}

const Day = (props) => {
    const { dayName, hours } = props

    return (
        <div className="day__item">
            <h6 className="dayname">{ dayName }</h6>
            <ul className="hour__items">
                { hours.map((item, index) => <Hour key={index} temp={item.temp} time={item.time} />) }
            </ul>
        </div>
        
    )
}




const DayList = (props) => {
    const { weekdays } = props
    return (
        <div className="day__items">
            { (weekdays) ? weekdays.map((item, index) => <Day key={index} dayName={item.dayName} hours={item.hours} />) : 'loading...' }
        </div>
    )
}

export default DayList