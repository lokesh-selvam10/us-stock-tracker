import React, { useEffect, useState, useContext } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ChartDataContext } from '../../App'

function CandleChartFunc({ color }) {
    const chartData = useContext(ChartDataContext)

    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'CandleStick Chart',
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: color
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    fontSize: '14px',
                    colors: color
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            },
            labels: {
                style: {
                    fontSize: '14px',
                    colors: color
                }
            }
        },
        tooltip: {
            theme: color === "#fff" ? "dark" : "light"
        },
    });

    useEffect(() => {
        let series = []
        let temp = {}
        temp["data"] = chartData;
        series.push(temp)
        setSeries(series)
    }, [])
    useEffect(() => {
        setOptions(prevState => ({
            ...prevState,
            title: {
                ...prevState.title,
                style: {
                    fontSize: '14px',
                    color: color
                }
            },
            xaxis: {
                ...prevState.xaxis,
                labels: {
                    style: {
                        fontSize: '14px',
                        colors: color
                    }
                }
            },
            yaxis: {
                ...prevState.yaxis,
                labels: {
                    style: {
                        fontSize: '14px',
                        colors: color
                    }
                }
            },
            tooltip: {
                ...prevState.tooltip,
                theme: color === "#fff" ? "dark" : "light"
            }
        }))
    }, [color])

    return (
        <div >
            <ReactApexChart options={options} series={series} type="candlestick" height={350} />
        </div>
    )

}

export default CandleChartFunc;