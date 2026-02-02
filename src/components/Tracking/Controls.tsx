'use client';

import { useTrackingStore } from '@/src/store/trackingStore';
import {useTranslations} from "next-intl";

export default function Controls() {
    const { play, pause, playing, currentIndex, points } = useTrackingStore();

    const t = useTranslations('Tracking')
    return (
        <div className="flex gap-4 items-center">
            <button
                onClick={playing ? pause : play}
                className="px-4 py-2 bg-green-800 text-white rounded"
            >
                {playing ? t('pause') : t('play')}
            </button>

            <input
                type="range"
                min={0}
                max={points.length - 1}
                value={currentIndex}
                onChange={(e) =>
                    useTrackingStore.setState({currentIndex: Number(e.target.value)})
                }
                className="w-full accent-green-800"
            />

        </div>
    );
}
