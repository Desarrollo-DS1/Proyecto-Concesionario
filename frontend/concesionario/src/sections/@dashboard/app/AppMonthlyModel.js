import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppMonthlySales.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartData: PropTypes.array.isRequired,
    chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppMonthlySales({ title, subheader, chartLabels, chartData, ...other }) {

    const chartOptions = useChart({
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        offsetY: 7,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: chartLabels,
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="bar" series={chartData[0].data} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
