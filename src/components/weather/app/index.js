import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { DayList, Detail, Error, Select, data } from '../index'
import './index.css'

const calculateFahrenheit = value =>
  Math.round((parseFloat(value) - 273.15) * 1.8 + 32)

const calculateCelcius = value => Math.round(parseFloat(value) - 273.15)

const fetchData = url => {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
}

const Weather = () => {
  const [currentCity, setCurrentCity] = useState(data.cities[0])
  const [currrentDay, setCurrrentDay] = useState(moment().date())
  const [errorMessage, setErrorMessage] = useState('')
  const [errorShow, setErrorShow] = useState(false)
  const [weekdays, setWeekdays] = useState([])
  const [celcius, setCelcius] = useState(true)
  const [detail, setDetail] = useState(null)
  const [apiKey, setApiKey] = useState(data.API_KEY)

  useEffect(() => {
    loadCityData()
      .then(data => showDetail(data))
      .then(data => showWeekData(data))
  }, [])

  const handleChange = value => {
    setCurrentCity(value)
    loadCityData()
      .then(data => showDetail(data))
      .then(data => showWeekData(data))
  }

  // Calcular temperatura
  const calculateTemp = temp =>
    celcius ? calculateCelcius(temp) : calculateFahrenheit(temp)

  const loadCityData = () => {
    return fetchData(
      `http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`
    )
  }

  const loadWeekData = () => {
    return fetchData(
      `http://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}`
    )
  }

  // Mostrar temperatura actual
  const showDetail = data => {
    return new Promise((resolve, reject) => {
      setDetail({
        description: data.weather[0].description,
        temp: calculateTemp(data.main.temp),
        location: data.name,
      })

      resolve(loadWeekData())
    })
  }

  // Mostrar temperatura semana
  const showWeekData = data => {
    setWeekdays([])
    const addedItems = []
    const { list: dataDays } = data
    let currentDay = null

    // remover dia actual del array original
    const dataDaysFiltered = dataDays.filter(item => {
      const { dt_txt } = item
      return moment(dt_txt).date() !== moment().date()
    })

    dataDaysFiltered.forEach(item => {
      const { dt_txt: dateTimeTxt } = item
      if (!currentDay) currentDay = dateTimeTxt

      // temperatura
      let { temp } = item.main
      temp = calculateTemp(temp)

      // Hora
      const time = moment(dateTimeTxt).format('HH:mm')

      const isDayAdded = addedItems.find(item => {
        const { day } = item
        return day === moment(dateTimeTxt).date()
      })

      // Existe el dia
      if (isDayAdded !== undefined) {
        const { hours } = isDayAdded
        const data = [...hours, { temp, time }]
        isDayAdded.hours = data
      } else {
        const day = {
          day: moment(dateTimeTxt).date(),
          dayName: moment(dateTimeTxt).format('dddd'),
          hours: [
            {
              temp,
              time,
            },
          ],
        }

        addedItems.push(day)
      }
    })

    setWeekdays(addedItems)
  }

  return (
    <div className="weather">
      <Error message={errorMessage} show={errorShow} />
      <Select
        key={`select-${currentCity}`}
        currentCity={currentCity}
        onChange={handleChange}
      />
      <Detail key={`detail-${currentCity}`} data={detail} />
      <DayList key={`daylist-${currentCity}`} weekdays={weekdays} />
    </div>
  )
}

export default Weather
