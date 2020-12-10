import React from 'react' ;
import { connect } from "react-redux";
import './App.css';

import { CardComp } from './component/card/card'
import { SearchSelect } from './component/search/searchSelect'
import { normalTheme, darkTheme } from './actions'

import { Grid } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import { ThemeProvider } from 'styled-components';
import { getThemes } from "./getThemes";
import { Header } from "./styles"

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      themeType: "basic",
      push: false,
      dataAfterDeleting: [],
      chartData: []
    }

  }

  handlechange = () => {
    this.setState({ push: !this.state.push }, () => { this.state.push ? this.props.theme("darkTheme") : this.props.theme("normalTheme") })
  }

  render() {
    return (
      <Grid item >
        <ThemeProvider theme={getThemes(this.props.active.theme)}>
          <Header>
            <Grid className="pushButton">
              <Switch style={{ float: "right" }} onChange={this.handlechange}></Switch>
            </Grid>
            <Grid >
              <SearchSelect
                data={this.state.data}
                onSubmit={(latestprice, chartData) =>
                  this.setState({
                    data: [...this.state.data, latestprice],
                    chartData: chartData
                  })
                }
              ></SearchSelect>
            </Grid>
            {this.state.data.length > 0 &&
              <CardComp data={this.state.data} chartData={this.state.chartData} loader={this.state.loader} deleteCard={val => {
                this.setState({
                  dataAfterDeleting: val
                })
              }}></CardComp>
            }
          </Header>
        </ThemeProvider>
      </Grid>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
