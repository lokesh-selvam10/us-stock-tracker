import React from 'react';
import { connect } from "react-redux";
// import PropTypes from 'prop-types';

import './card.css'
import CandleChart from '../chart/candleChart'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'notistack';
function mapStateToProps(state) {
    return {
        active: state.theme,
    }
}

function DisplayCard({ data, enqueueSnackbar, deleteCard, active: { background, color } }) {

    //Deleting the card
    const handleDelete = (symbol, name) => {
        let temp = data
        let deletedone = temp.filter((value, index) => value.symbol !== symbol
        )
        deleteCard(deletedone)        
        enqueueSnackbar("Removed " + name, {
            variant: 'success',
        });
   
    }

    const dateFormat = (date) => {
        let currentDate = new Date(date)
        return currentDate.toDateString()
    }

    return (
        <Grid>
            {data.map(value => (
                <Grid key={value.symbol} container direction="row" justify="center" alignItems="center">
                    <Grid item xs={8} sm={6} style={{ boxShadow: "0 4px 8px 0 rgba(5,5,5,5.2)", margin: "1%", marginLeft: "-9%" }}>
                        <Card key={value.symbol} id={value.symbol} className="root" style={{ backgroundColor: background ? "#1b2530" : "" }}>
                            <CardContent style={{ padding: "10px" }}>
                                <CloseIcon onClick={() => handleDelete(value.symbol, value.name)} style={{ float: "right", cursor: "pointer", color: color }} />
                                <Grid item className="title" style={{ color: background ? "#79B8F3" : "#000" }}>{value.symbol}-{value.name}</Grid>
                                <Grid item className="closeprice" style={{ color: background ? "#8197a4" : "#000" }}>{value.close}</Grid>
                                <Grid container item direction="row" className="datetime" style={{ marginLeft: "5px" }}>
                                    <Grid item >{dateFormat(value.date)}</Grid>
                                    <Grid item style={{ marginLeft: "10px" }}>{value.minute}</Grid>
                                </Grid>
                            </CardContent>
                            <CandleChart color={color}></CandleChart>
                            <Grid container item xs={12} direction="column" className="ohlc">
                                <Grid container item xs={12} direction="row">
                                    <Grid item xs={4} className="ohlc" style={{ color: background ? "#8197a4" : "#000" }}><span style={{ fontWeight: "500", color: background ? "#79B8F3" : "#000" }}>Open-</span>{value.open}</Grid>
                                    <Grid item xs={4} className="ohlc" style={{ color: background ? "#8197a4" : "#000" }}><span style={{ fontWeight: "500", color: background ? "#79B8F3" : "#000" }}>Low-</span>{value.low}</Grid>
                                    <Grid item xs={4} className="ohlc" style={{ color: background ? "#8197a4" : "#000" }}><span style={{ fontWeight: "500", color: background ? "#79B8F3" : "#000" }}>High-</span>{value.high}</Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            ))
            }
        </Grid>
    )

}

// CardComponent.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export const Snackbar = withSnackbar(DisplayCard)
export const CardComp = connect(mapStateToProps)(Snackbar)




