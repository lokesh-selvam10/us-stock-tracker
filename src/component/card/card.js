import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import './card.css'
import ApexChart from "../chart/candleChart"

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

class CardComponent extends React.Component {
  hasUnmounted = false;
  constructor() {
    super();
    this.state = {
    }
  }

  handleDelete = (symbol, name) => {
    let temp = this.props.data
    temp.map((value, index) => {
      if (value.symbol === symbol) {
        temp.splice(index, 1)
      }
      return null

    })
    this.props.enqueueSnackbar("Removed " + name, {
      variant: 'success',
    });
    this.props.deleteCard(temp)
  }

  dateFormat = (date) => {
    let currentDate = new Date(date)
    return currentDate.toDateString()
  }

  render() {
    return (

      <Grid>
        {this.props.data.map(value => (
          <Grid key={value.symbol} container direction="row" justify="center" alignItems="center">
            <Grid item xs={8} sm={6} style={{ boxShadow: "0 4px 8px 0 rgba(5,5,5,5.2)", margin: "1%", marginLeft: "-9%" }}>
              <Card key={value.symbol} className="root" style={{ backgroundColor: this.props.active.background ? "#1b2530" : "" }}>
                <CardContent >
                  <CloseIcon onClick={() => this.handleDelete(value.symbol, value.name)} style={{ float: "right", cursor: "pointer", color: this.props.active.color }} />
                  <Grid item className="title" style={{ color: this.props.active.background ? "#79B8F3" : "#000" }}>{value.symbol}-{value.name}</Grid>
                  <Grid item className="closeprice" style={{ color: this.props.active.background ? "#8197a4" : "#000" }}>{value.close}</Grid>
                  <Grid container item direction="row" className="datetime" style={{ marginLeft: "5px" }}>
                    <Grid item >{this.dateFormat(value.date)}</Grid>
                    <Grid item style={{ marginLeft: "10px" }}>{value.minute}</Grid>
                  </Grid>
                </CardContent>
                <ApexChart chartDate={this.props.chartData} color={this.props.active.color}></ApexChart>
                <Grid container item xs={12} direction="column" className="ohlc">
                  <Grid container item xs={12} direction="row">
                    <Grid item xs={4} className="ohlc" style={{ color: this.props.active.background ? "#8197a4" : "#000" }}><span style={{ fontWeight: "500", color: this.props.active.background ? "#79B8F3" : "#000" }}>Open-</span>{value.open}</Grid>
                    <Grid item xs={4} className="ohlc" style={{ color: this.props.active.background ? "#8197a4" : "#000" }}><span style={{ fontWeight: "500", color: this.props.active.background ? "#79B8F3" : "#000" }}>Low-</span>{value.low}</Grid>
                    <Grid item xs={4} className="ohlc" style={{ color: this.props.active.background ? "#8197a4" : "#000" }}><span style={{ fontWeight: "500", color: this.props.active.background ? "#79B8F3" : "#000" }}>High-</span>{value.high}</Grid>
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
}

// CardComponent.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export const Snackbar = withSnackbar(CardComponent)
export const CardComp = connect(mapStateToProps)(Snackbar)




