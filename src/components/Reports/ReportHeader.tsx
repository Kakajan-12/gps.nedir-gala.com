'use client';

import { Download, Printer, Mail } from 'lucide-react';

interface ReportHeaderProps {
    templateName: string;
    vehicleCount: number;
    dateRange: { start: string; end: string };
}

export default function ReportHeader({ templateName, vehicleCount, dateRange }: ReportHeaderProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{templateName}</h2>
                    <p className="text-sm text-gray-600">
                        {vehicleCount} объект(ов) •  {dateRange.start} - {dateRange.end}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Экспорт в PDF"
                    >
                        <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Печать"
                    >
                        <Printer className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Отправить"
                    >
                        <Mail className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}