import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './App.css';

import { normalTheme, darkTheme } from './actions'

import { Grid,Switch } from "@material-ui/core";
import { ThemeProvider } from 'styled-components';
import { getThemes } from "./getThemes";
import { Header } from "./styles"


import { SearchSelectComp } from './component/search/searchSelect'
import { CardComp } from './component/card/displayCard'

export const ChartDataContext = React.createContext()

function mapStateToProps(state) {
    return {
        active: state.theme
    }
}

function mapDispatchToProps(dispatch) {
    return {
        theme: theme => { theme === "darkTheme" ? dispatch(darkTheme()) : dispatch(normalTheme()) }
    };
}

function App({ theme, active }) {

    const [data, setData] = useState([]);
    const [push, setPush] = useState(false);
    const [chartData, setChartData] = useState([]);

    const handlechange = () => {
        setPush(!push)
    }
    useEffect(() => {
        push ? theme("darkTheme") : theme("normalTheme")

    }, [push])

    return (
        <Grid item >
            <ChartDataContext.Provider value={chartData}>
                <ThemeProvider theme={getThemes(active.theme)}>
                    <Header>
                        <Grid className="pushButton">
                            <Switch style={{ float: "right" }} onChange={handlechange}></Switch>
                        </Grid>
                        <Grid >
                            <SearchSelectComp
                                data={data}
                                onSubmit={(latestprice, apiChartData) => {
                                    let copydata = data
                                    copydata.push(latestprice)
                                    setData(copydata)
                                    setChartData(apiChartData)
                                }
                                }
                            ></SearchSelectComp>
                        </Grid>
                        {
                            data.length > 0 &&
                            <CardComp tempchart={chartData} data={data} deleteCard={val => {
                                setData(val)
                            }}></CardComp>
                        }
                    </Header>
                </ThemeProvider>
            </ChartDataContext.Provider>
        </Grid >

    );

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);;
