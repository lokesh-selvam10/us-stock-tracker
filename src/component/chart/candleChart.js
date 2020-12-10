import React from 'react'
import ReactApexChart from 'react-apexcharts'
class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [],
            options: {
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
                        color: this.props.color
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                            fontSize: '14px',
                            colors: this.props.color
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
                            colors: this.props.color
                        }
                    }
                },
                tooltip: {
                    theme: this.props.color === "#fff" ? "dark" : "light"
                },

            },
        };
    }

    componentDidMount = () => {
        let series = []
        let temp = {}
        temp["data"] = this.props.chartDate;
        series.push(temp)
        this.setState({ series: series })

    }
    componentDidUpdate = () => {
        if (this.state.options.title.style.color !== this.props.color) {
            this.setState(prevState => ({
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        style: {
                            fontSize: '14px',
                            color: this.props.color
                        }
                    },
                    xaxis: {
                        ...prevState.options.xaxis,
                        labels: {
                            style: {
                                fontSize: '14px',
                                colors: this.props.color
                            }
                        }
                    },
                    yaxis: {
                        ...prevState.options.yaxis,
                        labels: {
                            style: {
                                fontSize: '14px',
                                colors: this.props.color
                            }
                        }
                    },
                    tooltip: {
                        ...prevState.options.tooltip,
                        theme: this.props.color === "#fff" ? "dark" : "light"
                    }

                }
            }))
        }
    }

    render() {
        return (
            <div >
                <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
            </div>
        )
    }
}

export default ApexChart;