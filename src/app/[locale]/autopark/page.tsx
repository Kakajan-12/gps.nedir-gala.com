'use client';

import { useState } from 'react';
import FleetList from '@/src/components/Fleet/FleetList';
import VehicleCard from '@/src/components/Fleet/VehicleCard';

const vehicles = [
    {
        id: '1',
        name: 'MAN TGX',
        plate: 'A123BC',
        fuel: 54,
        mileage: 124500,
        status: 'moving',
        updatedAt: '2025-01-10',
    },
    {
        id: '2',
        name: 'Volvo FH',
        plate: 'B456CD',
        fuel: 32,
        mileage: 98700,
        status: 'offline',
        updatedAt: '2025-01-09',
    },
];

export default function FleetPage() {
    const [selected, setSelected] = useState(vehicles[0]);

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
                <FleetList
                    vehicles={vehicles}
                    selectedId={selected.id}
                    onSelect={setSelected}
                />
            </div>

            <div className="col-span-8">
                <VehicleCard vehicle={selected} />
            </div>
        </div>
    );
}
