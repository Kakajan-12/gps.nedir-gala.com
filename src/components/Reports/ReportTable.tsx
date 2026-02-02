'use client';

interface ReportData {
    date: string;
    distance: number;
    fuel: number;
    time: string;
    trips: number;
}

interface ReportTableProps {
    data: ReportData[];
    totalStats: {
        distance: number;
        fuel: number;
        trips: number;
    };
}

export default function ReportTable({ data, totalStats }: ReportTableProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Дата
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Пробег (км)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Топливо (л)
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row.distance}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row.fuel}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                            Итого:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                            {totalStats.distance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                            {totalStats.fuel.toFixed(1)}
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}