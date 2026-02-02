'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';

interface Vehicle {
    id: string;
    name: string;
    group: string;
}

interface VehicleGroup {
    id: string;
    name: string;
    vehicles: Vehicle[];
}

interface VehicleSelectorProps {
    vehicleGroups: VehicleGroup[];
    selectedVehicles: string[];
    expandedGroups: string[];
    onToggleGroup: (groupId: string) => void;
    onToggleVehicle: (vehicleId: string) => void;
}

export default function VehicleSelector({
                                            vehicleGroups,
                                            selectedVehicles,
                                            expandedGroups,
                                            onToggleGroup,
                                            onToggleVehicle,
                                        }: VehicleSelectorProps) {
    return (
        <div className="p-4 border-b">
            <h3 className="font-semibold text-sm text-gray-700 mb-3">Объекты</h3>
            <div className="space-y-1">
                {vehicleGroups.map(group => (
                    <div key={group.id}>
                        <button
                            onClick={() => onToggleGroup(group.id)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-sm font-medium text-gray-700 cursor-pointer"
                        >
                            {expandedGroups.includes(group.id) ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                            {group.name}
                        </button>
                        {expandedGroups.includes(group.id) && (
                            <div className="ml-6 mt-1 space-y-1">
                                {group.vehicles.map(vehicle => (
                                    <label
                                        key={vehicle.id}
                                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedVehicles.includes(vehicle.id)}
                                            onChange={() => onToggleVehicle(vehicle.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{vehicle.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}