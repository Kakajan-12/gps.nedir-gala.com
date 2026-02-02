'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

interface ReportData {
    date: string;
    fuel: number;
}

interface ReportChartProps {
    data: ReportData[];
}

export default function ReportChart({ data }: ReportChartProps) {
    const chartData = {
        labels: data.map(item =>
            new Date(item.date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
            })
        ),
        datasets: [
            {
                label: 'Расход топлива',
                data: data.map(item => item.fuel),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59,130,246,0.2)',
                pointBackgroundColor: '#3B82F6',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => `${ctx.raw} л`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: number) => `${value} л`,
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Расход топлива
            </h3>

            <div className="h-64">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
