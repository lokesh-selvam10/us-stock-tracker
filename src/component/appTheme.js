import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { normalTheme, darkTheme } from '../actions'
import Switch from '@material-ui/core/Switch';
// import store from '../actions'

function AppTheme(props) {
    const [push, setPush] = useState(true);
    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const handlechange = () => {
        if (push) {
            dispatch(darkTheme())
            setPush(false)
        }
        else {
            dispatch(normalTheme())
            setPush(true)
        }
        props.theme(theme)
        return theme
    }
    return (
        <div>
            <h1>{}</h1>
            <Switch onChange={() => handlechange()}></Switch>
        </div>
    )
}

export default AppTheme