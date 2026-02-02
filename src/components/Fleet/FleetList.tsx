interface Props {
    vehicles: Vehicle[];
    selectedId: string;
    onSelect: (v: Vehicle) => void;
}

export default function FleetList({
                                      vehicles,
                                      selectedId,
                                      onSelect,
                                  }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-sm divide-y">
            {vehicles.map(v => (
                <button
                    key={v.id}
                    onClick={() => onSelect(v)}
                    className={`w-full text-left p-4 hover:bg-gray-50 ${
                        v.id === selectedId ? 'bg-blue-50' : ''
                    }`}
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="font-medium">{v.name}</p>
                            <p className="text-xs text-gray-500">{v.plate}</p>
                        </div>

                        <span
                            className={`text-xs font-medium ${
                                v.status === 'moving'
                                    ? 'text-green-600'
                                    : v.status === 'online'
                                        ? 'text-blue-600'
                                        : 'text-gray-400'
                            }`}
                        >
              {v.status}
            </span>
                    </div>
                </button>
            ))}
        </div>
    );
}
