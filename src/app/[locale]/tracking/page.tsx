'use client';

import Filters from '@/src/components/Tracking/Filters';
import LoadHistoryButton from '@/src/components/Tracking/LoadHistoryButton';
import TrackingMap from '@/src/components/Tracking/TrackingMap';
import Controls from '@/src/components/Tracking/Controls';
import PlaybackController from '@/src/components/Tracking/PlaybackController';
import { useTrackingStore } from '@/src/store/trackingStore';

export default function TrackingPage() {
    const { points, currentIndex } = useTrackingStore();

    return (
        <div className="bg-white p-3 rounded-lg shadow m-2">
            <div className="flex space-x-4">
                <TrackingMap points={points} currentIndex={currentIndex} />
                <div className="space-y-4">
                    <Filters/>
                    <LoadHistoryButton/>
                    <Controls />
                    <PlaybackController />
                </div>
            </div>
        </div>
    );
}
