import axios from 'axios';

export const fetchStock = async (symbol, timeperiod) => {
    let API_Call = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${timeperiod}?token=Tsk_6d9a4144caca4c60b02f9d0d01798e61`;
    let open = [];
    let high = [];
    let low = [];
    let close = [];
    let date = [];

    //Fetching 3m data
    let chartData = await axios.get(API_Call)
    chartData = await chartData.data
    for (var key in chartData) {
        open.push(chartData[key]["open"]);
        high.push(chartData[key]["high"])
        low.push(chartData[key]["low"])
        close.push(chartData[key]["close"])
        date.push(chartData[key]["date"])
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
    let arrangedChartData = temp
    return arrangedChartData
   
}