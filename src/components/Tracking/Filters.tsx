'use client';

import {useTrackingStore} from '@/src/store/trackingStore';
import {useTranslations} from "next-intl";

const MOCK_EQUIPMENT = [
    {id: '1', name: 'Экскаватор №1'},
    {id: '2', name: 'Водовоз №3'},
];

export default function Filters() {
    const {
        equipmentId,
        from,
        to,
        setEquipment,
        setFrom,
        setTo,
    } = useTrackingStore();
const t = useTranslations('Tracking');
    return (
        <div className="flex flex-col gap-4 items-end">

            <div className="flex flex-col w-full">
                <label className="text-md">{t('equipment')}</label>
                <select
                    value={equipmentId ?? ''}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">{t('select')}</option>
                    {MOCK_EQUIPMENT.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label className="text-sm">{t('from')}</label>
                    <input
                        type="datetime-local"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm">{t('to')}</label>
                    <input
                        type="datetime-local"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
            </div>

        </div>
    );
}
