'use client';

import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export type TrackPoint = {
    lat: number;
    lng: number;
    speed: number;
    course: number;
    timestamp: string;
};

type Props = {
    points: TrackPoint[];
    currentIndex: number;
};

const icon = (course: number) =>
    L.divIcon({
        html: `<div style="transform:rotate(${course}deg);font-size:20px">🚗</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

export default function TrackingMapClient({ points, currentIndex }: Props) {
    if (!points.length) return null;

    const current = points[currentIndex];

    return (
        <MapContainer
            center={[current.lat, current.lng]}
            zoom={13}
            className="h-[500px] w-full rounded-lg"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Polyline
                positions={points.map(p => [p.lat, p.lng])}
                color="blue"
            />

            <Marker
                position={[current.lat, current.lng]}
                icon={icon(current.course)}
            />
        </MapContainer>
    );
}
