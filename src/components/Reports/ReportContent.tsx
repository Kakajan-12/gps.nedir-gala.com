'use client';

import { FileText } from 'lucide-react';
import ReportHeader from './ReportHeader';
import StatisticsCards from './StatisticsCards';
import ReportTable from './ReportTable';
import ReportChart from './ReportChart';

interface ReportData {
    date: string;
    distance: number;
    fuel: number;
    time: string;
    trips: number;
}

interface ReportContentProps {
    reportGenerated: boolean;
    templateName: string;
    vehicleCount: number;
    dateRange: { start: string; end: string };
    data: ReportData[];
    totalStats: {
        distance: number;
        fuel: number;
        trips: number;
    };
}

export default function ReportContent({
                                          reportGenerated,
                                          templateName,
                                          vehicleCount,
                                          dateRange,
                                          data,
                                          totalStats,
                                      }: ReportContentProps) {
    if (!reportGenerated) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Выберите параметры и нажмите "Выполнить отчёт"</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <ReportHeader
                templateName={templateName}
                vehicleCount={vehicleCount}
                dateRange={dateRange}
            />

            <StatisticsCards stats={totalStats} />

            <ReportTable data={data} totalStats={totalStats} />

            <ReportChart data={data} />
        </div>
    );
}