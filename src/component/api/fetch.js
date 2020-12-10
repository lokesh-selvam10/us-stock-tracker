import axios from 'axios';

export const fetchStock = async (symbol, timeperiod) => {
    console.log("im in")
    let API_Call = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${timeperiod}?token=Tsk_6d9a4144caca4c60b02f9d0d01798e61`;
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    let date = [];

    const fetchPromise = await axios.get(API_Call).then(response => {
        console.log(response.data)
        return response.data
    }).then(data => {
        for (var key in data) {
            open.push(data[key]["open"]);
            high.push(data[key]["high"])
            low.push(data[key]["low"])
            close.push(data[key]["close"])
            date.push(data[key]["date"])
        }

        let temp = [];
        for (var id in open) {
            let openclosePrice = [];
            let ohlc = {};
            openclosePrice.push(open[id])
            openclosePrice.push(high[id])
            openclosePrice.push(low[id])
            openclosePrice.push(close[id])
            ohlc["y"] = openclosePrice
            ohlc["x"] = new Date(date[id])
            temp.push(ohlc)
        }
        return temp
    });

    return fetchPromise

}