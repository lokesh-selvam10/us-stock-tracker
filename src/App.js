import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './App.css';

import { normalTheme, darkTheme } from './actions'

import { Grid, Switch } from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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
    const handleScroll = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
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
                        {data.length > 1 &&
                            <ExpandLessIcon style={{
                                cursor:'pointer',
                                width: 66,
                                height: 66,
                                borderRadius: 33,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                bottom: 20,
                                right: 20
                            }}
                                onClick={handleScroll}>test</ExpandLessIcon>}

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
