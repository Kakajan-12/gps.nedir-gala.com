'use client';
import dynamic from 'next/dynamic';
const MapOffline = dynamic(() => import('@/src/components/Map/MapOffline'), {ssr: false});
export default function HomePage() {

    return (
        <div  className="w-full"
              style={{ height: 'calc(100vh - 88px)' }}>
            <MapOffline/>
        </div>
    );
}