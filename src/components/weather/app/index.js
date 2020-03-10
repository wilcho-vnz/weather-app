import React from 'react'
import moment from 'moment'

import { DayList, Detail, Select, data } from '../index'
import './index.css'

class Weather extends React.Component {
    state = {
        currentCity: data.cities[0],
        currrentDay: moment().date(),
        weekdays: null,
        celcius: true,
        fahrenheit: false,
        detail: null,
        API_KEY: data.API_KEY
    }

    handleChange = value => {
        this.setState({
            currentCity: value
        }, () => {
            this.loadDetailData()
            this.loadWeekData()
        })
    }

    // Calcular temperatura
    calculateTemp = temp => ( this.state.fahrenheit ) ? Math.round(((parseFloat(temp)-273.15)*1.8)+32) : Math.round(parseFloat(temp)-273.15)

    // Mostrar temperatura actual
    showDetail = (data) => 
        this.setState({
            detail: {
                description: data.weather[0].description,
                temp: this.calculateTemp(data.main.temp),
                location: data.name
            }
        })
    
    // Mostrar temperatura semana
    showWeekData = data => {
        let currentDay = null
        let loopDateTime = null
        const weekdays = []

        // remover dia actual del array original
        const filteredArray = data.list.filter( item => moment(item.dt_txt).date() > moment().date() )

        filteredArray.forEach(item => {

            loopDateTime = item.dt_txt
            if( !currentDay ) currentDay = loopDateTime

            // temperatura
            const temp = this.calculateTemp(item.main.temp)

            // Hora
            const time = moment(loopDateTime).format("HH:mm")

            // buscar si el dia ya esta en el array de la semana
            const result = weekdays.find( item => item.day === moment(loopDateTime).date() )

            // Existe el dia
            if(result !== undefined) result.hours.push({ temp, time })
            
            // No existe, crear objeto del dia que con tiene el array de horarios
            else {
                const day = {
                    day: moment(loopDateTime).date(),
                    dayName: moment(loopDateTime).format('dddd'),
                    hours: [{
                        temp,
                        time
                    }]
                }

                weekdays.push(day)
            }
        })

        this.setState({
            weekdays
        })
    }

    loadDetailData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.currentCity}&appid=${this.state.API_KEY}`)
        .then((response) => response.json())
        .then((data) => this.showDetail(data))
        .catch((error) => {
            console.error('Error loadDetailData():', error);
        });
    }

    loadWeekData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.currentCity}&appid=${this.state.API_KEY}`)
        .then((response) => response.json())
        .then((data) => this.showWeekData(data))
        .catch((error) => {
            console.error('Error loadWeekData():', error);
        });
    }

    componentDidMount() {
        this.loadDetailData()
        this.loadWeekData()
    }

    render() {
        return (
            <div className="weather">
                <Select key={`select-${this.state.currentCity}`} currentCity={this.state.currentCity} onChange={this.handleChange} />
                <Detail key={`detail-${this.state.currentCity}`} data={this.state.detail} />
                <DayList key={`daylist-${this.state.currentCity}`} weekdays={this.state.weekdays} />
            </div>
        )
    }
}

export default Weather