import dynamic from 'next/dynamic';

const TrackingMap = dynamic(
    () => import('./TrackingMapClient'),
    { ssr: false }
);

export default TrackingMap;
