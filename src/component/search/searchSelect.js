import React from 'react';
import { connect } from "react-redux";

import iex from "../config/iex.js"
import options from './searchOptions'
import './searchSelect.css'
import { fetchStock } from "../api/fetch"

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';



function symbolToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

function mapStateToProps(state) {
    return {
        active: state.theme,
        period: state.chartTimePeriod
    }
}

const useStyles = themes => ({
    option: {
        minHeight: 48,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        paddingTop: 6,
        boxSizing: 'border-box',
        outline: '0',
        WebkitTapHighlightColor: 'transparent',
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,

        '&[aria-selected="true"]': {
            backgroundColor: "#2f3a48",
        },
        '&[data-focus="true"]': {
            backgroundColor: "#2f3a48",
        },
        '&:active': {
            backgroundColor: "#2f3a48",
        },
        '&[aria-disabled="true"]': {
            pointerEvents: 'none',
        },
    },
    // option: {
    //     backgroundColor: "#282c34",
    //     fontSize: 15,
    //     '&  span': {
    //         // paddingRight: 40,
    //         fontSize: 20,
    //     },
    // },
    inputRootForBlackTheme: {
        color: "#BB86FC",
        fontWeight: 500,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3F51B5"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0b4276"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        }
    },
    inputRoot: {
        fontWeight: 500,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3F51B5"
        },

    },
    popper: {
        "&.MuiAutocomplete-listbox": {
            color: "#f2f4f6",
            "&.scroller:hover::-webkit-scrollbar": {
                backgroundColor: "red"
            }
        }
    },
    paper: {
        backgroundColor: "#282c34"
    },

});

class searchSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [{}],
            symbol: "",
            name: "",
            chartData: [],
            button: true
        }
    }
    handleChange(event, value) {
        return value !== null && this.setState({ symbol: value.Symbol, name: value.Name, button: false })
    }

    handleSearch = () => {
        let checksym = [];
        let lastestprice = [];
        let temp = true
        this.props.data.map(val => checksym.push(val.symbol))
        temp = checksym.includes(this.state.symbol)

        if (!temp) {
            const url = `${iex.base_url}/stock/${this.state.symbol}/intraday-prices?token=${iex.api_token}`
            // const url = `${iex.base_url}/stock/${this.state.symbol}/previous?token=${iex.api_token}`
            this.setState({ loader: true })
            fetch(url).then((res) => res.json()).then(data => {
                lastestprice = data[data.length - 1]
                lastestprice["symbol"] = this.state.symbol
                lastestprice["name"] = this.state.name
                // console.log(lastestprice)

                fetchStock(this.state.symbol, "3m").then(res => { this.setState({ chartData: res, data: lastestprice, loader: false }, () => { this.props.onSubmit(this.state.data, this.state.chartData); }) })
            }).catch(error => {
                this.props.enqueueSnackbar("Couldn't find the data", {
                    variant: 'warning',
                });
                this.setState({loader:false})
            })
        }
        else {
            this.props.enqueueSnackbar(this.state.name + "is already added", {
                variant: 'info',
            });
        }
    }
    componentDidMount() {
        let data = fetchStock("TXG", "3m").then(res => { return res })
        // console.log(data)
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container direction="row" justify="space-evenly" alignItems="flex-start" >
                <Grid container item xs={8} style={{ paddingLeft: "20%" }}>
                    <Autocomplete
                        id="stockselect"
                        style={{ width: 600 }}
                        options={options}
                        classes={{
                            option: classes.option,
                            inputRoot: this.props.active.background ? classes.inputRootForBlackTheme : classes.inputRoot,
                            listbox: classes.popper,
                            paper: classes.paper
                        }}
                        autoHighlight
                        getOptionLabel={(option) => option.Symbol}
                        renderOption={(option) => (
                            <React.Fragment >
                                <Grid item xs={2}>
                                    <span>{symbolToFlag(option.Symbol)}</span>
                                </Grid>
                                {option.Name} ({option.Symbol})
                            </React.Fragment>
                        )}
                        onChange={(event, value) => this.handleChange(event, value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a symbol"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} style={{ paddingTop: "8px" }} >
                    {this.state.loader ? <CircularProgress size={28} /> :
                        <Button variant="outlined" color="primary" className="button" disabled={this.state.button} onClick={this.handleSearch} classes={{ outlinedPrimary: classes.outlinedPrimary }}>Search</Button>
                    }
                </Grid>


            </Grid>
        )
    }
}

// export default withStyles(useStyles)(CountrySelect);
export const styles = withStyles(useStyles)(searchSelect);
export const snackBar = withSnackbar(styles)
export const SearchSelect = connect(mapStateToProps)(snackBar)
