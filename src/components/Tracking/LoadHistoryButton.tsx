'use client';

import { useTrackingStore } from '@/src/store/trackingStore';
import {useTranslations} from "next-intl";

export default function LoadHistoryButton() {
    const { equipmentId, from, to, setPoints } = useTrackingStore();
const t =useTranslations('Tracking')
    const load = async () => {
        if (!equipmentId || !from || !to) {
            alert(`${t('alert')}`);
            return;
        }

        setPoints([
            { lat: 38.97, lng: 59.56, speed: 40, course: 0, timestamp: from },
            { lat: 38.98, lng: 59.57, speed: 42, course: 30, timestamp: from },
            { lat: 38.99, lng: 59.58, speed: 45, course: 60, timestamp: to },
        ]);
    };

    return (
        <button
            onClick={load}
            className="px-6 py-2 bg-green-800 text-white rounded w-full"
        >
            {t('show-history')}
        </button>
    );
}
