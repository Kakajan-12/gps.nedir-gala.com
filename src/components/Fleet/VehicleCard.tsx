import ReportChart from '../Reports/ReportChart';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold">{vehicle.name}</h2>
                <p className="text-gray-500">{vehicle.plate}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Stat label="Топливо" value={`${vehicle.fuel} л`} />
                <Stat label="Пробег" value={`${vehicle.mileage} км`} />
                <Stat label="Статус" value={vehicle.status} />
            </div>

            <ReportChart
                data={[
                    { date: '2025-01-01', fuel: 45 },
                    { date: '2025-01-02', fuel: 50 },
                    { date: '2025-01-03', fuel: 40 },
                ]}
            />
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    );
}
