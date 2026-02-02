'use client';

interface Statistics {
    distance: number;
    fuel: number;
    trips: number;
}

interface StatisticsCardsProps {
    stats: Statistics;
}

export default function StatisticsCards({ stats }: StatisticsCardsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 mb-1">Общий пробег</div>
                <div className="text-2xl font-bold text-blue-900">{stats.distance} км</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600 mb-1">Расход топлива</div>
                <div className="text-2xl font-bold text-green-900">{stats.fuel.toFixed(1)} л</div>
            </div>
        </div>
    );
}