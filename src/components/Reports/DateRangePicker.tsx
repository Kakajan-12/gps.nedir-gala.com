'use client';

interface DateRange {
    start: string;
    end: string;
}

interface DateRangePickerProps {
    dateRange: DateRange;
    onDateRangeChange: (dateRange: DateRange) => void;
}

const quickPeriods = [
    { id: 'today', name: 'Сегодня' },
    { id: 'yesterday', name: 'Вчера' },
    { id: 'week', name: 'Эта неделя' },
    { id: 'month', name: 'Этот месяц' },
];

export default function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
    const handleQuickPeriod = (periodId: string) => {
        const today = new Date();
        let start = new Date();
        let end = new Date();

        switch (periodId) {
            case 'today':
                start = today;
                end = today;
                break;
            case 'yesterday':
                start = new Date(today.setDate(today.getDate() - 1));
                end = start;
                break;
            case 'week':
                start = new Date(today.setDate(today.getDate() - today.getDay()));
                end = new Date();
                break;
            case 'month':
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date();
                break;
        }

    };

    return (
        <div className="p-4 border-b">
            <h3 className="font-semibold text-sm text-gray-700 mb-3">Период</h3>
            <div className="space-y-1 mb-3">
                {quickPeriods.map(period => (
                    <button
                        key={period.id}
                        onClick={() => handleQuickPeriod(period.id)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        {period.name}
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">С</label>
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">По</label>
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}