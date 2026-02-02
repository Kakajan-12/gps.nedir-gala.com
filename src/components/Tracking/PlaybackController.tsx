'use client';

import { useEffect } from 'react';
import { useTrackingStore } from '@/src/store/trackingStore';

export default function PlaybackController() {
    const { playing, next } = useTrackingStore();

    useEffect(() => {
        if (!playing) return;

        const timer = setInterval(next, 1000);
        return () => clearInterval(timer);
    }, [playing, next]);

    return null;
}
