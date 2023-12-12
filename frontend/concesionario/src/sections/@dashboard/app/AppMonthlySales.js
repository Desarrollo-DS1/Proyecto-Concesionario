import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
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

    const { t, i18n } = useTranslation("lang");

    const chartOptions = useChart({
        plotOptions: { bar: { columnWidth: '50%' } },
        fill: { type: chartData.map((i) => i.fill) },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)}`;
                    }
                    return y;
                },
                title: {
                    formatter: (seriesName) => t(`dashBoardVenta.${seriesName}`),
                }
            },
        },
        xaxis: {
            categories: chartLabels,
            labels: {
                formatter: (value) => t(`meses.${value}`),
            }
        }
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
