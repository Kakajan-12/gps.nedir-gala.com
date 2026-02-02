'use client'

import { WaterEquipment } from '@/src/types/waterEquipment';
import {useTranslations} from "next-intl";

interface StatusSummaryProps {
    equipment: WaterEquipment[];
}

export default function StatusSummary({ equipment }: StatusSummaryProps) {
    const stats = {
        total: equipment.length,
        active: equipment.filter(e => e.status === 'active').length,
        idle: equipment.filter(e => e.status === 'idle').length,
        maintenance: equipment.filter(e => e.status === 'maintenance').length,
        broken: equipment.filter(e => e.status === 'broken').length,
    };

    const t= useTranslations('Monitoring')

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3 border border-blue-100 rounded-lg bg-blue-50">
                    <div className="text-3xl font-bold text-blue-700">{stats.total}</div>
                    <div className="text-sm text-blue-600 mt-1">{t('total-equipment')}</div>
                </div>

                <div className="text-center p-3 border border-green-100 rounded-lg bg-green-50">
                    <div className="text-3xl font-bold text-green-700">{stats.active}</div>
                    <div className="text-sm text-green-600 mt-1">🟢 {t('working')}</div>
                </div>

                <div className="text-center p-3 border border-red-100 rounded-lg bg-red-50">
                    <div className="text-3xl font-bold text-red-700">{stats.broken}</div>
                    <div className="text-sm text-red-600 mt-1">🔴 {t('faulty')}</div>
                </div>
            </div>
        </div>
    );
}