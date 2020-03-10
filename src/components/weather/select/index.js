import React from 'react'
import { data } from '../index.js'
import './index.css'

class Select extends React.Component {

    state = {
        value: data.cities[0]
    }

    constructor(props) {
        super(props)
    }

    onChange = (e, onChange) => {
        this.setState({
            value: e.target.value
        }, () => {
            onChange(this.state.value)
        })
    }

    render() {
        const { currentCity, onChange } = this.props
        
        return (
            <form className="form">
                <label city="city" >City</label>
                <select className="city" className="select" onChange={(e) => this.onChange(e, onChange)} value={currentCity}>
                    { data.cities.map((item, index) => <option key={index} value={item}>{item}</option>) }
                </select>
            </form>
        )
    }
    
}

export default Select