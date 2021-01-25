import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-scroll";

import iex from "../config/iex.js";
import options from "./searchOptions";
import "./searchSelect.css";
import { fetchStock } from "../api/fetch";

import {
    Button,
    CircularProgress,
    Grid,
    TextField,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { withStyles } from "@material-ui/styles";
import { withSnackbar } from "notistack";

function symbolToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
            )
        : isoCode;
}

function mapStateToProps(state) {
    return {
        active: state.theme,
        period: state.chartTimePeriod,
    };
}

const useStyles = (themes) => ({
    option: {
        minHeight: 48,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        cursor: "pointer",
        paddingTop: 6,
        boxSizing: "border-box",
        outline: "0",
        WebkitTapHighlightColor: "transparent",
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,

        '&[aria-selected="true"]': {
            backgroundColor: "#2f3a48",
        },
        '&[data-focus="true"]': {
            backgroundColor: "#2f3a48",
        },
        "&:active": {
            backgroundColor: "#2f3a48",
        },
        '&[aria-disabled="true"]': {
            pointerEvents: "none",
        },
    },
 
    inputRootForBlackTheme: {
        color: "#BB86FC",
        fontWeight: 500,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3F51B5",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0b4276",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple",
        },
    },
    inputRoot: {
        fontWeight: 500,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3F51B5",
        },
    },
    popper: {
        "&.MuiAutocomplete-listbox": {
            color: "#f2f4f6",
            "&.scroller:hover::-webkit-scrollbar": {
                backgroundColor: "red",
            },
        },
    },
    paper: {
        backgroundColor: "#282c34",
    },
});

function SearchSelect({
    classes,
    data,
    onSubmit,
    enqueueSnackbar,
    active: { background },
}) {
    const [symbol, setSymbol] = useState('');
    const [name, setName] = useState();
    const [button, setButton] = useState(true);
    const [loader, setLoader] = useState(false);

    const handleChange = (event, value) => {
        if (value != null) {
            setSymbol(value.Symbol);
            setName(value.Name);
            setButton(false)
        }
    };

    const handleSearch = async () => {
        let checksym = [];
        let temp = true;

        data.map((val) => checksym.push(val.symbol));
        temp = checksym.includes(symbol);

        if (!temp) {
            try {
                // IntraDay Data Logic
                setLoader(true);
                let intraDayRes = await fetch(
                    `${iex.base_url}/stock/${symbol}/intraday-prices?token=${iex.api_token}`
                );
                
                intraDayRes = await intraDayRes.json();
                intraDayRes = intraDayRes[intraDayRes.length - 1];
                intraDayRes["symbol"] = symbol
                intraDayRes["name"] = name
                
                // Chart Data Logic
                let temchartdata = await fetchStock(symbol, "3m")

                setLoader(false);
                await onSubmit(intraDayRes, temchartdata);
                setTimeout(() => {
                    window.scroll({
                        top: document.body.offsetHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                }, 1000);
                enqueueSnackbar(` ${name}(${symbol}) added`, { variant: "info" });
            } catch (err) {
                enqueueSnackbar("Couldn't find the data", { variant: "warning" });
            }
        }
    };

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
        >
            <Grid container item xs={8} style={{ paddingLeft: "20%" }}>
                <Autocomplete
                    id="stockselect"
                    style={{ width: 600 }}
                    options={options}
                    classes={{
                        option: classes.option,
                        inputRoot: background
                            ? classes.inputRootForBlackTheme
                            : classes.inputRoot,
                        listbox: classes.popper,
                        paper: classes.paper,
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.Symbol}
                    renderOption={(option) => (
                        <React.Fragment>
                            <Grid item xs={2}>
                                <span>{symbolToFlag(option.Symbol)}</span>
                            </Grid>
                            {option.Name} ({option.Symbol})
                        </React.Fragment>
                    )}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a symbol"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4} style={{ paddingTop: "8px" }}>
                {loader ? (
                    <CircularProgress size={28} />
                ) : (
                        <Link to={symbol} spy={true} smooth={true}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className="button"
                                disabled={button}
                                onClick={handleSearch}
                                classes={{ outlinedPrimary: classes.outlinedPrimary }}
                            >
                                Search
            </Button>
                        </Link>
                    )}
            </Grid>
        </Grid>
    );
}

// export default withStyles(useStyles)(CountrySelect);
export const styles = withStyles(useStyles)(SearchSelect);
export const snackBar = withSnackbar(styles);
export const SearchSelectComp = connect(mapStateToProps)(snackBar);