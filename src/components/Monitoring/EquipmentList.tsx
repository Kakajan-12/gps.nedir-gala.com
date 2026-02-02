'use client'

import {WaterEquipment} from '@/src/types/waterEquipment';
import {useTranslations} from "next-intl";
import type { TranslationValues } from 'next-intl';

interface EquipmentListProps {
    equipment: WaterEquipment[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    loading: boolean;
}

export default function EquipmentList({
                                          equipment,
                                          selectedId,
                                          onSelect,
                                          loading
                                      }: EquipmentListProps) {
    const t =useTranslations('Monitoring')

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">{t('loading')}</div>
            </div>
        );
    }

    if (equipment.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">{t('equipment-not-found')}</div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="mb-4">
                <h3 className="font-bold text-lg">{t('total-equipment')} ({equipment.length})</h3>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {equipment.map((item) => (
                    <div
                        key={item.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-blue-50 ${
                            selectedId === item.id
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-white border-gray-200'
                        }`}
                        onClick={() => onSelect(item.id)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{getTypeIcon(item.type)}</span>
                                    <h4 className="font-medium">{item.name}</h4>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                      <span className={`px-2 py-1 rounded-full ${
                                          item.status === 'active' ? 'bg-green-100 text-green-800' :
                                                  item.status === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                                                      'bg-red-100 text-red-800'
                                      }`}>
                                        {getStatusText(item.status, t)}
                                      </span>

                                    {item.metrics.fuelLevel && (
                                        <div className="flex items-center gap-1">
                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-full rounded-full ${
                                                        item.metrics.fuelLevel > 50 ? 'bg-green-500' :
                                                            item.metrics.fuelLevel > 20 ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                    }`}
                                                    style={{width: `${item.metrics.fuelLevel}%`}}
                                                />
                                            </div>
                                            <span className="text-xs">{item.metrics.fuelLevel}%</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {item.lastUpdate && (
                            <div className="text-xs text-gray-500 mt-2 text-right">
                                {formatTimeSince(item.lastUpdate, t)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
        water_truck: '🚛',
        excavator: '🏗️',
        dredger: '🚢',
        pump_station: '💧',
        pipe_layer: '🛠️',
        canal_cleaner: '🧹',
        irrigation: '🌊'
    };
    return icons[type] || '🚜';
};

const getStatusText = (
    status: string,
    t: (key: string) => string
): string => {
    const statuses: Record<string, string> = {
        active: t('working'),
        broken: t('faulty'),
        transporting: t('on-the-way'),
    };

    return statuses[status] || status;
};


const formatTimeSince = (
    date: Date,
    t: (key: string, values?: TranslationValues) => string
): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return t('just-now');

    if (minutes < 60)
        return t('min-ago', { count: minutes });

    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return t('hours-ago', { count: hours });

    const days = Math.floor(hours / 24);
    return t('days-ago', { count: days });
};